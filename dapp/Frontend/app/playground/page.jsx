// Frontend/app/playground/page.jsx
import React from 'react';
import SmartContractPlayground from '../SmartContractPlayground';

export const metadata = {
  title: 'Smart Contract Playground',
  description: 'Write, compile, deploy, and interact with smart contracts',
};

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-8">
      <SmartContractPlayground />
    </div>
  );
}