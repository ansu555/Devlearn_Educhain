// Frontend/app/components/SmartContractPlayground/index.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ContractEditor from './ContractEditor';
import Compiler from './Compiler';
import Deployer from './Deployer';
import Interactor from './Interactor';

export default function SmartContractPlayground() {
  const [code, setCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    function set(uint256 x) public {
        storedData = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`);
  const [compiledContract, setCompiledContract] = useState(null);
  const [deployedContract, setDeployedContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [compileError, setCompileError] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = provider.getSigner();
          setAccount(accounts[0]);
          setSigner(signer);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask to use this playground!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const compileContract = async () => {
    setIsCompiling(true);
    setCompileError('');
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source: code }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCompiledContract(data);
      } else {
        setCompileError(data.error || 'Compilation failed');
      }
    } catch (error) {
      setCompileError('Error: ' + error.message);
    } finally {
      setIsCompiling(false);
    }
  };

  const deployContract = async () => {
    if (!compiledContract || !signer) return;
    
    setIsDeploying(true);
    try {
      const factory = new ethers.ContractFactory(
        compiledContract.abi,
        compiledContract.bytecode,
        signer
      );
      
      const contract = await factory.deploy();
      await contract.deployed();
      
      setDeployedContract(contract);
      setContractAddress(contract.address);
    } catch (error) {
      console.error('Error deploying contract:', error);
      alert(`Deployment failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Contract Playground</h1>
        
        {!isConnected ? (
          <button 
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm">
              {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </span>
          </div>
        )}
      </div>

      <ContractEditor code={code} setCode={setCode} />
      
      <Compiler 
        code={code} 
        compileContract={compileContract} 
        compileError={compileError}
        isCompiling={isCompiling}
      />
      
      {compiledContract && (
        <Deployer 
          compiledContract={compiledContract}
          deployContract={deployContract}
          contractAddress={contractAddress}
          isConnected={isConnected}
          isDeploying={isDeploying}
        />
      )}
      
      {deployedContract && (
        <Interactor 
          contract={deployedContract} 
          abi={compiledContract.abi} 
        />
      )}
    </div>
  );
}