import "./PokeButton.css";
/**
 *  Generic button wrapper and expects a CSS classname and a function
 * @param {className} className
 * @param {onClickAction} onClickAction
 * @returns
 */
const PokeButton = ({ children, className, onClickAction }) => {
  return (
    <button className={className} onClick={onClickAction}>
      {children}
    </button>
  );
};

export default PokeButton;
