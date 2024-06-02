import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={s.root}>
      <a className={s.link} href="/">
        <img src="hyper_me/src/assets/twitter.svg" alt="twitter" />
      </a>
      <a className={s.link} href="/">
        <img src="hyper_me/src/assets/gitbook.svg" alt="gitbook" />
      </a>
    </div>
  );
};

export default Footer;
