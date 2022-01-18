import { useContextMenu } from "../hooks/useContextMenu";

/**
 * This is the wrapper for the context menu (right click menu)
 * @param children This is a react component. Put your menu here.
 * @returns
 */
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
