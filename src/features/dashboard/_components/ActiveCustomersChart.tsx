import { Card, Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;

const data = [
    { month: "Feb", newCustomers: 120, returningCustomers: 80 },
    { month: "Mar", newCustomers: 95, returningCustomers: 210 },
    { month: "Apr", newCustomers: 180, returningCustomers: 150 },
    { month: "May", newCustomers: 140, returningCustomers: 320 },
    { month: "Jun", newCustomers: 480, returningCustomers: 280 },
    { month: "Jul", newCustomers: 230, returningCustomers: 280 },
    { month: "Aug", newCustomers: 380, returningCustomers: 350 },
    { month: "Sep", newCustomers: 340, returningCustomers: 240 },
    { month: "Oct", newCustomers: 480, returningCustomers: 380 },
];

export const ActiveCustomersChart = () => {
    return (
        <Card
            bordered={false}
            style={{ borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 24,
                }}
            >
                <div>
                    <Title level={5} style={{ margin: 0 }}>
                        Active Customers
                    </Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                        than last week{" "}
                        <span style={{ color: "#52c41a", fontWeight: 600 }}>+30%</span>
                    </Text>
                </div>

                {/* Legend */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 16 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#595959" }}>
                        <MinusOutlined style={{ color: "#1890ff", fontSize: 16 }} />
                        New Customers
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#595959" }}>
                        <MinusOutlined style={{ color: "#52c41a", fontSize: 16 }} />
                        Returning
                    </li>
                </ul>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1890ff" stopOpacity={0.65} />
                            <stop offset="95%" stopColor="#69c0ff" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#52c41a" stopOpacity={0.65} />
                            <stop offset="95%" stopColor="#95de64" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 13, fontWeight: 600, fill: "#8c8c8c" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fontWeight: 600, fill: "#8c8c8c" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: 8,
                            border: "none",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        }}
                    />


                    <Area
                        type="monotone"
                        dataKey="newCustomers"
                        name="New Customers"
                        stroke="#1890ff"
                        strokeWidth={3}
                        fill="url(#colorNew)"
                    />
                    <Area
                        type="monotone"
                        dataKey="returningCustomers"
                        name="Returning"
                        stroke="#52c41a"
                        strokeWidth={3}
                        fill="url(#colorReturn)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};
