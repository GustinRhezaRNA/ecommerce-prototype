import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Spin, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { api } from "@/api/api";
import type { Customer } from "../types";

export const CustomerDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCustomer(id);
        }
    }, [id]);

    const fetchCustomer = async (customerId: string) => {
        setLoading(true);
        try {
            const response = await api.get<Customer>(`/customers/${customerId}`);
            setCustomer(response.data);
        } catch (error) {
            console.error("Failed to fetch customer details:", error);
            message.error("Failed to fetch customer details");
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

    if (!customer) {
        return (
            <Card>
                <div style={{ textAlign: "center" }}>Customer not found</div>
                <Button onClick={() => navigate(-1)} style={{ marginTop: 16 }}>
                    Go Back
                </Button>
            </Card>
        );
    }

    return (
        <Card
            title="Customer Details"
            extra={
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/customers")}>
                    Back
                </Button>
            }
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
                <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
                <Descriptions.Item label="Balance">
                    Rp {customer.balance.toLocaleString("id-ID")}
                </Descriptions.Item>
                <Descriptions.Item label="Joined At">
                    {new Date(customer.createdAt).toLocaleDateString("id-ID", {
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
