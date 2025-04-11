import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomerType {
  monthlyIncome: number;
  monthlyExpenses: number;
}

interface ChartProps {
  customers: CustomerType[];
}

const IncomeExpenseChart: React.FC<ChartProps> = ({ customers }) => {
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const month = `Month ${i + 1}`;
    const income = customers.reduce((sum, c) => sum + c.monthlyIncome, 0);
    const expenses = customers.reduce((sum, c) => sum + c.monthlyExpenses, 0);
    return { month, income, expenses };
  });

  return (
    <Card style={{ marginTop: 16 }} title="Income vs Expenses (Last 6 Months)">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            name="Total Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ff7300"
            name="Total Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeExpenseChart;
