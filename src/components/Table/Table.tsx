import React, { FC, useState } from 'react';

interface TableProps {
  data: Array<{ id: number; name: string; value: string }>;
  onActionClick: (id: number, action: string) => void;
}

export const Table: FC<TableProps> = ({ data, onActionClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <input
                type="text"
                defaultValue={item.value}
                onBlur={(e) => onActionClick(item.id, e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => onActionClick(item.id, 'edit')}>Edit</button>
              <button onClick={() => onActionClick(item.id, 'delete')}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
