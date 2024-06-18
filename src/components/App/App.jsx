import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "components/NavBar";
import ConnectWallet from "components/ConnectWallet";
import Footer from "components/Footer";
import SendMessagePage from "pages/SendMessagePage";
import FTPage from "pages/FTPage";
import NFTPage from "pages/NFTPage";

import {
  // mainnet,
  arbitrum,
  base,
  avalanche,
  bnb,
  celo,
  gnosis,
  manta,
  moonbeam,
  optimism,
  polygon,
  polygonZKEVM,
  scroll,
  zetachain,
} from "lib/constants/chains";

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
  chains: [
    // mainnet,
    arbitrum,
    base,
    avalanche,
    bnb,
    celo,
    gnosis,
    manta,
    moonbeam,
    optimism,
    polygon,
    polygonZKEVM,
    scroll,
    zetachain,
  ],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const App = () => {
  return (
    <div className={s.root}>
      <Router>
        <div className={s.header}>
          <img className={s.logo} src={Logo} alt="logo" />
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
