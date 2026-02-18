import {
  Table as AntTable,
  Button,
  Space,
  Card,
  Row,
  Col,
  Popconfirm,
} from "antd";
import type { TableProps } from "./types";
import { useState } from "react";

const Table = <T extends any>({
  rowKey,
  columns,
  actions,
  batchActionMenus,
  filterComponents,
  source,
  onChange,
  loading,
}: TableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  // Inject action column
  const actionColumn = actions
    ? [
      {
        title: "Action",
        key: "action",
        render: (_: any, record: T) => (
          <Space>
            {actions.map((action) => {
              if (action.type === "delete") {
                return (
                  <Popconfirm
                    key={action.title}
                    title="Are you sure?"
                    onConfirm={() => action.onClick?.(record)}
                  >
                    <Button danger size="small">
                      {action.title}
                    </Button>
                  </Popconfirm>
                );
              }

              return (
                <Button
                  key={action.title}
                  size="small"
                  type={
                    action.type === "edit"
                      ? "primary"
                      : action.type === "view"
                        ? "default"
                        : undefined
                  }
                  onClick={() => action.onClick?.(record)}
                  href={action.href}
                >
                  {action.title}
                </Button>
              );
            })}
          </Space>
        ),
      },
    ]
    : [];

  return (
    <Card variant="outlined" style={{ borderRadius: 12 }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          {batchActionMenus && selectedRowKeys.length > 0 && (
            <Space>
              {batchActionMenus.map((action) => (
                <Button
                  key={action.key}
                  danger={action.key === "delete"}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          )}
        </Col>

        <Col>
          <Space>
            {filterComponents &&
              filterComponents.map((filter) => (
                <div key={filter.name}>
                  {filter.render ? filter.render() : filter.label}
                </div>
              ))}
          </Space>
        </Col>
      </Row>

      <AntTable
        rowKey={rowKey}
        columns={[...columns, ...actionColumn]}
        dataSource={source.data}
        rowSelection={rowSelection}
        bordered
        pagination={{
          current: source.meta.page,
          pageSize: source.meta.pageSize,
          total: source.meta.total,
          showSizeChanger: true,
        }}
        onChange={onChange}
        loading={loading}
      />
    </Card>
  );
};

export default Table;
