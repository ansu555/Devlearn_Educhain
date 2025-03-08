'use client'

import { ReactNode } from 'react';
import { OCConnect, OCConnectProps } from '@opencampus/ocid-connect-js';



export default function OCConnectWrapper({ children, opts, sandboxMode }) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}