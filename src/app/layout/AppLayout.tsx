import { Layout, Dropdown, Avatar, Space, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/shared/AppSidebar";

const { Header, Content } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const navigate = useNavigate();
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
      <AppSidebar />

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
