// Frontend/app/components/SmartContractPlayground/Deployer.jsx
'use client';

import React from 'react';

export default function Deployer({ 
  compiledContract, 
  deployContract, 
  contractAddress, 
  isConnected,
  isDeploying
}) {
  return (
    <div className="flex flex-col space-y-3 border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <h2 className="text-lg font-medium">Contract Compiled Successfully</h2>
      </div>
      
      <div>
        <p className="text-sm text-gray-600">ABI contains {compiledContract.abi.length} function definitions</p>
      </div>
      
      <button 
        onClick={deployContract}
        disabled={!isConnected || isDeploying}
        className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${(!isConnected || isDeploying) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isDeploying ? 'Deploying...' : 'Deploy Contract'}
      </button>
      
      {!isConnected && (
        <p className="text-sm text-orange-500">Please connect your wallet to deploy the contract</p>
      )}
      
      {contractAddress && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <div className="font-bold">Contract Deployed!</div>
          <p className="text-sm">Address: {contractAddress}</p>
        </div>
      )}
    </div>
  );
}