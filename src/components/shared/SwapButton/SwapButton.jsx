import cn from "classnames";

import swap from "assets/swap.svg";

import s from "./SwapButton.module.scss";

const SwapButton = (props) => {
  const { onClick, className } = props;

  return (
    <button className={cn(s.root, className)} type="button" onClick={onClick}>
      <img src={swap} alt="swap" />
    </button>
  );
};

export default SwapButton;
