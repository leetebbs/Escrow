import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useState } from "react";
import Navbar from "./Navbar";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Existing = () => {
  const [arbiter, setArbiter] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [value, setValue] = useState("");
  const [approved, setApproved] = useState(false);

  const Abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_arbiter",
          type: "address",
        },
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "Approved",
      type: "event",
    },
    {
      inputs: [],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "arbiter",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "beneficiary",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "depositor",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isApproved",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "value",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  async function handleApprove(props) {
    const contract = new ethers.Contract(props, Abi, provider);
    const signer = provider.getSigner();
    const approveTxn = await contract.connect(signer).approve();
    await approveTxn.wait();
    const approve = await contract.isApproved();
    setApproved(approve);
    console.log("approve");
  }

  async function exisitingContract(props) {
    const contract = new ethers.Contract(props, Abi, provider);
    const arbiter = await contract.arbiter();
    setArbiter(arbiter);
    const beneficiary = await contract.beneficiary();
    setBeneficiary(beneficiary);
    const value = await contract.value();
    setValue(parseInt(value));
    const approve = await contract.isApproved();
    setApproved(approve);

    document.getElementById("address").innerText = "✓ It's been approved!";

    console.log(approved);
  }

  return (
    <div>
      <div className="app_con">
        <Navbar />
        <div className="contract">
          <h1 className="title_new"> Existing Contract </h1>
          <label>
            Contract Address
            <input type="text" id="address" />
          </label>
          <div
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();
              exisitingContract(document.getElementById("address").value);
            }}
          >
            Fetch
          </div>
          {arbiter ? (
            <div className="existing">
              <p>arbiter: {arbiter}</p>
              <p>Beneficiary: {beneficiary}</p>
              <p>Value: {value / 10 ** 18} ETH</p>
              <div
                className="existingButton"
                id="address"
                onClick={(e) => {
                  e.preventDefault();

                  handleApprove(document.getElementById("address").value);
                }}
              >
                {approved ? "✓ It's been approved!" : "Approve"}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Existing;
