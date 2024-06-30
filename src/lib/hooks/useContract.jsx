import { useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";

import { ABI } from "lib/constants/abi";
import { CONTRACT_ADDRESS } from "lib/constants/default";

export const useContract = (abi = ABI, contractAddress = CONTRACT_ADDRESS) => {
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

    const contractInstance = new Contract(contractAddress, abi, signer);

    setContract(contractInstance);
  };

  useEffect(() => {
    getContract();
  }, [isConnected, address, chainId, abi, contractAddress]);

  return { contract };
};
