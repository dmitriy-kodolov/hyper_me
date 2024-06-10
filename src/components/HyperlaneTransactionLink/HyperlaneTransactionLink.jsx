import s from "./HyperlaneTransactionLink.module.scss";

const CHECK_TRANSACTION_URL = `https://explorer.hyperlane.xyz/?search=`;

const HyperlaneTransactionLink = (props) => {
  const { txHash } = props;

  return (
    <a
      target="_blank"
      className={s.root}
      href={`${CHECK_TRANSACTION_URL}${txHash}`}
    >{`${CHECK_TRANSACTION_URL}${txHash}`}</a>
  );
};

export default HyperlaneTransactionLink;
