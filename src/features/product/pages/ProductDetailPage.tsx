import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Spin, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { api } from "@/api/api";
import type { Product } from "../types";

export const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId: string) => {
        setLoading(true);
        try {
            // Note: db.json has "packages" but API might be exposed as /packages
            const response = await api.get<Product>(`/packages/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
            message.error("Failed to fetch product details");
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

    if (!product) {
        return (
            <Card>
                <div style={{ textAlign: "center" }}>Product not found</div>
                <Button onClick={() => navigate(-1)} style={{ marginTop: 16 }}>
                    Go Back
                </Button>
            </Card>
        );
    }

    return (
        <Card
            title="Product Details"
            extra={
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/products")}>
                    Back
                </Button>
            }
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
                <Descriptions.Item label="Provider ID">{product.providerId}</Descriptions.Item>
                <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
                <Descriptions.Item label="Quota">{product.quota}</Descriptions.Item>
                <Descriptions.Item label="Validity">
                    {product.validityDays} Days
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                    Rp {product.price.toLocaleString("id-ID")}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
