import * as React from 'react';
import { Modal, Select } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import useConstant from 'use-constant';
import { container } from 'tsyringe';
import { UserService } from '../../services';
import { User } from '../../models';

export const PickUserModal = NiceModal.create(() => {
  const modal = useModal();
  const userService = useConstant(() => container.resolve(UserService));
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User>(null);

  React.useEffect(() => {
    setUsers(userService.fetchList());
  }, []);

  return (
    <Modal
      title="选择用户"
      onOk={() => {
        modal.resolve(selectedUser.id);
        modal.hide();
      }}
      okButtonProps={{ disabled: !selectedUser }}
      visible={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <Select
        style={{ width: 320 }}
        value={selectedUser?.id}
        onChange={(v) => {
          setSelectedUser(users.find((u) => u.id === v));
        }}
      >
        {users.map((u) => {
          return (
            <Select.Option key={u.id} value={u.id}>
              {u.name}
            </Select.Option>
          );
        })}
      </Select>
    </Modal>
  );
});
