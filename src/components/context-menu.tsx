import * as React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import classNames from "classnames";
import { ContextMenuAction } from "../types/context-menu";

type IContextMenuProps<T> = {
  children?: React.ReactNode;
  actions: ContextMenuAction<T>[];
  actor: T;
};

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
                  <span onClick={() => act.action(actor)}>{act.name}</span>
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
