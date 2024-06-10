import { useState } from "react";
import cn from "classnames";

import s from "./ErrorToast.module.scss";

const ErrorMessageBlock = (props) => {
  const { title, error } = props;
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

      <span className={cn(s.error, { [s.errorOpen]: isShowDetails })}>
        {error.toString()}
      </span>
    </div>
  );
};

export default ErrorMessageBlock;
