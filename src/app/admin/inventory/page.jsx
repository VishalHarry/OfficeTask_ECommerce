"use client"

import { useState } from 'react';
import { Table, Input, Button, Space, Modal, Tag, Statistic, Tabs } from 'antd';
import { SearchOutlined, EditOutlined, DatabaseOutlined, AlertOutlined, ShopOutlined, PlusOutlined } from '@ant-design/icons';

const InventoryManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdjustModalVisible, setIsAdjustModalVisible] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({ quantity: '', reason: '' });

  // Mock data
  const [inventory, setInventory] = useState([
    {
      key: '1',
      product: 'Organic Cotton Pads',
      sku: 'EDU-PAD-001',
      location: 'WH-A1-23',
      currentStock: 45,
      minStock: 50,
      supplier: 'EcoSupplies Co.',
      lastUpdated: '2024-03-20',
      adjustments: [
        { date: '2024-03-15', quantity: -15, reason: 'Defective batch', reference: 'ADJ-001' }
      ]
    },
    // Add more mock data...
  ]);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'product',
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (loc) => <Tag color="blue">{loc}</Tag>
    },
    {
      title: 'Current Stock',
      dataIndex: 'currentStock',
      key: 'stock',
      render: (_, record) => (
        <Statistic
          value={record.currentStock}
          valueStyle={{
            color: record.currentStock <= record.minStock ? '#cf1322' : '#389e0d',
            fontSize: '14px'
          }}
        />
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.currentStock === 0 ? 'red' : 
          record.currentStock <= record.minStock ? 'orange' : 'green'}>
          {record.currentStock === 0 ? 'Out of Stock' : 
          record.currentStock <= record.minStock ? 'Low Stock' : 'In Stock'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleStockAdjust(record)}>
            Adjust
          </Button>
          <Button icon={<DatabaseOutlined />} onClick={() => showHistory(record)}>
            History
          </Button>
        </Space>
      )
    }
  ];

  const handleStockAdjust = (item) => {
    setSelectedItem(item);
    setIsAdjustModalVisible(true);
  };

  const handleAdjustSubmit = () => {
    // Implement stock adjustment logic
    setIsAdjustModalVisible(false);
  };

  const InventoryStats = () => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-blue-50 rounded">
        <Statistic title="Total Items" value={inventory.length} prefix={<DatabaseOutlined />} />
      </div>
      <div className="p-4 bg-orange-50 rounded">
        <Statistic title="Low Stock Items" value={inventory.filter(i => i.currentStock <= i.minStock).length} 
                   prefix={<AlertOutlined />} />
      </div>
      <div className="p-4 bg-red-50 rounded">
        <Statistic title="Out of Stock" value={inventory.filter(i => i.currentStock === 0).length} 
                   prefix={<AlertOutlined />} />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <InventoryStats />
      
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <Input
          placeholder="Search inventory..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Add New Item
          </Button>
          <Button icon={<ShopOutlined />}>
            Supplier Portal
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={inventory.filter(item =>
          item.product.toLowerCase().includes(searchText.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchText.toLowerCase())
        )}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Stock Adjustment"
        visible={isAdjustModalVisible}
        onCancel={() => setIsAdjustModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAdjustModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAdjustSubmit}>
            Submit Adjustment
          </Button>,
        ]}
      >
        {selectedItem && (
          <div className="space-y-4">
            <Input
              addonBefore="Quantity"
              type="number"
              value={adjustmentData.quantity}
              onChange={(e) => setAdjustmentData({...adjustmentData, quantity: e.target.value})}
            />
            <Input.TextArea
              placeholder="Adjustment reason..."
              value={adjustmentData.reason}
              onChange={(e) => setAdjustmentData({...adjustmentData, reason: e.target.value})}
            />
            <Input
              addonBefore="Adjustment Type"
              defaultValue="Manual"
              disabled
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InventoryManagement;