import { useRef, useState } from "react";
import cn from "classnames";

import { useOutsideClick } from "lib/hooks/useOutsideClick";

import arrowDown from "assets/arrowDown.svg";

import s from "./Select.module.scss";

const MenuItem = (props) => {
  const { item, onClick, isActive } = props;
  const { value } = item;

  return (
    <div
      className={cn(s.selectedItem, s.menuItem, { [s.active]: isActive })}
      onClick={() => onClick(item)}
    >
      <span>{value}</span>
    </div>
  );
};

const Select = (props) => {
  const { items, onChange, value } = props;

  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={cn(s.root, { [s.rootOpen]: isDropdownOpen })}>
      <div className={s.selectedItemBlock} onClick={toggleDropdown}>
        <div className={s.selectedItem}>
          <span>{value.value}</span>
        </div>

        <img
          className={cn({ [s.rotate]: isDropdownOpen })}
          src={arrowDown}
          alt="arrow up"
        />
      </div>

      {isDropdownOpen && (
        <div className={s.menuWrapper}>
          <menu className={s.menu} ref={dropdownRef}>
            {items.map((item) => (
              <MenuItem
                onClick={(val) => {
                  onChange(val);
                  setIsDropdownOpen(false);
                }}
                key={item.key}
                item={item}
              />
            ))}
          </menu>
        </div>
      )}
    </div>
  );
};

export default Select;
