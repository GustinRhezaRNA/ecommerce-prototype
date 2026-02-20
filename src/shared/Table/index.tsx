import {
  Table as AntTable,
  Button,
  Space,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { TableProps } from "./types";
import { useState } from "react";

const Table = <T extends object>({
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
        render: (_: unknown, record: T) => (
          <Space>
            {actions.map((action) => {
              if (action.type === "delete") {
                return (
                  <Popconfirm
                    key={action.title}
                    title="Are you sure?"
                    onConfirm={() => { action.onClick?.(record); }}
                    okButtonProps={{ loading: false }}
                  >
                    <Button danger type="text" icon={<DeleteOutlined />} size="small" />
                  </Popconfirm>
                );
              }

              return (
                <Button
                  key={action.title}
                  size="small"
                  icon={
                    action.type === "edit" ? (
                      <EditOutlined />
                    ) : action.type === "view" ? (
                      <EyeOutlined />
                    ) : undefined
                  }
                  type="text"
                  style={{
                    color:
                      action.type === "edit"
                        ? "blue"
                        : action.type === "view"
                          ? "green"
                          : undefined,
                  }}
                  onClick={() => action.onClick?.(record)}
                  href={action.href}
                />
              );
            })}
          </Space>
        ),
      },
    ]
    : [];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
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
        </div>

        <div>
          <Space>
            {filterComponents &&
              filterComponents.map((filter) => (
                <div key={filter.name}>
                  {filter.render ? filter.render() : filter.label}
                </div>
              ))}
          </Space>
        </div>
      </div>

      <AntTable
        rowKey={rowKey}
        columns={[...columns, ...actionColumn]}
        dataSource={source.data}
        rowSelection={rowSelection}
        bordered={false}
        pagination={{
          current: source.meta.page,
          pageSize: source.meta.pageSize,
          total: source.meta.total,
          showSizeChanger: true,
        }}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};

export default Table;
