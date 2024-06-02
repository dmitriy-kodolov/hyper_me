import { useState } from "react";

import Box from "components/shared/Box";
import Input from "components/shared/Input";
import Button from "components/shared/Button";
import Select from "components/shared/Select/Select";
import SwapButton from "components/shared/SwapButton";

import { COINS } from "lib/constants/coins";

import s from "./SendMessagePage.module.scss";

const SendMessagePage = () => {
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [message, setMessage] = useState("");

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
      <Button className={s.sendMessageBtn} isSecondType>
        SEND MESSAGE
      </Button>
    </Box>
  );
};

export default SendMessagePage;
