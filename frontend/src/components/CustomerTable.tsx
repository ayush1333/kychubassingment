import React from "react";
import { Table } from "antd";

export interface CustomerType {
    customerId: string;
    name: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    creditScore: number;
    outstandingLoans: number;
    loanRepaymentHistory: number[];
    accountBalance: number;
    status: string;
}

interface CustomerTableProps {
  customers: CustomerType[];
  columns: any[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, columns }) => {
  return (
    <Table
    dataSource={customers}
    columns={columns}
    rowKey="customerId"
    pagination={{ pageSize: 5 }}
    scroll={{ x: 800 }} 
  />
  );
};

export default CustomerTable;
