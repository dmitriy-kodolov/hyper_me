import { useState } from "react";
import { useSwitchNetwork, useWeb3ModalAccount } from "@web3modal/ethers/react";

import Box from "components/shared/Box";
import Input from "components/shared/Input";
import Button from "components/shared/Button";
import CoinsSelect from "components/CoinsSelect";
import SwapButton from "components/shared/SwapButton";
import { useToast } from "components/ToastrProvider/ToastrProvider";

import { COINS } from "lib/constants/coins";

import s from "./SendMessagePage.module.scss";

const SendMessagePage = (props) => {
  const { contract } = props;
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [message, setMessage] = useState("TEST");

  const { chainId: currentChainId } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();
  const addToast = useToast();

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
    if (!contract) return;

    if (currentChainId !== from.chainId) {
      switchNetwork(from.chainId);
      return;
    }

    try {
      const fee = await contract.bridgeFee();
      const hyperLaneFee = await contract.calculateBridgeFee(0, to.chainId, "");

      const bridgeMessage = await contract.bridgeMessage(to.chainId, message, {
        value: fee + hyperLaneFee,
      });
      await bridgeMessage.wait();
    } catch (error) {
      addToast("An error occurred, please try again later.");
      console.error("Error sending message!!!:", error);
    }
  };

  return (
    <Box className={s.wrapper}>
      <h2 className={s.title}>Send message</h2>

      <div className={s.selects}>
        <div className={s.labelBlock}>
          <span>From</span>
          <CoinsSelect value={from} items={COINS} onChange={onChangeFrom} />
        </div>

        <SwapButton onClick={swapHandler} className={s.swap} />

        <div className={s.labelBlock}>
          <span>To</span>
          <CoinsSelect value={to} items={COINS} onChange={onChangeTo} />
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
