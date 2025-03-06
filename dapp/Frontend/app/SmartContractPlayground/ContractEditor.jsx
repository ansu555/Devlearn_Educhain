// Frontend/app/components/SmartContractPlayground/ContractEditor.jsx
'use client';

import React, { useEffect } from 'react';

export default function ContractEditor({ code, setCode }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Contract Code</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCode(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    function set(uint256 x) public {
        storedData = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`)}
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
          >
            Reset
          </button>
          <button 
            onClick={() => setCode(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "My Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Not enough tokens");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        return true;
    }
}`)}
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
          >
            ERC20 Example
          </button>
        </div>
      </div>
      
      <div className="border border-gray-300 rounded-md">
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm focus:outline-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
}