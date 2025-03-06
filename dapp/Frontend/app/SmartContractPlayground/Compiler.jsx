// Frontend/app/components/SmartContractPlayground/Compiler.jsx
'use client';

import React from 'react';

export default function Compiler({ code, compileContract, compileError, isCompiling }) {
  return (
    <div className="flex flex-col space-y-3">
      <button 
        onClick={compileContract}
        disabled={isCompiling}
        className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ${isCompiling ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isCompiling ? 'Compiling...' : 'Compile Contract'}
      </button>
      
      {compileError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="font-bold">Compilation Error</div>
          <pre className="mt-2 whitespace-pre-wrap text-sm">{compileError}</pre>
        </div>
      )}
    </div>
  );
}