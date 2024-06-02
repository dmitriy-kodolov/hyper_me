import cn from "classnames";

import connectedBy from "assets/ConnectedBy.svg";

import s from "./Box.module.scss";

const Box = (props) => {
  const { children, className } = props;

  return (
    <div className={cn(s.root, className)}>
      {children}
      <div className={s.footer}>
        <img src={connectedBy} alt="connected by" />
      </div>
    </div>
  );
};

export default Box;
