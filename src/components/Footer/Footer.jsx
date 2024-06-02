import twitter from "assets/twitter.svg";
import gitbook from "assets/gitbook.svg";

import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={s.root}>
      <a className={s.link} href="/">
        <img src={twitter} alt="twitter" />
      </a>
      <a className={s.link} href="/">
        <img src={gitbook} alt="gitbook" />
      </a>
    </div>
  );
};

export default Footer;
