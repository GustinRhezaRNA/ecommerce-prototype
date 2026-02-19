import Table from "@/shared/Table";
import { message } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import type { Product } from "../types";

export const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
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

            const response = await api.get<any>("/packages", { params });
            console.log("API Response:", response);

            if (Array.isArray(response.data)) {
                setProducts(response.data);
                // Try legacy header total if array
                const totalCount = response.headers["x-total-count"];
                if (totalCount) {
                    setTotal(parseInt(totalCount, 10));
                }
            } else if (response.data && Array.isArray(response.data.data)) {
                // json-server v1 structure
                setProducts(response.data.data);
                if (response.data.items) {
                    setTotal(response.data.items);
                }
            } else {
                console.error("Invalid data format received:", response.data);
                setProducts([]);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            message.error("Failed to fetch products");
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
                { title: "Price", dataIndex: "price", key: "price", render: (v) => `Rp ${v.toLocaleString()}` },
                { title: "Quota", dataIndex: "quota", key: "quota" },
                { title: "Validity (Days)", dataIndex: "validityDays", key: "validityDays" },
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
                            placeholder="Search product..."
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
                data: products,
                meta: { page, pageSize, total },
            }}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};


