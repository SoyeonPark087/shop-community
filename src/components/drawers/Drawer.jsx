import { useEffect } from "react";
import "./Drawer.css";

export default function Drawer({
  open,
  onClose,
  title,
  children,
  width = 520,
  className = "",
}) {

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    const previousPaddingRight =
      document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight =
        `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.style.paddingRight =
        previousPaddingRight;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  const drawerWidth =
    typeof width === "number"
      ? `${width}px`
      : width;

  return (
    <div
      className={`drawer-layer ${
        open ? "drawer-layer--open" : ""
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="drawer-backdrop"
        onClick={onClose}
        aria-label="사이드 메뉴 닫기"
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={`drawer ${className}`}
        style={{
          "--drawer-width": drawerWidth,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="drawer__header">
          <h2>{title}</h2>

          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="닫기"
          >
            <span
              className="drawer__close-icon"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="drawer__body">
          {children}
        </div>
      </aside>
    </div>
  );
}