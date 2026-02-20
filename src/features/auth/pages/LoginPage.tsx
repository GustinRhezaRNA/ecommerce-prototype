import { Form, Input, Button,  Typography, message, Row, Col, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/api/api";

const { Title } = Typography;

interface LoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const screens = Grid.useBreakpoint();

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
        <Row style={styles.container}>
            <Col xs={24} md={14} style={{ ...styles.left, height: screens.md ? "100%" : "50vh" }}>
            </Col>
            <Col xs={24} md={10} style={{ ...styles.right, height: screens.md ? "100%" : "50vh", marginTop: screens.md ? "1rem" : "0" }}>
                <div style={{ width: "100%", maxWidth: "420px" }}>
                    <Title level={3} style={{ textAlign: "center", marginBottom: "" }}>
                        Welcome Back, Admin!    
                    </Title>
                    <Title level={5} style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "normal", color: "#545c62ff" }}>
                        Please enter your email and password to login
                    </Title>

                    <Form layout="vertical" onFinish={onFinish} size="large">
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
                </div>
            </Col>
        </Row>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        margin: 0,
        overflow: "hidden", // Prevent scrollbars
    },
    left: {
        background: "url('/login.webp') no-repeat center center",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
    },
    right: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: "#ffffff",
        padding: "40px",
    },
};
