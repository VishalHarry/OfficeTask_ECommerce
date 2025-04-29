"use client"

import { useState } from 'react';
import { Card, Form, Input, DatePicker, Button, Table, Tag, Switch, Tabs } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, FireOutlined, TagOutlined } from '@ant-design/icons';
import { LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import TabPane from 'antd/es/tabs/TabPane';

const PromotionsDashboard = () => {
  const [form] = Form.useForm();
  const [promotions, setPromotions] = useState([]);
  const [flashSaleActive, setFlashSaleActive] = useState(false);
  
  // Mock data
  const couponData = [
    { code: 'SPRING20', used: 45, total: 100, discount: '20%', status: 'active' },
    { code: 'SUMMER15', used: 23, total: 150, discount: '15%', status: 'expired' },
  ];

  const chartData = [
    { name: 'Used', value: 68 },
    { name: 'Remaining', value: 32 },
  ];

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Used', key: 'used', render: (_, record) => `${record.used}/${record.total}` },
    { title: 'Status', key: 'status', render: (_, record) => (
      <Tag color={record.status === 'active' ? 'green' : 'red'}>{record.status}</Tag>
    )},
    { title: 'Actions', key: 'actions', render: () => (
      <div className="flex gap-2">
        <Button icon={<EditOutlined />} type="link" />
        <Button icon={<DeleteOutlined />} type="link" danger />
      </div>
    )}
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text">
          Promotions Manager
        </h2>
        <Button type="primary" icon={<PlusOutlined />}>Create New</Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-pink-100 bg-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-pink-600">Active Coupons</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <TagOutlined className="text-2xl text-pink-600" />
          </div>
        </Card>
        <Card className="border-pink-100 bg-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-pink-600">Total Discounts</div>
              <div className="text-2xl font-bold">$2,450</div>
            </div>
            <FireOutlined className="text-2xl text-pink-600" />
          </div>
        </Card>
        <Card className="border-pink-100 bg-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-pink-600">Flash Sale</div>
              <Switch checked={flashSaleActive} onChange={setFlashSaleActive} />
            </div>
            <FireOutlined className="text-2xl text-pink-600" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Coupon Management" key="1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Create New Coupon">
              <Form form={form} layout="vertical">
                <Form.Item label="Coupon Code" name="code">
                  <Input placeholder="SPRING20" />
                </Form.Item>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item label="Discount Value" name="discount">
                    <Input placeholder="20% or $15" />
                  </Form.Item>
                  <Form.Item label="Usage Limit" name="limit">
                    <Input type="number" placeholder="100" />
                  </Form.Item>
                </div>
                <Form.Item label="Validity Period" name="date">
                  <DatePicker.RangePicker className="w-full" />
                </Form.Item>
                <Button type="primary" htmlType="submit">Create Coupon</Button>
              </Form>
            </Card>
            
            <Card title="Coupon Performance">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" fill="#ec4899" />
                    <Tooltip/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          <Card title="Active Coupons" className="mt-6">
            <Table dataSource={couponData} columns={columns} pagination={false} />
          </Card>
        </TabPane>

        <TabPane tab="Flash Sales" key="2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Schedule Flash Sale">
              <Form layout="vertical">
                <Form.Item label="Sale Title">
                  <Input placeholder="Summer Blowout Sale" />
                </Form.Item>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item label="Start Time">
                    <DatePicker showTime className="w-full" />
                  </Form.Item>
                  <Form.Item label="End Time">
                    <DatePicker showTime className="w-full" />
                  </Form.Item>
                </div>
                <Button type="primary">Schedule Sale</Button>
              </Form>
            </Card>
            
            <Card title="Sale Performance">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={couponData}>
                    <Line type="monotone" dataKey="used" stroke="#ec4899" />
                    <XAxis dataKey="code" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PromotionsDashboard;