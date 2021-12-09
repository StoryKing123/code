import react, { FC, useEffect, useRef } from "react";
type VirtualListProps = {
  list: any[];
  estimatedItemSize: number;
  item: any;
  height: string;
};
const VirtualListComponent: FC<VirtualListProps> = (props) => {
  const visibleIndex = 0;
  const size = 10;
  const sizeArr = [];
  let currentSize = 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleScroll = (event: Event) => {
    console.log("scroll");
    console.log(containerRef.current?.scrollTop)
    // console.log(containerRef.current?.offsetTop)
  };
  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  for (let i = 0; i < size; i++) {
    sizeArr.push("");
  }

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "scroll",
        height: "50vh",
      }}
    >
      <div
        style={{
          height: `${props.list.length * props.estimatedItemSize}px`,
        }}
      >
        {props.list.length !== 0 &&
          sizeArr.map((item, sizeIndex) => {
            const index = visibleIndex + sizeIndex;
            return props.item(props.list[index], index);
          })}
      </div>
    </div>
  );
};
export default VirtualListComponent;
