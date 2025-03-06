// Frontend/app/api/compile/route.js
import { NextResponse } from 'next/server';
import solc from 'solc';

export async function POST(request) {
  try {
    const { source } = await request.json();
    
    if (!source) {
      return NextResponse.json({ error: 'No source code provided' }, { status: 400 });
    }

    // Prepare input for solc compiler
    const input = {
      language: 'Solidity',
      sources: {
        'contract.sol': {
          content: source
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        },
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    };

    // Compile the contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // Check for errors
    if (output.errors) {
      const hasError = output.errors.some(error => error.severity === 'error');
      if (hasError) {
        return NextResponse.json({ 
          error: output.errors.map(e => e.formattedMessage).join('\n') 
        }, { status: 400 });
      }
    }

    // Extract compiled contract data
    const contractName = Object.keys(output.contracts['contract.sol'])[0];
    const contract = output.contracts['contract.sol'][contractName];

    return NextResponse.json({
      abi: contract.abi,
      bytecode: contract.evm.bytecode.object
    });
  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}