import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { api } from "@/api/api";
import { CustomerForm } from "../_components/CustomerForm";
import type { Customer } from "../types";

export const CustomerActionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<Customer | undefined>(
        undefined
    );

    const isEdit = !!id;

    const fetchCustomer = useCallback(async (customerId: string) => {
        setLoading(true);
        try {
            const response = await api.get<Customer>(`/customers/${customerId}`);
            setInitialValues(response.data);
        } catch (error) {
            console.error("Failed to fetch customer:", error);
            message.error("Failed to fetch customer details");
            navigate("/customers");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (isEdit && id) {
            fetchCustomer(id);
        }
    }, [isEdit, id, fetchCustomer]);

    const handleFinish = async (values: Partial<Customer>) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.patch(`/customers/${id}`, values);
                message.success("Customer updated successfully");
            } else {
                await api.post("/customers", {
                    ...values,
                    createdAt: new Date().toISOString(),
                });
                message.success("Customer created successfully");
            }
            navigate("/customers");
        } catch (error) {
            console.error("Failed to save customer:", error);
            message.error("Failed to save customer");
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
        <CustomerForm
            title={isEdit ? "Edit Customer" : "Add Customer"}
            initialValues={initialValues}
            onFinish={handleFinish}
            loading={loading}
        />
    );
};
