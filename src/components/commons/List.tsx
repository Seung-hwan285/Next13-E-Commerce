import React from "react";

function List({
  childern,
  className,
}: {
  childern: React.ReactNode;
  className: string;
}) {
  return <ul className={className}>{childern}</ul>;
}

function ListItem({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className: string;
  id: string | number;
}) {
  return (
    <li key={id} className={className}>
      {children}
    </li>
  );
}

List.item = ListItem;

export default List;
