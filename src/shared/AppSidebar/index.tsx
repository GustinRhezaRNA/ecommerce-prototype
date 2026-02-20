import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

export const AppSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Sider theme="light">
            <div
                style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <img
                    src="/logodnet.png"
                    alt="Logo"
                    style={{ height: 32, objectFit: "contain" }}
                />
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>Admin Panel</span>
            </div>

            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={({ key }) => {
                    navigate(key);
                }}
                items={[
                    {
                        key: "/dashboard",
                        icon: <DashboardOutlined />,
                        label: "Dashboard",
                    },
                    {
                        key: "/customers",
                        icon: <UserOutlined />,
                        label: "Customers",
                    },
                    {
                        key: "/products",
                        icon: <ShoppingCartOutlined />,
                        label: "Products",
                    },
                    {
                        key: "/transactions",
                        icon: <CreditCardOutlined />,
                        label: "Transactions",
                    },
                ]}
            />
        </Sider>
    );
};
