import React, { useEffect, useState } from "react";

export type MenuProps = JSX.IntrinsicAttributes & {
  show: boolean;
  position: { x: number; y: number };
};

export default function Menu({
  show = false,
  position,
}: {
  show: boolean;
  position: { x: number; y: number };
}) {
  const [isVisible, setIsVisible] = useState(show);
  useEffect(() => {
    setIsVisible(show);
    console.log(show);
    console.log(position);
  }, [position, show]);
  return (
    <div
      style={{
        display: isVisible ? "block" : "none",
        left: position.x,
        top: position.y,
        zIndex: 1,
        position: "absolute",
      }}
      onMouseLeave={() => setIsVisible(false)}
    >
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}
