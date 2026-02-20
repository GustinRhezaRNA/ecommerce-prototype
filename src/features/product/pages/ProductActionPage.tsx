import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { api } from "@/api/api";
import { ProductForm } from "../_components/ProductForm";
import type { Product } from "../types";

export const ProductActionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<Product | undefined>(
        undefined
    );

    const isEdit = !!id;

    const fetchProduct = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const response = await api.get<Product>(`/packages/${productId}`);
            setInitialValues(response.data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
            message.error("Failed to fetch product details");
            navigate("/products");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (isEdit && id) {
            fetchProduct(id);
        }
    }, [isEdit, id, fetchProduct]);

    const handleFinish = async (values: Partial<Product>) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.patch(`/packages/${id}`, values);
                message.success("Product updated successfully");
            } else {
                await api.post("/packages", values);
                message.success("Product created successfully");
            }
            navigate("/products");
        } catch (error) {
            console.error("Failed to save product:", error);
            message.error("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    if (isEdit && loading && !initialValues) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <ProductForm
            title={isEdit ? "Edit Product" : "Add Product"}
            initialValues={initialValues}
            onFinish={handleFinish}
            loading={loading}
        />
    );
};
