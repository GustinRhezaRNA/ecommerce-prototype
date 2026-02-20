import { Button, Form, InputNumber, Card, Space, Select } from "antd";
import { useEffect } from "react";
import type { Transaction } from "../types";

interface TransactionFormProps {
    initialValues?: Transaction;
    onFinish: (values: Partial<Transaction>) => void;
    loading?: boolean;
    title: string;
}

export const TransactionForm = ({
    initialValues,
    onFinish,
    loading,
    title,
}: TransactionFormProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    return (
        <Card title={title}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item
                    name="customerId"
                    label="Customer ID"
                    rules={[{ required: true, message: "Please enter customer ID" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Enter customer ID"
                    />
                </Form.Item>

                <Form.Item
                    name="packageId"
                    label="package ID"
                    rules={[{ required: true, message: "Please enter package ID" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Enter package ID"
                    />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }
                        parser={(value) =>
                            value?.replace(/Rp\s?|(\.*)/g, "") as unknown as number
                        }
                        placeholder="Enter price"
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Please select status" }]}
                >
                    <Select placeholder="Select status">
                        <Select.Option value="SUCCESS">SUCCESS</Select.Option>
                        <Select.Option value="PENDING">PENDING</Select.Option>
                        <Select.Option value="FAILED">FAILED</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Save
                        </Button>
                        <Button htmlType="button" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
};
