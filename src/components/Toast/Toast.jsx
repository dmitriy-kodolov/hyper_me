import { useState } from "react";
import cn from "classnames";

import s from "./Toast.module.scss";

const Toast = (props) => {
  const { title, error, children } = props;
  const [isShowDetails, setIsShowDetails] = useState(false);

  return (
    <div className={s.root}>
      <span className={s.errorTitle}>{title}</span>
      <button
        className={s.button}
        type="button"
        onClick={() => setIsShowDetails(!isShowDetails)}
      >
        Show details
      </button>

      {!children && (
        <span className={cn(s.error, { [s.errorOpen]: isShowDetails })}>
          {error.toString()}
        </span>
      )}

      {children && (
        <div className={cn(s.error, { [s.errorOpen]: isShowDetails })}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Toast;
