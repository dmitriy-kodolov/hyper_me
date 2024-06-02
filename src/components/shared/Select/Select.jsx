import { useRef, useState } from "react";
import cn from "classnames";

import { useOutsideClick } from "lib/hooks/useOutsideClick";
import { getCoinImage } from "lib/utils/getCoinImage";

import arrowUp from "assets/arrowUp.svg";
import arrowDown from "assets/arrowDown.svg";

import s from "./Select.module.scss";

const MenuItem = (props) => {
  const { img, title, onClick, isActive, isIconMode } = props;

  return (
    <div
      className={cn(s.selectedItem, s.menuItem, { [s.active]: isActive })}
      onClick={() => onClick({ img, title })}
    >
      <img className={s.selectedItemImg} src={getCoinImage(img)} alt={title} />
      {!isIconMode && <span>{title}</span>}
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
          <img src={getCoinImage(value.img)} alt={value.title} />
          <span>{value.title}</span>
        </div>

        <img src={isDropdownOpen ? arrowUp : arrowDown} alt="arrow up" />
      </div>

      {isDropdownOpen && (
        <menu className={s.menu} ref={dropdownRef}>
          {items.map(({ img, title }) => (
            <MenuItem
              isActive={value.title === title}
              onClick={onChange}
              key={title}
              img={img}
              title={title}
            />
          ))}
        </menu>
      )}
    </div>
  );
};

export default Select;
