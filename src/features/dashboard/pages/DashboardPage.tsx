import { Row, Col, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { StatsCard } from "../_components/StatsCard";
import { ActiveCustomersChart } from "../_components/ActiveCustomersChart";
import {
    UserOutlined,
    ShoppingCartOutlined,
    WalletOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface Customer {
    id: number;
}
    
interface Transaction {
    id: number;
    price: number;
}

export function DashboardPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerRes = await api.get("/customers");
                const transactionRes = await api.get("/transactions");

                setCustomers(customerRes.data);
                setTransactions(transactionRes.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalRevenue = transactions.reduce(
        (acc, curr) => acc + curr.price,
        0
    );

    return (
        <div
            style={{
                background: "#f5f7fb",
                padding: 24,
                minHeight: "100%",
            }}
        >
            <Title level={3} style={{ marginBottom: 24 }}>
                Dashboard Overview
            </Title>

            {loading ? (
                <Spin size="large" />
            ) : (
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={8}>
                        <StatsCard
                            title="Total Customers"
                            value={customers.length}
                            icon={<UserOutlined />}
                            color="linear-gradient(135deg, #1890ff, #69c0ff)"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                        <StatsCard
                            title="Total Transactions"
                            value={transactions.length}
                            icon={<ShoppingCartOutlined />}
                            color="linear-gradient(135deg, #52c41a, #95de64)"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                        <StatsCard
                            title="Total Revenue"
                            value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
                            icon={<WalletOutlined />}
                            color="linear-gradient(135deg, #fa8c16, #ffc069)"
                        />
                    </Col>
                </Row>
            )}

            <div style={{ marginTop: 24 }}>
                <ActiveCustomersChart />
            </div>
        </div>
    );
}
