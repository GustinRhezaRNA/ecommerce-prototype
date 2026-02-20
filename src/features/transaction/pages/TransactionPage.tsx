import Table from "@/shared/Table";
import { message, Tag, Typography } from "antd";
import type { TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import type { Transaction } from "../types";
import { useNavigate } from "react-router-dom";

export const TransactionPage = () => {
    const navigate = useNavigate();
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const getStatusColor = (status: string): string => {
        const colorMap: Record<string, string> = {
            pending: "gold",
            failed: "red",
            success: "green",
        };

        return colorMap[status?.toLowerCase()] || "default";
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get<{ data: Transaction[] } | Transaction[]>("/transactions?_per_page=1000");

            if (Array.isArray(response.data)) {
                setAllTransactions(response.data);
            } else if (response.data && Array.isArray(response.data.data)) {
                setAllTransactions(response.data.data);
            } else {
                setAllTransactions([]);
            }

        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            message.error("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredTransactions = allTransactions.filter(transaction =>
        String(transaction.id).includes(debouncedSearch) ||
        String(transaction.customerId).includes(debouncedSearch)
    );

    const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);
    const total = filteredTransactions.length;

    const handleUpdate = () => message.success("Update clicked");
    const handleDelete = () => message.success("Delete clicked");

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPage(pagination.current ?? 1);
        setPageSize(pagination.pageSize ?? 10);
    };

    return (
        <div>
            <Typography.Title level={5}>Transactions</Typography.Title>
            <Table
                rowKey="id"
                columns={[
                    { title: "Transaction ID", dataIndex: "id", key: "id" },
                    { title: "Customer ID", dataIndex: "customerId", key: "customerId" },
                    {
                        title: "Price",
                        dataIndex: "price",
                        key: "price",
                        render: (val: number) =>
                            `Rp ${val.toLocaleString("id-ID")}`,
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (status: string) => (
                            <Tag
                                color={getStatusColor(status)}
                                variant="outlined"
                                style={{
                                    fontSize: "10px",
                                    padding: "1px 4px",
                                    fontWeight: 400,
                                }}
                            >
                                {status}
                            </Tag>
                        ),
                    },
                    {
                        title: "Date",
                        dataIndex: "createdAt",
                        key: "createdAt",
                        render: (val: string) =>
                            new Date(val).toLocaleString("id-ID"),
                    },
                ]}
                batchActionMenus={[
                    { key: "update", label: "Update", onClick: handleUpdate },
                    { key: "delete", label: "Delete", onClick: handleDelete },
                ]}
                filterComponents={[
                    {
                        name: "search",
                        label: "Search ID",
                        render: () => (
                            <input
                                placeholder="Search ID..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: 6,
                                    border: "1px solid #d9d9d9",
                                }}
                            />
                        ),
                    },
                ]}
                actions={[
                    {
                        title: "View",
                        type: "view",
                        onClick: (record) =>
                            navigate(`/transactions/${record.id}`),
                    },
                    {
                        title: "Delete",
                        type: "delete",
                        onClick: () => message.success(`Transaction deleted successfully`),
                    },
                ]}
                source={{
                    data: paginatedTransactions,
                    meta: { page, pageSize, total },
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};