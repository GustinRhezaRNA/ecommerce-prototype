import Table from "../componets/Table";
import { message, Tag } from "antd";
import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import type { Transaction } from "../types";

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: any = {
                _page: page,
                _per_page: pageSize,
            };

            // Search by ID or other fields if supported. For now assuming ID or maybe no search support yet
            // but keeping the structure ready. JSON-server support 'id' usually.
            if (debouncedSearch) {
                params.id = debouncedSearch;
            }

            const response = await api.get<any>("/transactions", { params });

            if (Array.isArray(response.data)) {
                setTransactions(response.data);
                const totalCount = response.headers["x-total-count"];
                if (totalCount) {
                    setTotal(parseInt(totalCount, 10));
                }
            } else if (response.data && Array.isArray(response.data.data)) {
                setTransactions(response.data.data);
                if (response.data.items) {
                    setTotal(response.data.items);
                }
            } else {
                setTransactions([]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, debouncedSearch]);

    const handleUpdate = () => message.success("Update clicked");
    const handleDelete = () => message.success("Delete clicked");

    const handleTableChange = (pagination: any) => {
        setPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return (
        <Table
            rowKey="id"
            columns={[
                { title: "Transaction ID", dataIndex: "id", key: "id" },
                { title: "Customer ID", dataIndex: "customerId", key: "customerId" },
                {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                    render: (val: number) => `Rp ${val.toLocaleString("id-ID")}`
                },
                {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status: string) => (
                        <Tag color={status === "SUCCESS" ? "green" : "red"}>
                            {status}
                        </Tag>
                    )
                },
                {
                    title: "Date",
                    dataIndex: "createdAt",
                    key: "createdAt",
                    render: (val: string) => new Date(val).toLocaleString("id-ID")
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
                    onClick: (record) => console.log("View", record),
                },
                {
                    title: "Delete",
                    type: "delete",
                    onClick: (record) => console.log("Delete", record),
                },
            ]}
            source={{
                data: transactions,
                meta: { page, pageSize, total },
            }}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Transactions;
