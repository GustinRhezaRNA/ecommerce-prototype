import { Layout, Menu, Dropdown, Avatar, Space, Typography } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DownOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ email: string; password: string } | null>(
    null
  );

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/");
    } else {
      setUser(JSON.parse(userStr));
    }
  }, [navigate]);

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
        <div style={{ padding: 20, fontWeight: 600 }}>Admin Panel</div>

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
            padding: "0 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {user && (
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <Text strong>{user.email}</Text>
                <DownOutlined />
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
