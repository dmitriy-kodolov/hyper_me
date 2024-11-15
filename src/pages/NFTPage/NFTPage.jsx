/* eslint-disable no-await-in-loop */
import { useEffect, useState } from "react";
import { useSwitchNetwork, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toast } from "react-toastify";

import Box from "components/shared/Box";
import Button from "components/shared/Button";
import CoinsSelect from "components/CoinsSelect";
import Select from "components/shared/Select";
import SwapButton from "components/shared/SwapButton";
import Toast from "components/Toast";
import HyperlaneTransactionLink from "components/HyperlaneTransactionLink";

import { COINS } from "lib/constants/coins";
import { useContract } from "lib/hooks/useContract";
import {
  CONTRACT_ADDRESS,
  MOONBEAM_CONTRACT,
  MOONBEAM_CHAIN_ID,
} from "lib/constants/default";
import { ABI } from "lib/constants/abi";

import s from "./NFTPage.module.scss";

const NFTPage = () => {
  const [from, setFrom] = useState(COINS[0]);
  const [to, setTo] = useState(COINS[1]);
  const [allNftCount, setAllNftCount] = useState([]);
  const [nftToBridge, setNftToBridge] = useState(null);

  const { address, chainId: currentChainId } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();
  const currentContractAddress =
    currentChainId === MOONBEAM_CHAIN_ID ? MOONBEAM_CONTRACT : CONTRACT_ADDRESS;
  const { contract } = useContract(ABI, currentContractAddress);

  const getAllNft = async () => {
    const nftBalance = await contract.balanceOf(address);
    const nfts = Array.from({ length: Number(nftBalance) }, (v, i) => i + 1);
    const tokensArr = [];
    try {
      for (let i = 0; i <= nfts.length; i += 1) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        tokensArr.push({ key: `${tokenId}`, value: `${tokenId}` });
      }
    } catch (error) {
      console.error("get nft balance error", error);
    }
    setAllNftCount(tokensArr);
    setNftToBridge(tokensArr[0]);
  };

  useEffect(() => {
    if (!contract) return;

    getAllNft();
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

  const mintHandler = async () => {
    if (!contract) return;

    if (currentChainId !== from.chainId) {
      switchNetwork(from.chainId);
      return;
    }

    try {
      const fee = await contract.mintFee();
      const mint = await contract.mint(address, {
        value: fee,
      });
      await mint.wait();
      await getAllNft();
    } catch (error) {
      toast(<Toast title="Mint error" error={error} />);
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
      const hyperLaneFee = await contract.calculateBridgeFee(0, to.chainId, "");
      const bridge = await contract.bridge(
        BigInt(nftToBridge.value),
        to.chainId,
        "",
        {
          value: fee + hyperLaneFee,
        },
      );
      const receipt = await bridge.wait();
      toast(
        <Toast title="Your transaction">
          <HyperlaneTransactionLink txHash={receipt.hash} />
        </Toast>,
      );
      await getAllNft();
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
        <Button className={s.rowBtn} isSecondType onClick={mintHandler}>
          MINT
        </Button>
      </div>

      <div className={s.bridgeBlock}>
        {allNftCount.length !== 0 && (
          <div className={s.selectNftBlock}>
            <Select
              value={nftToBridge}
              items={allNftCount}
              onChange={(value) => setNftToBridge(value)}
            />
          </div>
        )}

        <div className={s.row}>
          <Button onClick={bridgeHandler} className={s.rowBtn} isSecondType>
            BRIDGE
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default NFTPage;
