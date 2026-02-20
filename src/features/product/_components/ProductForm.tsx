import { Button, Form, Input, InputNumber, Card, Space } from "antd";
import { useEffect } from "react";
import type { Product } from "../types";

interface ProductFormProps {
    initialValues?: Product;
    onFinish: (values: Partial<Product>) => void;
    loading?: boolean;
    title: string;
}

export const ProductForm = ({
    initialValues,
    onFinish,
    loading,
    title,
}: ProductFormProps) => {
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
                    rules={[{ required: true, message: "Please enter product name" }]}
                >
                    <Input placeholder="Enter product name" />
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
                    name="quota"
                    label="Quota"
                    rules={[{ required: true, message: "Please enter quota (e.g., 10GB)" }]}
                >
                    <Input placeholder="Enter quota" />
                </Form.Item>

                <Form.Item
                    name="validityDays"
                    label="Validity (Days)"
                    rules={[{ required: true, message: "Please enter validity days" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Enter validity days"
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    name="providerId"
                    label="Provider ID"
                    rules={[{ required: true, message: "Please enter provider ID" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Enter provider ID"
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
