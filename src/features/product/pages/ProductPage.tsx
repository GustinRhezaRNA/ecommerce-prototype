import Table from "@/shared/Table";
import { message, Button, Typography } from "antd";
import type { TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";

export const ProductsPage = () => {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState<Product[]>([]);
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

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get<{ data: Product[] } | Product[]>("/packages?_per_page=1000");

            if (Array.isArray(response.data)) {
                setAllProducts(response.data);
            } else if (response.data && Array.isArray(response.data.data)) {
                setAllProducts(response.data.data);
            } else {
                setAllProducts([]);
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
    }, []);

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
    const total = filteredProducts.length;

    const handleUpdate = () => message.success("Update clicked");
    const handleDelete = () => message.success("Delete clicked");

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPage(pagination.current ?? 1);
        setPageSize(pagination.pageSize ?? 10);
    };

    return (
        <div>
            <Typography.Title level={5}>Products</Typography.Title>
            <Table
                rowKey="id"
                columns={[
                    { title: "Name", dataIndex: "name", key: "name" },
                    { title: "Price", dataIndex: "price", key: "price", render: (v) => `Rp ${(v as number).toLocaleString()}` },
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
                            <div style={{ display: "flex", gap: 16 }}>
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
                                <Button type="primary" onClick={() => navigate("/products/create")}>
                                    Add Product
                                </Button>
                            </div>
                        ),
                    },
                ]}
                actions={[
                    {
                        title: "View",
                        type: "view",
                        onClick: (record) => navigate(`/products/${record.id}`),
                    },
                    {
                        title: "Edit",
                        type: "edit",
                        onClick: (record) => navigate(`/products/${record.id}/edit`),
                    },
                    {
                        title: "Delete",
                        type: "delete",
                        onClick: () => message.success(`Product deleted successfully`),
                    },
                ]}
                source={{
                    data: paginatedProducts,
                    meta: { page, pageSize, total },
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};


