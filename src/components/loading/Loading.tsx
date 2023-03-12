import React from "react";

import { ProgressSpinner } from 'primereact/progressspinner';

const Loading: React.FC = () => {
  return(
    <div className="flex h-screen justify-content-center align-items-center">
      <ProgressSpinner style={{width: '50px', height: '50px'}} animationDuration=".5s" />
    </div>
  )
}

export default Loading;