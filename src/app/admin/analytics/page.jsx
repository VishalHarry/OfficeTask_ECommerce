"use client";

import { useState } from 'react';
import { Tabs, DatePicker, Button, Select, Card, Table } from 'antd';
import { FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const salesData = [
    { date: '2024-03-01', product: 'Sanitary Pads', category: 'hygiene', sales: 2345, orders: 45 },
    { date: '2024-03-08', product: 'Shampoo', category: 'care', sales: 4567, orders: 67 },
    { date: '2024-03-15', product: 'Face Wash', category: 'care', sales: 3456, orders: 52 },
  ];

  const customerData = [
    { age: '18-25', value: 35, fill: '#8884d8' },
    { age: '26-35', value: 45, fill: '#82ca9d' },
    { age: '36-45', value: 20, fill: '#ffc658' },
  ];

  const inventoryData = [
    { item: 'Sanitary Pads', stock: 500, sold: 200 },
    { item: 'Shampoo', stock: 300, sold: 150 },
    { item: 'Face Wash', stock: 400, sold: 220 },
  ];

  const conversionData = [
    { date: '2024-03-01', visitors: 1000, conversions: 300 },
    { date: '2024-03-08', visitors: 1200, conversions: 450 },
    { date: '2024-03-15', visitors: 950, conversions: 400 },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 16);
    autoTable(doc, {
      head: [['Date', 'Product', 'Category', 'Sales', 'Orders']],
      body: salesData.map(item => [item.date, item.product, item.category, item.sales, item.orders]),
    });
    doc.save('sales_report.pdf');
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Product', 'Category', 'Sales', 'Orders'],
      ...salesData.map(item => [item.date, item.product, item.category, item.sales, item.orders]),
    ].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sales_report.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-2 items-center">
          <RangePicker onChange={setDateRange} />
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={setCategoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'hygiene', label: 'Feminine Hygiene' },
              { value: 'care', label: 'Personal Care' },
            ]}
          />
          <Button icon={<FilterOutlined />}>Apply Filters</Button>
        </div>
        <div className="flex gap-2">
          <Button icon={<DownloadOutlined />} onClick={exportToCSV}>Export CSV</Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={exportToPDF}>Export PDF</Button>
        </div>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Sales Analytics" key="1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Sales by Product">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Sales Over Time">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="Customer Analytics" key="2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Demographics">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={customerData} dataKey="value" nameKey="age" outerRadius={100}>
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Repeat Buyers">
              <div className="text-4xl font-bold text-primary">68%</div>
              <span className="text-gray-500">customers are returning</span>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="Inventory Reports" key="3">
          <Card title="Inventory Turnover">
            <Table
              dataSource={inventoryData}
              columns={[
                { title: 'Item', dataIndex: 'item', key: 'item' },
                { title: 'Stock', dataIndex: 'stock', key: 'stock' },
                { title: 'Sold', dataIndex: 'sold', key: 'sold' },
              ]}
              pagination={false}
              rowKey="item"
            />
          </Card>
        </TabPane>

        <TabPane tab="Traffic & Conversion" key="4">
          <Card title="Visitor to Conversion Ratio">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
                <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;