import { Layout, Menu, Dropdown, Avatar, Space, Typography } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState<{ email: string; password: string } | null>(
    () => {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div style={{ padding: "20px 40px", fontWeight: 600, fontSize: "1rem" }}>Admin Panel</div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            if (key !== "logout") {
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
              icon: <CreditCardOutlined />,
              label: "Transactions",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 40px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >

          {user && (
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <Text strong>
                  {user.email.split('@')[0][0].toUpperCase() + user.email.split('@')[0].slice(1)}
                </Text>

              </Space>
            </Dropdown>
          )}
        </Header>

        <Content style={{ margin: 20 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
