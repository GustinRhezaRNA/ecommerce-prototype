import Table from "../componets/Table";
import { message } from "antd";
import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import type { Customer } from "../types";

const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
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

            if (debouncedSearch) {
                params.name_like = debouncedSearch;
            }

            const response = await api.get<any>("/customers", { params });

            if (Array.isArray(response.data)) {
                setCustomers(response.data);
                const totalCount = response.headers["x-total-count"];
                if (totalCount) {
                    setTotal(parseInt(totalCount, 10));
                }
            } else if (response.data && Array.isArray(response.data.data)) {
                // json-server v1 structure support
                setCustomers(response.data.data);
                if (response.data.items) {
                    setTotal(response.data.items);
                }
            } else {
                setCustomers([]);
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
                    title: "Edit",
                    type: "edit",
                    onClick: (record) => console.log("Edit", record),
                },
                {
                    title: "Delete",
                    type: "delete",
                    onClick: (record) => console.log("Delete", record),
                },
            ]}
            source={{
                data: customers,
                meta: { page, pageSize, total },
            }}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Customers;
