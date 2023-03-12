import React from 'react';
import AppTopBar from './AppTopBar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout:React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <AppTopBar />
      <div className="m-3">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
