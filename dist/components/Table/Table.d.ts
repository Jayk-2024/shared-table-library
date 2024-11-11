import { FC } from 'react';
interface TableProps {
    data: Array<{
        id: number;
        name: string;
        value: string;
    }>;
    onActionClick: (id: number, action: string) => void;
}
export declare const Table: FC<TableProps>;
export {};
