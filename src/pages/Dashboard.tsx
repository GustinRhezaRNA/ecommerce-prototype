import { Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import type { Customer, Transaction } from "../types";

const { Title } = Typography;

export default function Dashboard() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const customerRes = await api.get<Customer[]>("/customers");
            const transactionRes = await api.get<Transaction[]>("/transactions");

            setCustomers(customerRes.data);
            setTransactions(transactionRes.data);
        };

        fetchData();
    }, []);

    const totalRevenue = transactions.reduce(
        (acc, curr) => acc + curr.price,
        0
    );

    return (
        <>
            <Title level={3}>Dashboard Overview</Title>

            {/* STATS CARDS */}
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Title level={4}>Total Customers</Title>
                        <p>{customers.length}</p>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card>
                        <Title level={4}>Total Transactions</Title>
                        <p>{transactions.length}</p>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card>
                        <Title level={4}>Total Revenue</Title>
                        <p>
                            Rp {totalRevenue.toLocaleString("id-ID")}
                        </p>
                    </Card>
                </Col>
            </Row>

            {/* RECENT TRANSACTIONS */}
            {/* Table removed as per requirements */}
        </>
    );
}
