import { useContextMenu } from "../hooks/useContextMenu";

export default function ContextMenu({ children }: { children: JSX.Element }) {
  const { xPos, yPos, showMenu } = useContextMenu();
  return (
    <>
      {showMenu ? (
        <div
          className="menu-container"
          style={{
            top: yPos,
            left: xPos,
            visibility: showMenu ? "visible" : "hidden",
            zIndex: 1,
            position: "absolute",
          }}
        >
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
