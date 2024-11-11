import React from 'react';

interface TableProps {
    data: Array<{
        id: number;
        name: string;
        value: string;
    }>;
    onActionClick: (id: number, action: string) => void;
}
declare const Table: ({ data, onActionClick }: TableProps) => React.JSX.Element;

export { Table as default };
