import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { DAppProvider, BSC } from '@usedapp/core';
import ThemeContextWrapper from './utils/theme/themeContextWrapper';


const config  = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: BSC-RPC-URL
  },
  refresh: 20,
};

ReactDOM.render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <DAppProvider config={config}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DAppProvider>
    </React.StrictMode>
  </ThemeContextWrapper>,
  document.getElementById('root')
);