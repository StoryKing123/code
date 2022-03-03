function createElement(type, props, ...children) {
  return {
    type,
    props: { ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
} // function render(element, container) {
// const dom = document.createElement(element.type)
// const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(element.type)
// element.props.children.forEach(child => render(child, dom))
// const isProperty = key => key !== 'children'
// Object.keys(element.props).filter(isProperty).forEach(name => { dom[name] = element.props[name] })
// container.appendChild(dom)
// }


let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldyield = false;

  while (nextUnitOfWork && !shouldyield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldyield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
  deletions.forEach(commitWork);
}

function commitWork(fiber) {
  if (!fiber) return;
  let domParentFiber = fiber.parent; // 如果 fiber.parent 没有 dom 节点，则继续找 fiber.parent.parent.dom，直到有 dom 节点。

  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber.dom, domparent);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domparent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  } // if (!fiber.dom) {
  //     fiber.dom = createDom(fiber)
  // }
  // const elements = fiber.props.children
  // reconcileChildren(fiber, elements)


  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
}

let wipFiber = null;

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.hook = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function reconcileChildren(wipFiber, elements) {
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT"
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    } // const newFiber = {
    //     type: element.type,
    //     props: element.props,
    //     parent: fiber,
    //     dom: null
    // }


    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

const isProperty = key => key !== 'children'; //是否是新属性


const isNew = (prev, next) => key => prev[key] !== next[key]; //是否是久属性


const isGone = (prev, next) => key => !(key in next);

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(fiber.type); // Object.keys(fiber.props).filter(isProperty).forEach(name => { dom[name] = fiber.props[name] })

  updateDom(dom, {}, fiber.props);
  return dom;
}

function updateDom(dom, prevProps, nextProps) {
  const isEvent = key => key.startsWith("on"); // "".start


  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {
    const eventType = name.toLocaleLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  });
  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => {
    dom[name] = "";
  });
  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {
    dom[name] = nextProps[name];
  });
}

let wipRoot = null;
let currentRoot = null;
let deletions = null;

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  nextUnitOfWork = wipRoot;
  deletions = []; // nextUnitOfWork = {
  //     dom: container,
  //     props: {
  //         children: [element]
  //     }
  // }
}

function useState(initial) {
  const oldHook = wipFiber.alternate && wipFiber.alternate.hook;
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  const setState = action => {
    hook.queue.push(action);
    updateRender(); // console.log(currentRoot)
    // wipRoot = {
    //     dom: currentRoot.dom,
    //     props: currentRoot.props,
    //     alternate: currentRoot
    // }
    // nextUnitOfWork = wipRoot
    // deletions = []
  };

  wipFiber.hook = hook;
  return [hook.state, setState];
}

function updateRender() {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}

const myReact = {
  createElement,
  render,
  useState
};
const arr = [];

for (let i = 0; i < 10000; i++) {
  // const element = array[i];
  arr.push(i);
} // const element = (<div id="foo">
//     <a>bar</a>
//     <b>bbbb</b>
//     <button onClick={() => { alert('click') }}>btn</button>
// </div>)


const App = props => {
  return myReact.createElement("div", null, "hello ", props.name, myReact.createElement(Counter, null));
};

function Counter() {
  const [state, setState] = myReact.useState(1);
  return myReact.createElement("h1", null, "Count: ", state, myReact.createElement("button", {
    onClick: () => setState(c => c + 1)
  }, "btn"));
}

const element = myReact.createElement(App, {
  name: "world"
});
myReact.render(element, document.getElementById('app'));