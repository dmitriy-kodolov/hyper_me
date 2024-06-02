import cn from "classnames";
import s from "./SwapButton.module.scss";

const SwapButton = (props) => {
  const { onClick, className } = props;

  return (
    <button className={cn(s.root, className)} type="button" onClick={onClick}>
      <img src="src/assets/swap.svg" alt="swap" />
    </button>
  );
};

export default SwapButton;
