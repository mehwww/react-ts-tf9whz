import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import 'antd/dist/antd.css';
import './style.css';
import { PickUserModal } from './src/components/dialogs';

export default function App() {
  return (
    <div>
      <h1
        onClick={async () => {
          const res = await NiceModal.show(PickUserModal, { name: 'Nate' });
          console.log(res);
        }}
      >
        Hello StackBlitz!
      </h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
