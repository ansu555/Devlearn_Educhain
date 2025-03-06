// Frontend/app/components/SmartContractPlayground/Interactor.jsx
'use client';

import React, { useState, useEffect } from 'react';

export default function Interactor({ contract, abi }) {
  const [functions, setFunctions] = useState([]);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (abi) {
      // Filter out functions from the ABI
      const funcAbi = abi.filter(item => item.type === 'function');
      
      // Initialize inputs and results state
      const initialInputs = {};
      const initialLoading = {};
      funcAbi.forEach(func => {
        const key = getFunctionKey(func);
        initialInputs[key] = Array(func.inputs.length).fill('');
        initialLoading[key] = false;
      });
      
      setFunctions(funcAbi);
      setInputs(initialInputs);
      setLoading(initialLoading);
    }
  }, [abi]);

  const getFunctionKey = (func) => {
    return `${func.name}(${func.inputs.map(input => input.type).join(',')})`;
  };

  const handleInputChange = (funcKey, index, value) => {
    setInputs(prev => ({
      ...prev,
      [funcKey]: prev[funcKey].map((val, i) => i === index ? value : val)
    }));
  };

  const callFunction = async (func) => {
    const funcKey = getFunctionKey(func);
    
    setLoading(prev => ({ ...prev, [funcKey]: true }));
    try {
      let functionParams = inputs[funcKey] || [];
      let result;
      
      // Handle function calls based on state mutability
      if (func.stateMutability === 'view' || func.stateMutability === 'pure') {
        // Read-only function
        result = await contract[func.name](...functionParams);
        setResults(prev => ({ ...prev, [funcKey]: result.toString() }));
      } else {
        // Transaction function
        const tx = await contract[func.name](...functionParams);
        await tx.wait();
        setResults(prev => ({ ...prev, [funcKey]: 'Transaction successful: ' + tx.hash }));
      }
    } catch (error) {
      console.error(`Error calling ${func.name}:`, error);
      setResults(prev => ({ ...prev, [funcKey]: `Error: ${error.message}` }));
    } finally {
      setLoading(prev => ({ ...prev, [funcKey]: false }));
    }
  };

  return (
    <div className="flex flex-col space-y-4 border border-gray-200 rounded-md p-4">
      <h2 className="text-lg font-medium">Contract Interaction</h2>
      
      {functions.length === 0 ? (
        <p className="text-gray-500">No functions available to interact with</p>
      ) : (
        <div className="space-y-4">
          {functions.map((func, index) => {
            const funcKey = getFunctionKey(func);
            const isReadOnly = func.stateMutability === 'view' || func.stateMutability === 'pure';
            
            return (
              <div key={index} className="p-3 border border-gray-200 rounded bg-white">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded ${isReadOnly ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                    {isReadOnly ? 'Read' : 'Write'}
                  </span>
                  <h3 className="font-medium">{func.name}</h3>
                </div>
                
                {/* Function inputs */}
                {func.inputs.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {func.inputs.map((input, idx) => (
                      <div key={idx} className="flex items-center">
                        <label className="w-32 text-sm text-gray-600">
                          {input.name || `param${idx}`} ({input.type}):
                        </label>
                        <input
                          type="text"
                          value={inputs[funcKey]?.[idx] || ''}
                          onChange={(e) => handleInputChange(funcKey, idx, e.target.value)}
                          placeholder={`Enter ${input.type}`}
                          className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Call button and results */}
                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => callFunction(func)}
                    disabled={loading[funcKey]}
                    className={`px-3 py-1 text-sm rounded ${
                      isReadOnly 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    } ${loading[funcKey] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading[funcKey] 
                      ? 'Processing...' 
                      : isReadOnly ? 'Call' : 'Send Transaction'}
                  </button>
                  
                  {results[funcKey] && (
                    <div className={`text-sm ${results[funcKey].startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
                      {results[funcKey].length > 40 
                        ? results[funcKey].substring(0, 37) + '...' 
                        : results[funcKey]}
                    </div>
                  )}
                </div>
                
                {/* Expanded result for long results */}
                {results[funcKey] && results[funcKey].length > 40 && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono break-all">
                    {results[funcKey]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}