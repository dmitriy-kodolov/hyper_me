import { useState } from "react";

import Box from "components/shared/Box";
import Input from "components/shared/Input";
import Button from "components/shared/Button";
import CoinsSelect from "components/CoinsSelect";
import SwapButton from "components/shared/SwapButton";

import { COINS } from "lib/constants/coins";
import refresh from "assets/refresh.svg";

import s from "./FTPage.module.scss";

const FTPage = () => {
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [claim, setClaim] = useState(0);
  const [bridget, setBridget] = useState(0);
  const [balance, setBalance] = useState(100000);

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
      {/* <h2 className={s.title}>Send ERC20</h2> */}

      <div className={s.selects}>
        <div className={s.labelBlock}>
          <span>From</span>
          <CoinsSelect value={from} items={COINS} onChange={onChangeFrom} />
        </div>

        <SwapButton className={s.swap} onClick={swapHandler} />

        <div className={s.labelBlock}>
          <span>To</span>
          <CoinsSelect value={to} items={COINS} onChange={onChangeTo} />
        </div>
      </div>

      <div className={s.row}>
        <span>Claim amount</span>
        <Input
          className={s.rowInput}
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />
        <Button className={s.rowBtn} isSecondType>
          CLAIM
        </Button>
      </div>

      <div className={s.bridgeBlock}>
        <div className={s.balance}>
          <span>Balance: {balance}</span>
          <img src={refresh} alt="refresh" />
        </div>
        <div className={s.row}>
          <span>Tokens to be bridget</span>
          <Input
            className={s.rowInput}
            value={bridget}
            onChange={(e) => setBridget(e.target.value)}
          />
          <Button className={s.rowBtn} isSecondType>
            BRIDGE
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default FTPage;
