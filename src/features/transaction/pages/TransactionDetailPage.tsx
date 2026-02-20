import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Spin, message, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { api } from "@/api/api";
import type { Transaction } from "../types";

export const TransactionDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchTransaction(id);
        }
    }, [id]);

    const fetchTransaction = async (transactionId: string) => {
        setLoading(true);
        try {
            const response = await api.get<Transaction>(`/transactions/${transactionId}`);
            setTransaction(response.data);
        } catch (error) {
            console.error("Failed to fetch transaction details:", error);
            message.error("Failed to fetch transaction details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!transaction) {
        return (
            <Card>
                <div style={{ textAlign: "center" }}>Transaction not found</div>
                <Button onClick={() => navigate(-1)} style={{ marginTop: 16 }}>
                    Go Back
                </Button>
            </Card>
        );
    }

    return (
        <Card
            title="Transaction Details"
            extra={
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/transactions")}>
                    Back
                </Button>
            }
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Transaction ID">{transaction.id}</Descriptions.Item>
                <Descriptions.Item label="Customer ID">{transaction.customerId}</Descriptions.Item>
                <Descriptions.Item label="Package ID">{transaction.packageId}</Descriptions.Item>
                <Descriptions.Item label="Price">
                    Rp {transaction.price.toLocaleString("id-ID")}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={transaction.status === "SUCCESS" ? "green" : transaction.status === "PENDING" ? "orange" : "red"}>
                        {transaction.status}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                    {new Date(transaction.createdAt).toLocaleString("id-ID", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
