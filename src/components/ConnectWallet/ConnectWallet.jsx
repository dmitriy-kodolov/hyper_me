import { useWeb3Modal } from "@web3modal/ethers/react";

import s from "./ConnectWallet.module.scss";

const ConnectWallet = () => {
  const { open } = useWeb3Modal();

  return (
    <button className={s.root} onClick={() => open()} type="button">
      CONNECT WALLET
    </button>
  );
};

export default ConnectWallet;
