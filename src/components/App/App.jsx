import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

import NavBar from "components/NavBar";
import ConnectWallet from "components/ConnectWallet";
import ToastrProvider from "components/ToastrProvider";
import Footer from "components/Footer";
import SendMessagePage from "pages/SendMessagePage";
import FTPage from "pages/FTPage";
import NFTPage from "pages/NFTPage";

import { arbitrum, mainnet, base } from "lib/constants/chains";
import { useContract } from "lib/hooks/useContract";

import Logo from "assets/Logo.png";

import s from "./App.module.scss";

// 1. Get projectId
const projectId = "2bbedc7d815d08e77e55f05847c89f8b";

// 3. Create a metadata object
const metadata = {
  name: "Hyper Me",
  description: "Hyper Me",
  url: "https://dmitriy-kodolov.github.io/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /* Required */
  metadata,

  /* Optional */
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, arbitrum, base],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const App = () => {
  const { contract } = useContract();
  return (
    <ToastrProvider>
      <div className={s.root}>
        <Router>
          <div className={s.header}>
            <img className={s.logo} src={Logo} alt="logo" />
            <NavBar />
            <ConnectWallet />
          </div>
          <main className={s.main}>
            <Routes>
              <Route
                exact
                path="/"
                element={<SendMessagePage contract={contract} />}
              />
              <Route path="/hFT" element={<FTPage contract={contract} />} />
              <Route path="/hNFT" element={<NFTPage contract={contract} />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </ToastrProvider>
  );
};

export default App;
