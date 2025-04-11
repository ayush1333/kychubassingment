import React from "react";

import {
  DollarOutlined
} from "@ant-design/icons";
import { Card, Col, Row, Select, Statistic } from "antd";
const { Option } = Select;
interface DashboardCardsProps {
  totalIncome: number;
  totalExpenses: number;
  avgCreditScore: number;
}


const DashboardCards: React.FC<DashboardCardsProps> = ({
  totalIncome,
  totalExpenses,
  avgCreditScore,
}) => (

  <>
  <Row gutter={[16, 16]}>
     <Col xs={24} md={8}>
       <Card>
         <Statistic
           title="Total Monthly Income"
           value={totalIncome}
           prefix={<DollarOutlined />}
         />
       </Card>
     </Col>
     <Col xs={24} md={8}>
       <Card>
         <Statistic
           title="Total Monthly Expenses"
           value={totalExpenses}
           prefix={<DollarOutlined />}
         />
       </Card>
     </Col>
     <Col xs={24} md={8}>
       <Card>
         <Statistic
           title="Average Credit Score"
           value={avgCreditScore}
           suffix="/ 850"
         />
       </Card>
     </Col>
   </Row>
 </>
);

export default DashboardCards;