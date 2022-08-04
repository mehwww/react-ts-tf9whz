import '@abraham/reflection';
import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NiceModal from '@ebay/nice-modal-react';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </StrictMode>
);
