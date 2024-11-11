import React from 'react';

interface TableProps {
  data: Array<{ id: number; name: string; value: string }>;
  onActionClick: (id: number, action: string) => void;
}

const Table = ({ data, onActionClick }: TableProps) => {
  // Component implementation
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {item.name} - {item.value}
          <button onClick={() => onActionClick(item.id, 'edit')}>Edit</button>
          <button onClick={() => onActionClick(item.id, 'delete')}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Table;
