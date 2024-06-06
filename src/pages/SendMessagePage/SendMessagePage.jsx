import { useEffect, useState } from "react";

import Box from "components/shared/Box";
import Input from "components/shared/Input";
import Button from "components/shared/Button";
import Select from "components/shared/Select/Select";
import SwapButton from "components/shared/SwapButton";

import { COINS } from "lib/constants/coins";

import {
  useWeb3ModalProvider,
  useSwitchNetwork,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, ethers } from "ethers";
import { ABI } from "lib/constants/abi";
import s from "./SendMessagePage.module.scss";

const CONTRACT_ADDRESS = "0xaA2645d256f298395510FE181888803d8AA9a4c9";

const SendMessagePage = () => {
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [message, setMessage] = useState("TEST");
  const [contract, setContract] = useState(null);
  const { walletProvider } = useWeb3ModalProvider();
  const { switchNetwork } = useSwitchNetwork();
  const {
    address,
    chainId: currentChainId,
    isConnected,
  } = useWeb3ModalAccount();

  const getContract = async () => {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    const contractInstance = new Contract(CONTRACT_ADDRESS, ABI, signer);

    setContract(contractInstance);
  };

  useEffect(() => {
    if (!isConnected) return;

    getContract();
  }, [isConnected]);

  const swapHandler = () => {
    setFrom(to);
    setTo(from);
  };

  const onChangeFrom = (coin) => {
    setFrom(coin);

    if (coin.title === to.title) {
      setTo(COINS.find((coinItem) => coinItem.title !== to.title));
    }
  };

  const onChangeTo = (coin) => {
    setTo(coin);
    if (coin.title === from.title) {
      setFrom(COINS.find((coinItem) => coinItem.title !== from.title));
    }
  };

  const sendMessageHandler = async () => {
    if (!isConnected) return;

    if (currentChainId !== from.chainId) {
      switchNetwork(from.chainId);
      return;
    }

    if (!contract) return;

    try {
      const payableAmount = ethers.parseEther("0.0005");

      const mint = await contract.mint(address, {
        value: payableAmount,
      });
      console.log("mint", mint);
    } catch (error) {
      console.error("Error sending message!!!:", error);
    }
  };

  return (
    <Box className={s.wrapper}>
      <h2 className={s.title}>Send message</h2>

      <div className={s.selects}>
        <div className={s.labelBlock}>
          <span>From</span>
          <Select value={from} items={COINS} onChange={onChangeFrom} />
        </div>

        <SwapButton onClick={swapHandler} className={s.swap} />

        <div className={s.labelBlock}>
          <span>To</span>
          <Select value={to} items={COINS} onChange={onChangeTo} />
        </div>
      </div>

      <Input
        placeholder="Type your text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className={s.sendMessageBtn}
        isSecondType
        onClick={sendMessageHandler}
      >
        SEND MESSAGE
      </Button>
    </Box>
  );
};

export default SendMessagePage;
