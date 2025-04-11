
import React from "react";

import { Card } from "antd";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";


interface RiskDataItem {
  name: string;
  value: number;
}

interface RiskDistributionPieProps {
  data: RiskDataItem[];
}

const COLORS = ["#00C49F", "#FFBB28", "#FF4D4F"];

const RiskDistributionPie: React.FC<RiskDistributionPieProps> = ({ data }) => {
  return (
    <Card style={{ marginTop: 24 }} title="Risk Score Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RiskDistributionPie;
