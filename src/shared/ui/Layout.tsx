import React from 'react';

import { Header } from 'widgets/Header';


interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
};
