function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
        }
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}


let nextUnitOfWork = null;
//利用requestIdleCallback不断循环
function workLoop(deadline) {
    //是否应该停止循环
    let shouldyield = false;

    //如果存在下一个工作单元，且没有优先级更高的其他工作，循环执行
    while (nextUnitOfWork && !shouldyield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        //如果截止时间快到了，停止工作循环函数
        shouldyield = deadline.timeRemaining() < 1
    }

    //当所有fiber都工作完成时，工作单元都处理完了，进入commit阶段，渲染真实DOM
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }

    //通知浏览器空闲执行
    requestIdleCallback(workLoop)
}

function commitRoot() {
    //渲染DOM
    commitWork(wipRoot.child)
    //将新的fiber节点赋值给当前的fiber节点
    currentRoot = wipRoot
    //需要设置为null，否则workLoop在浏览器空闲时不断的执行
    wipRoot = null
    //删除多余的DOM
    deletions.forEach(commitWork)
}

//递归将fiber tree渲染为真实DOM
function commitWork(fiber) {
    if (!fiber) return

    let domParentFiber = fiber.parent
    // 如果 fiber.parent 没有 dom 节点，则继续找 fiber.parent.parent.dom，直到有 dom 节点。
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }

    const domParent = domParentFiber.dom

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === "DELETION") {
        // domParent.removeChild(fiber.dom)
        commitDeletion(fiber.dom, domparent)
    } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }

    //渲染子节点
    commitWork(fiber.child)
    //渲染兄弟节点
    commitWork(fiber.sibling)
}
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domparent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

requestIdleCallback(workLoop)


function performUnitOfWork(fiber) {
    //判断是否是函数组件
    const isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function

    //根据函数组件和类组件处理当前节点
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }


    //处理步骤：子节点->兄弟节点->父节点的下一个兄弟节点，当nextFiber为null时，代表fiber转换已完成
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }

}


function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
}

//当前工作单元fiber
let wipFiber = null
function updateFunctionComponent(fiber) {
    wipFiber = fiber
    wipFiber.hook = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}

//将vdom转成fiber
function reconcileChildren(wipFiber, elements) {

    //旧fiber节点
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child

    let index = 0;
    let prevSibling = null;
    while (index < elements.length || oldFiber != null) {
        const element = elements[index]
        let newFiber = null

        const sameType = oldFiber && element && element.type == oldFiber.type

        //更新DOM
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE"
            }
        }


        //添加DOM
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: "PLACEMENT"
            }
        }

        //删除DOM
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION"
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
}

const isProperty = key => key !== 'children'
//是否是新属性
const isNew = (prev, next) => key => prev[key] !== next[key]
//是否是旧属性
const isGone = (prev, next) => key => !(key in next)
function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(fiber.type)
    updateDom(dom, {}, fiber.props)
    return dom;
}
function updateDom(dom, prevProps, nextProps) {
    const isEvent = key => key.startsWith("on")
    Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => { const eventType = name.toLocaleLowerCase().substring(2); dom.removeEventListener(eventType, prevProps[name]) })
    Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => { const eventType = name.toLowerCase().substring(2); dom.addEventListener(eventType, nextProps[name]) })
    Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => { dom[name] = "" })
    Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => { dom[name] = nextProps[name] })
}

//根节点
let wipRoot = null;
//根节点更新前的fiber tree.在commitRoot的时候会currentRoot = wiproot;
let currentRoot = null;
let deletions = null;
function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot//保存fiber更新前的fiber tree
    }
    nextUnitOfWork = wipRoot
    deletions = []
}


function useState(initial) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hook
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    }

    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => { hook.state = action(hook.state) })
    const setState = action => {
        hook.queue.push(action)
        updateRender()
    }
    wipFiber.hook = hook

    return [hook.state, setState]
}

function updateRender() {
    wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
}




const myReact = {
    createElement,
    render,
    useState
}
const arr = [];
for (let i = 0; i < 10000; i++) {
    // const element = array[i];
    arr.push(i)

}

// const element = (<div id="foo">

//     <a>bar</a>
//     <b>bbbb</b>
//     <button onClick={() => { alert('click') }}>btn</button>
// </div>)
const App = (props) => {
    return <div>hello {props.name}
        <Counter></Counter>
    </div>
}

function Counter() {
    const [state, setState] = myReact.useState(1)
    return (
        <h1>
            Count: {state}
            <button onClick={() => setState(c => c + 1)}>btn</button>
        </h1>

    )
}


const element = (<App name="world"></App>)

myReact.render(element, document.getElementById('app'))
