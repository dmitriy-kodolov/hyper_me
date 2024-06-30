import twitter from "assets/twitter.svg";
import gitbook from "assets/gitbook.svg";

import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={s.root}>
      <a className={s.link} href="https://x.com/Hyperme_xyz">
        <img src={twitter} alt="twitter" />
      </a>
      <a className={s.link} href="https://hyperme.gitbook.io">
        <img src={gitbook} alt="gitbook" />
      </a>
    </div>
  );
};

export default Footer;
