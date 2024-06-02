import cn from "classnames";

import s from "./Box.module.scss";

const Box = (props) => {
  const { children, className } = props;

  return (
    <div className={cn(s.root, className)}>
      {children}
      <div className={s.footer}>
        <img src="hyper_me/src/assets/ConnectedBy.svg" alt="connected by" />
      </div>
    </div>
  );
};

export default Box;
