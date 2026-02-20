import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { api } from "@/api/api";
import { TransactionForm } from "../_components/TransactionForm";
import type { Transaction } from "../types";

export const TransactionActionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<Transaction | undefined>(
        undefined
    );

    const isEdit = !!id;

    const fetchTransaction = useCallback(async (transactionId: string) => {
        setLoading(true);
        try {
            const response = await api.get<Transaction>(`/transactions/${transactionId}`);
            setInitialValues(response.data);
        } catch (error) {
            console.error("Failed to fetch transaction:", error);
            message.error("Failed to fetch transaction details");
            navigate("/transactions");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (isEdit && id) {
            fetchTransaction(id);
        }
    }, [isEdit, id, fetchTransaction]);

    const handleFinish = async (values: Partial<Transaction>) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.patch(`/transactions/${id}`, values);
                message.success("Transaction updated successfully");
            } else {
                await api.post("/transactions", {
                    ...values,
                    createdAt: new Date().toISOString(),
                });
                message.success("Transaction created successfully");
            }
            navigate("/transactions");
        } catch (error) {
            console.error("Failed to save transaction:", error);
            message.error("Failed to save transaction");
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
        <TransactionForm
            title={isEdit ? "Edit Transaction" : "Add Transaction"}
            initialValues={initialValues}
            onFinish={handleFinish}
            loading={loading}
        />
    );
};
