import React from 'react';
import Navbar from '@/components/navigation/navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
        <Navbar/>
        <div>{children}</div>
    </main>
  )
}

export default layout