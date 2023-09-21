'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { serverState } from '@/lib/jotail/themState';

function ServerWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default ServerWrapper;
