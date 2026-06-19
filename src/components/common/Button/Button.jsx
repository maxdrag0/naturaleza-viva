import "./Button.css";

function Button({ callback, children, className, ...props }) {
  return (
    <button className={`boton-common ${className}`} onClick={callback} {...props}>
      {children}
    </button>
  );
}

export { Button };
