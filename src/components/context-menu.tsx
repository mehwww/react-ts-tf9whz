import * as React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import classNames from 'classnames';
import { ContextMenuAction } from '../types/context-menu';

type IContextMenuProps<T> = {
  children?: React.ReactNode;
  actions: ContextMenuAction<T>[];
  actor: T;
};

// prettier-ignore
export const ContextMenu = <T,>({
  children,
  actions,
  actor,
}: IContextMenuProps<T>) => {
  return (
    <Dropdown
      overlay={
        <Menu
          items={actions
            .map((act) => {
              if (act.isHidden(actor)) {
                return null;
              }
              return {
                key: act.name,
                label: (
                  <div onClick={() => act.action(actor)}>{act.name}</div>
                ),
              };
            })
            .filter(Boolean)}
        />
      }
    >
      {children ?? <EllipsisOutlined />}
    </Dropdown>
  );
};
