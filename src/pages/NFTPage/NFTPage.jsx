import { useState } from "react";

import Box from "components/shared/Box";
import Input from "components/shared/Input";
import Button from "components/shared/Button";
import Select from "components/shared/Select/Select";
import SwapButton from "components/shared/SwapButton";

import { COINS } from "lib/constants/coins";

import s from "./NFTPage.module.scss";

const NFTPage = () => {
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [claim, setClaim] = useState(0);
  const [bridget, setBridget] = useState(1000);
  // const [balance, setBalance] = useState(0);

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
      {/* <h2 className={s.title}>Send ERC721</h2> */}

      <div className={s.selects}>
        <div className={s.labelBlock}>
          <span>From</span>
          <Select value={from} items={COINS} onChange={onChangeFrom} />
        </div>

        <SwapButton className={s.swap} onClick={swapHandler} />

        <div className={s.labelBlock}>
          <span>To</span>
          <Select value={to} items={COINS} onChange={onChangeTo} />
        </div>
      </div>

      <div className={s.row}>
        {/* <span>Claim amount</span>
        <Input
          className={s.rowInput}
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        /> */}
        <Button className={s.rowBtn} isSecondType>
          MINT
        </Button>
      </div>

      <div className={s.bridgeBlock}>
        {/* <div className={s.balance}>
          <span>Balance: {balance}</span>
          <img src="src/assets/refresh.svg" alt="refresh" />
        </div> */}
        <div className={s.row}>
          {/* <span>Tokens to be bridget</span>
          <Input
            className={s.rowInput}
            value={bridget}
            onChange={(e) => setBridget(e.target.value)}
          /> */}
          <Button className={s.rowBtn} isSecondType>
            BRIDGE
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default NFTPage;
