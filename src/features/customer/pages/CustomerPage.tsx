import Table from "@/shared/Table";
import { message, Button } from "antd";
import type { TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import type { Customer } from "@/features/customer/types";
import { useNavigate } from "react-router-dom";

export const CustomerPage = () => {
    const navigate = useNavigate();
    const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to page 1 on search change
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all data for client-side filtering
            const response = await api.get<{ data: Customer[] } | Customer[]>("/customers?_per_page=1000");

            if (Array.isArray(response.data)) {
                setAllCustomers(response.data);
            } else if (response.data && Array.isArray(response.data.data)) {
                setAllCustomers(response.data.data);
            } else {
                setAllCustomers([]);
            }

        } catch (error) {
            console.error("Failed to fetch customers:", error);
            message.error("Failed to fetch customers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Client-side filtering and pagination
    const filteredCustomers = allCustomers.filter(customer =>
        customer.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.phone.includes(debouncedSearch)
    );

    const paginatedCustomers = filteredCustomers.slice((page - 1) * pageSize, page * pageSize);
    const total = filteredCustomers.length;

    const handleUpdate = () => message.success("Update clicked");
    const handleDelete = () => message.success("Delete clicked");

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPage(pagination.current ?? 1);
        setPageSize(pagination.pageSize ?? 10);
    };

    return (
        <div>
            <Table
                title="Customers"
                rowKey="id"
                columns={[
                    { title: "Name", dataIndex: "name", key: "name" },
                    { title: "Phone", dataIndex: "phone", key: "phone" },
                    {
                        title: "Balance",
                        dataIndex: "balance",
                        key: "balance",
                        render: (val: number) => `Rp ${val.toLocaleString("id-ID")}`
                    },
                    {
                        title: "Joined At",
                        dataIndex: "createdAt",
                        key: "createdAt",
                        render: (val: string) => new Date(val).toLocaleDateString("id-ID")
                    },
                ]}
                batchActionMenus={[
                    { key: "update", label: "Update", onClick: handleUpdate },
                    { key: "delete", label: "Delete", onClick: handleDelete },
                ]}
                filterComponents={[
                    {
                        name: "search",
                        label: "Search",
                        render: () => (
                            <div style={{ display: "flex", gap: 16 }}>
                                <input
                                    placeholder="Search customer..."
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
                                <Button type="primary" onClick={() => navigate("/customers/create")}>
                                    Add Customer
                                </Button>
                            </div>
                        ),
                    },
                ]}
                actions={[
                    {
                        title: "View",
                        type: "view",
                        onClick: (record) => navigate(`/customers/${record.id}`),
                    },
                    {
                        title: "Edit",
                        type: "edit",
                        onClick: (record) => navigate(`/customers/${record.id}/edit`),
                    },
                    {
                        title: "Delete",
                        type: "delete",
                        onClick: () => message.success(`Customer deleted successfully`),
                    },
                ]}
                source={{
                    data: paginatedCustomers,
                    meta: { page, pageSize, total },
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

