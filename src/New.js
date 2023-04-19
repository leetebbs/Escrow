import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import deploy from "./deploy";
import Navbar from "./Navbar";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function New() {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById("beneficiary").value;
    const arbiter = document.getElementById("arbiter").value;
    const value = ethers.BigNumber.from(
      document.getElementById("wei").value * 10 ** 18
    );
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    setContract(escrowContract);
  }
  return (
    <div className="app_con">
      <Navbar />
      <div className="contract">
        <h1 className="title_new"> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in Eth)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>
      {contract && (
        <p className="contract-address">Deployed to {contract.address}</p>
      )}
    </div>
  );
}

export default New;
