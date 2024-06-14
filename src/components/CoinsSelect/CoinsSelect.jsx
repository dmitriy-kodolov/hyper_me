import { useRef, useState } from "react";
import cn from "classnames";

import { useOutsideClick } from "lib/hooks/useOutsideClick";
import { getCoinImage } from "lib/utils/getCoinImage";

import Input from "components/shared/Input";

import arrowDown from "assets/arrowDown.svg";
import menu from "assets/menu.svg";
import burgerMenu from "assets/burgerMenu.svg";

import s from "./CoinsSelect.module.scss";

const MenuItem = (props) => {
  const { item, onClick, isIconMode } = props;
  const { img, title } = item;

  return (
    <div
      className={cn(s.selectedItem, s.menuItem, {
        [s.selectedItemIconMode]: isIconMode,
      })}
      onClick={() => onClick(item)}
    >
      <img className={s.selectedItemImg} src={getCoinImage(img)} alt={title} />
      {!isIconMode && <span>{title}</span>}
    </div>
  );
};

const CoinsSelect = (props) => {
  const { items, onChange, value } = props;

  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isIconMode, setIsIconMode] = useState(false);

  const filteredCoins = items.filter((coin) =>
    coin.title.toLowerCase().includes(search.toLowerCase()),
  );

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn(s.root, { [s.rootOpen]: isDropdownOpen })}
    >
      <div className={s.selectedItemBlock} onClick={toggleDropdown}>
        <div className={s.selectedItem}>
          <img src={getCoinImage(value.img)} alt={value.title} />
          <span>{value.title}</span>
        </div>

        <img
          className={cn({ [s.rotate]: isDropdownOpen })}
          src={arrowDown}
          alt="arrow up"
        />
      </div>

      {isDropdownOpen && (
        <div className={s.menuWrapper}>
          <div className={s.searchBlock}>
            <Input
              className={s.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
            <div
              className={s.menuIcon}
              onClick={() => setIsIconMode(!isIconMode)}
            >
              <img src={isIconMode ? burgerMenu : menu} alt="menu" />
            </div>
          </div>

          <menu className={cn(s.menu, { [s.menuIconMode]: isIconMode })}>
            {filteredCoins.map((item) => (
              <MenuItem
                onClick={(val) => {
                  onChange(val);
                  setIsDropdownOpen(false);
                }}
                key={item.title}
                item={item}
                isIconMode={isIconMode}
              />
            ))}
          </menu>
        </div>
      )}
    </div>
  );
};

export default CoinsSelect;
