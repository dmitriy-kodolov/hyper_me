import { useEffect, useState } from "react";
import { useSwitchNetwork, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import { formatEther } from "ethers";

import Box from "components/shared/Box";
import Input from "components/shared/Input";
import Button from "components/shared/Button";
import CoinsSelect from "components/CoinsSelect";
import Toast from "components/Toast";
import SwapButton from "components/shared/SwapButton";

import { COINS } from "lib/constants/coins";
import { useContract } from "lib/hooks/useContract";

// import refresh from "assets/refresh.svg";

import s from "./FTPage.module.scss";

const FTPage = () => {
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [claimCount, setClaimCount] = useState(1000);
  const [bridgeCount, setBridgeCount] = useState(1000);
  const [balance, setBalance] = useState(0);

  const { contract } = useContract("hFT");
  const { address, chainId: currentChainId } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();

  const getBalance = async () => {
    const coinsBalance = await contract.balanceOf(address);
    setBalance(formatEther(coinsBalance).split(".")[0]);
  };

  useEffect(() => {
    if (!contract) return;

    getBalance();
  }, [contract]);

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

  const setCountHandler = (countInput, type = "claim") => {
    if (!/^\d+$/.test(countInput)) {
      return;
    }

    if (type === "claim") {
      setClaimCount(countInput);
      return;
    }

    setBridgeCount(countInput);
  };

  const claimHandler = async () => {
    if (!contract) return;

    if (currentChainId !== from.chainId) {
      switchNetwork(from.chainId);
      return;
    }

    try {
      const mintFeePerETH = await contract.mintFeePerETH();
      const minAmount = await contract.minAmountRule();
      const fee = mintFeePerETH * BigInt(claimCount);
      const tokenToClaim = minAmount * BigInt(claimCount);

      const mint = await contract.mint(address, tokenToClaim, {
        value: fee,
      });
      await mint.wait();
      await getBalance();
    } catch (error) {
      toast(<Toast title="Claim error" error={error} />);
    }
  };

  const bridgeHandler = async () => {
    if (!contract) return;

    if (currentChainId !== from.chainId) {
      switchNetwork(from.chainId);
      return;
    }

    try {
      const fee = await contract.bridgeFeeWithToken();
      const minAmount = await contract.minAmountRule();
      const tokenToBridge = minAmount * BigInt(bridgeCount);
      const hyperLaneFee = await contract.calculateHyperlaneFee(
        tokenToBridge,
        to.chainId,
        "",
      );
      const resultFee = hyperLaneFee + fee;

      const bridge = await contract.bridge(tokenToBridge, to.chainId, "", {
        value: resultFee,
      });
      await bridge.wait();
      await getBalance();
    } catch (error) {
      toast(<Toast title="Bridge error" error={error} />);
    }
  };

  return (
    <Box className={s.wrapper}>
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
          value={claimCount}
          type="number"
          onChange={(e) => setCountHandler(e.target.value)}
        />
        <Button className={s.rowBtn} isSecondType onClick={claimHandler}>
          CLAIM
        </Button>
      </div>

      <div className={s.bridgeBlock}>
        <div className={s.balance}>
          <span>Balance: {balance}</span>
          {/* <img src={refresh} alt="refresh" /> */}
        </div>
        <div className={s.row}>
          <span>Tokens to be bridget</span>
          <Input
            className={s.rowInput}
            value={bridgeCount}
            type="number"
            onChange={(e) => setCountHandler(e.target.value, "bridge")}
          />
          <Button className={s.rowBtn} isSecondType onClick={bridgeHandler}>
            BRIDGE
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default FTPage;
