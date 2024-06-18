import { useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";

import { ABI, hFTABI } from "lib/constants/abi";
import { CONTRACT_ADDRESS, HFT_CONTRACT_ADDRESS } from "lib/constants/default";

const isHFTTypeContract = (pageType) => pageType === "hFT";

export const useContract = (pageType = "hFT") => {
  const [contract, setContract] = useState(null);
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address, chainId } = useWeb3ModalAccount();

  const getContract = async () => {
    if (!isConnected) {
      setContract(null);
      return;
    }

    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    const currentContractAddress = isHFTTypeContract(pageType)
      ? HFT_CONTRACT_ADDRESS
      : CONTRACT_ADDRESS;
    const currentContractAbi = isHFTTypeContract(pageType) ? hFTABI : ABI;

    const contractInstance = new Contract(
      currentContractAddress,
      currentContractAbi,
      signer,
    );

    setContract(contractInstance);
  };

  useEffect(() => {
    getContract();
  }, [isConnected, address, chainId]);

  return { contract };
};
