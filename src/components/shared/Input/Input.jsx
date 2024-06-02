import cn from "classnames";
import s from "./Input.module.scss";

const Input = (props) => {
  const {
    placeholder,
    value,
    onChange,
    inputType = "text",
    className,
    ...rest
  } = props;

  return (
    <div className={cn(className, s.root)}>
      <input
        value={value}
        onChange={onChange}
        className={s.input}
        placeholder={placeholder}
        type={inputType}
        {...rest}
      />
    </div>
  );
};

export default Input;
