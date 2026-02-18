import React from 'react';

export interface BatchActionMenu {
  key: string;
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export interface FilterComponent {
  type?: 'Select' | 'CheckboxDropdown' | 'Group';
  label: string;
  name: string;
  render?: () => React.ReactNode;
  filters?: any[];
  options?: { label: string; value: string }[];
  placeholder?: string;
  span?: number;
  cols?: number;
  value?: string[];
}

export interface TableSource<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface TableProps<T> {
  rowKey: string;
  columns: { title: string; dataIndex: string; key: string; render?: (value: any) => React.ReactNode }[];
  batchActionMenus?: BatchActionMenu[];
  filterComponents?: FilterComponent[];
  source: TableSource<T>;
  onChange?: (params: any) => void;
  actions?: {
    title: string;
    type?: 'view' | 'edit' | 'delete';
    href?: string;
    onClick?: (record: T) => void;
  }[];
  loading?: boolean;
}
