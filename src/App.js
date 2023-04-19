import { ethers } from "ethers";
import { useEffect, useState } from "react";
import deploy from "./deploy";
import Escrow from "./Escrow";
import Navbar from "./Navbar";
import Existing from "./Existing";
import { Route, Routes, Link } from "react-router-dom";
import New from "./New";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  return (
    <>
      <div className="app_con">
        <Routes>
          <Route path="/" element={<New />} />
          <Route path="/existing" element={<Existing />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
