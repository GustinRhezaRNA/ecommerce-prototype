import { Button, Form, Input, InputNumber, Card, Space } from "antd";
import { useEffect } from "react";
import type { Customer } from "../types";

interface CustomerFormProps {
    initialValues?: Customer;
    onFinish: (values: Partial<Customer>) => void;
    loading?: boolean;
    title: string;
}

export const CustomerForm = ({
    initialValues,
    onFinish,
    loading,
    title,
}: CustomerFormProps) => {
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
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter customer name" }]}
                >
                    <Input placeholder="Enter customer name" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ required: true, message: "Please enter phone number" }]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                    name="balance"
                    label="Balance"
                    rules={[{ required: true, message: "Please enter balance" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }
                        parser={(value) =>
                            value?.replace(/Rp\s?|(\.*)/g, "") as unknown as number
                        }
                        placeholder="Enter balance"
                    />
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
