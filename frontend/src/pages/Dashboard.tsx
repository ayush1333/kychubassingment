
import { useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Progress, Select, Table, Tag, message } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterDropdownProps } from "antd/es/table/interface";
import axios from "axios";
import DashboardCards from "../components/DashboardCards";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import RiskDistributionPie from "../components/RiskDistributionPie";
import CustomerTable from "../components/CustomerTable";
const { Option } = Select;


const COLORS = ["#00C49F", "#FFBB28", "#FF4D4F"];



interface Customer {
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
type DataIndex = keyof Customer;

function getLiveSearchColumnProps(
  dataIndex: DataIndex,
  setSearchText: (value: string) => void
): ColumnType<Customer> {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            setSearchText(value); 
            confirm({ closeDropdown: false }); 
          }}
          style={{ marginBottom: 8, display: "block" }}
          autoFocus
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (!visible) {
        setSearchText(""); 
      }
    },
  };
}

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const COLORS = ["#00C49F", "#FFBB28", "#FF4D4F"];
  const alerted = useRef<Set<string>>(new Set());
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Customer[]>(
        "http://localhost:5000/api/customers"
      );
      setCustomers(response.data);
      console.log("runnung useEffect");
      
      response.data.forEach((customer) => {
        const score = computeRiskScore(customer);
        if (score > 70 && !alerted.current.has(customer.customerId)) {
          sendAlert(customer, score);
          alerted.current.add(customer.customerId);
        }
      });
    };

    fetchData();
  }, []);

  const handleStatusChange = async (customerId: string, newStatus: string) => {
    console.log(customerId);
    console.log(newStatus);
    try {
      await axios.put(
        `http://localhost:5000/api/updateCustomerStatus/${customerId}/status`,
        {
          status: newStatus,
        }
      );
    
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.customerId === customerId
            ? { ...customer, status: newStatus }
            : customer
        )
      );
      message.success("Status updated");
      
      console.log("status updated");
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const getRiskCategory = (score: number) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
  };

  const sendAlert = async (customer: Customer, score: number) => {
    try {
      await axios.post("http://localhost:5000/alerts", {
        customerId: customer.customerId,
        name: customer.name,
        riskScore: score,
      });
      console.log(`Alert sent for ${customer.name}`);
    } catch (err) {
      console.error("Failed to send alert", err);
    }
  };

 
  const computeRiskScore = (customer: Customer): number => {
    const maxCreditScore = 850;

   
    const creditRisk = (1 - customer.creditScore / maxCreditScore) * 100;

    
    const missedPayments = customer.loanRepaymentHistory.filter(
      (p) => p === 0
    ).length;
    const repaymentRisk =
      (missedPayments / customer.loanRepaymentHistory.length) * 100;

   
    const income = customer.monthlyIncome || 1; 
    const loanRatio = customer.outstandingLoans / (income * 12);
    const debtRisk = Math.min(loanRatio * 100, 100); 

   
    const score = Math.round(
      0.4 * creditRisk + 0.3 * repaymentRisk + 0.3 * debtRisk
    );

    return score;
  };
  

  const riskBuckets = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  customers.forEach((c) => {
    const score = computeRiskScore(c);
    const category = getRiskCategory(score);
    riskBuckets[category]++;
  });

  const riskData = Object.entries(riskBuckets).map(([name, value]) => ({
    name,
    value,
  }));

  const totalIncome = customers.reduce((sum, c) => sum + c.monthlyIncome, 0);
  const totalExpenses = customers.reduce(
    (sum, c) => sum + c.monthlyExpenses,
    0
  );
  const avgCreditScore = customers.length
    ? Math.round(
        customers.reduce((sum, c) => sum + c.creditScore, 0) / customers.length
      )
    : 0;

  const chartData = Array.from({ length: 6 }, (_, i) => {
    const month = `Month ${i + 1}`;
    const income = customers.reduce((sum, c) => sum + c.monthlyIncome, 0);
    const expenses = customers.reduce((sum, c) => sum + c.monthlyExpenses, 0);
    return { month, income, expenses };
  });

  const getStatusTagColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      case "Review":
      default:
        return "gold";
    }
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      width: 150,
      ...getLiveSearchColumnProps("name", setSearchText),
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      key: "creditScore",
      width: 120,
      sorter: (a: Customer, b: Customer) => a.creditScore - b.creditScore,
    },
    {
      title: "Monthly Income",
      dataIndex: "monthlyIncome",
      key: "monthlyIncome",
      width: 150,
      sorter: (a: Customer, b: Customer) => a.monthlyIncome - b.monthlyIncome,
    },
    {
      title: "Monthly Expenses",
      dataIndex: "monthlyExpenses",
      key: "monthlyExpenses",
      width: 150,
      sorter: (a: Customer, b: Customer) =>
        a.monthlyExpenses - b.monthlyExpenses,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,

      sorter: (a: Customer, b: Customer) => {
        const order: Record<string, number> = {
          Review: 1,
          Approved: 2,
          Rejected: 3,
        };
        return order[a.status] - order[b.status];
      },
      render: (status: string, record: Customer) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Select
            size="small"
            value={status}
            onChange={(newStatus) =>
              handleStatusChange(record.customerId, newStatus)
            }
            style={{ width: 120 }}
          >
            <Option value="Review" style={{ backgroundColor: "#FFF8DC" }}>
              Review
            </Option>
            <Option value="Approved" style={{ backgroundColor: "#DFFFE0" }}>
              Approved
            </Option>
            <Option value="Rejected" style={{ backgroundColor: "#FFD6D6" }}>
              Rejected
            </Option>
          </Select>
        </div>
      ),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      sorter: (a: Customer, b: Customer) =>
        computeRiskScore(a) - computeRiskScore(b),
      render: (_: any, record: Customer) => {
        const score = computeRiskScore(record);
        let color = "green";
        if (score >= 70) color = "red";
        else if (score >= 40) color = "orange";

        return (
          <div>
            <Progress percent={score} size="small" strokeColor={color} />
            <Tag color={color}>{score}</Tag>
          </div>
        );
      },
    },
  ];

 
  return (
    <div style={{ padding: 16 }}>
      {/* Top Statistics Row */}

      <DashboardCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        avgCreditScore={avgCreditScore}
      />

      {/* Chart + Table Section */}
      <Card style={{ marginTop: 24 }} title="Customer Financial Data">
        {/* Line Chart */}
        <IncomeExpenseChart customers={customers} />

        {/* Pie Chart */}
       
        <RiskDistributionPie data={riskData} />
        {/* Customer Table */}
        <div style={{ overflowX: "auto", width: "100%" }}>
          {/* <Table
           */}
          <CustomerTable customers={customers} columns={columns} />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
