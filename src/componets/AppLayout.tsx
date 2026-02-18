import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const { Header, Sider, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div style={{ padding: 20, fontWeight: 600 }}>
          Admin Panel
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogout();
            } else {
              navigate(key);
            }
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
              icon: <ShoppingCartOutlined />,
              label: "Transactions",
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 20 }}>
          Welcome, Admin
        </Header>

        <Content style={{ margin: 20 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
