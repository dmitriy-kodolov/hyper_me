import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={s.root}>
      <a className={s.link} href="/">
        <img src="/src/assets/twitter.svg" alt="twitter" />
      </a>
      <a className={s.link} href="/">
        <img src="/src/assets/gitbook.svg" alt="gitbook" />
      </a>
    </div>
  );
};

export default Footer;
