import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NavBar from "components/NavBar";
import ConnectWallet from "components/ConnectWallet";
import Footer from "components/Footer";
import SendMessagePage from "pages/SendMessagePage";
import FTPage from "pages/FTPage";
import NFTPage from "pages/NFTPage";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import s from "./App.module.scss";

// 1. Get projectId
const projectId = "999d9bafc7c85eb4bb7a63abc956f01f";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 3. Create a metadata object
const metadata = {
  name: "Hyper Me",
  description: "Hyper Me",
  url: "http//localhost", // origin must match your domain & subdomain
  // icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /* Required */
  metadata,

  /* Optional */
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  // rpcUrl: "...", // used for the Coinbase SDK
  // defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const App = () => {
  return (
    <div className={s.root}>
      <Router>
        <div className={s.header}>
          <img className={s.logo} src="/src/assets/Logo.png" alt="logo" />
          <NavBar />
          <ConnectWallet />
        </div>
        <main className={s.main}>
          <Routes>
            <Route exact path="/" element={<SendMessagePage />} />
            <Route path="/hFT" element={<FTPage />} />
            <Route path="/hNFT" element={<NFTPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
