import * as React from "react";
import classNames from "classnames";

type IUserListProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const UserList = ({ className, style }: IUserListProps) => {
  return (
    <div className={classNames(className)} style={style}>
      UserList
    </div>
  );
};
