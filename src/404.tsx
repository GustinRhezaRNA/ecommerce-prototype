import React from "react";
import { Button, Result, Card } from "antd";
import { useNavigate } from "react-router-dom";

const AppNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f2f5, #e6f4ff)",
        padding: 24,
      }}
    >
      <Card
        style={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
        bordered={false}
      >
        <Result
          status="404"
          title={
            <span style={{ fontSize: 48, fontWeight: 700 }}>
              404
            </span>
          }
          subTitle="Oops... The page you're looking for doesn't exist."
          extra={
            <Button
              type="primary"
              size="large"
              style={{
                borderRadius: 8,
                paddingInline: 32,
              }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          }
        />
      </Card>
    </div>
  );
};

export default AppNotFound;
