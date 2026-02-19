import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/api/api";

const { Title, Text } = Typography;

interface LoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: LoginForm) => {
        try {
            setLoading(true);

            const res = await api.get("/users", {
                params: { email: values.email },
            });

            if (res.data.length === 0) {
                message.error("User not found");
                return;
            }

            const user = res.data[0];

            if (user.password !== values.password) {
                message.error("Invalid password");
                return;
            }

            message.success("Login successful!");
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");

            // eslint-disable-next-line 
        } catch (error) {
            message.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={styles.container}>
            {/* LEFT SIDE */}
            <div style={styles.left}>
                <Title style={{ color: "white" }}>
                    Internet Package Admin
                </Title>
                <Text style={{ color: "white" }}>
                    Manage customers and transactions efficiently.
                </Text>
            </div>

            {/* RIGHT SIDE */}
            <div style={styles.right}>
                <Card style={styles.card}>
                    <Title level={3} style={{ textAlign: "center" }}>
                        Login
                    </Title>

                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input placeholder="admin@mail.com" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password placeholder="123456" />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        height: "100vh",
    },
    left: {
        flex: 1,
        background: "linear-gradient(135deg, #1677ff, #69b1ff)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
    },
    right: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
    },
    card: {
        width: 350,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        borderRadius: 12,
    },
};
