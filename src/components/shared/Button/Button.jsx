import cn from "classnames";

import s from "./Button.module.scss";

const Button = (props) => {
  const { children, isSecondType, className, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(s.root, { [s.secondary]: isSecondType }, className)}
    >
      {children}
    </button>
  );
};

export default Button;
