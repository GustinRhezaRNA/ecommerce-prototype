import { Card, Typography } from "antd";
import type { ReactNode } from "react";

const { Text, Title } = Typography;

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: string;
}

export const StatsCard = ({
    title,
    value,
    icon,
    color,
}: StatsCardProps) => {
    return (
        <Card
            bordered={false}
            style={{
                borderRadius: 16,
                background: color,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
            styles={{
                body: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                },
            }}
        >
            <div>
                <Text style={{ color: "#fff", opacity: 0.85 }}>
                    {title}
                </Text>
                <Title level={3} style={{ margin: 0, color: "#fff" }}>
                    {value}
                </Title>
            </div>

            <div
                style={{
                    fontSize: 32,
                    color: "#fff",
                    opacity: 0.9,
                }}
            >
                {icon}
            </div>
        </Card>
    );
};
