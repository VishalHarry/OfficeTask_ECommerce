"use client"

import { useState } from 'react'
import { Table, Input, Button, Space, Modal, Tabs, Tag } from 'antd'
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MailOutlined, ShoppingCartOutlined, CommentOutlined } from '@ant-design/icons'
const { TabPane } = Tabs

const CustomerManagement = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [data, setData] = useState([
    {
      key: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      totalOrders: 5,
      status: 'active',
      lastOrder: '2024-03-15',
      orderHistory: [
        { 
          key: '1-1',
          orderId: 'EDU-1234', 
          date: '2024-03-15', 
          amount: 599.00, 
          status: 'Delivered',
          items: ['Sanitary Pad Pack x3']
        }
      ],
      communications: [
        { date: '2024-03-10', type: 'email', content: 'Order confirmation' },
        { date: '2024-03-12', type: 'sms', content: 'Delivery update' }
      ],
      feedback: [
        { product: 'Sanitary Pad', rating: 4, comment: 'Good quality', status: 'approved' }
      ]
    },
    // Add more mock data...
  ])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => (
        <div>
          <div>{record.email}</div>
          <div className="text-xs text-gray-500">{record.phone}</div>
        </div>
      )
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
      sorter: (a, b) => a.orders - b.orders,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => showCustomerDetails(record)} />
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => handleDelete(record.key)} />
        </Space>
      )
    }
  ]

  const showCustomerDetails = (customer) => {
    setSelectedCustomer(customer)
    setIsModalVisible(true)
  }

  const handleEdit = (customer) => {
    // Implement edit functionality
  }

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key))
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <Input
          placeholder="Search customers..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
        <Space>
          <Button type="primary" icon={<MailOutlined />}>
            Send Bulk Email
          </Button>
          <Button icon={<ShoppingCartOutlined />}>
            Export Orders
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.email.toLowerCase().includes(searchText.toLowerCase())
        )}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Customer Profile"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedCustomer && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <p>Name: {selectedCustomer.name}</p>
                  <p>Email: {selectedCustomer.email}</p>
                  <p>Phone: {selectedCustomer.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Statistics</h3>
                  <p>Total Orders: {selectedCustomer.orders}</p>
                  <p>Last Order: {selectedCustomer.lastOrder}</p>
                </div>
              </div>
            </TabPane>
            
            <TabPane tab="Order History" key="2">
              <Table
                columns={[
                  { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
                  { title: 'Date', dataIndex: 'date', key: 'date' },
                  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
                  { title: 'Status', dataIndex: 'status', key: 'status' }
                ]}
                dataSource={selectedCustomer.orderHistory}
                pagination={false}
              />
            </TabPane>

            <TabPane tab="Communications" key="3">
              {selectedCustomer.communications.map((comm, index) => (
                <div key={index} className="p-3 mb-2 bg-gray-50 rounded">
                  <div className="flex justify-between">
                    <Tag color={comm.type === 'email' ? 'blue' : 'green'}>
                      {comm.type.toUpperCase()}
                    </Tag>
                    <span className="text-sm text-gray-500">{comm.date}</span>
                  </div>
                  <p className="mt-2">{comm.content}</p>
                </div>
              ))}
            </TabPane>

            <TabPane tab="Feedback" key="4">
              {selectedCustomer.feedback.map((fb, index) => (
                <div key={index} className="p-3 mb-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{fb.product}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">{'★'.repeat(fb.rating)}</span>
                        <Tag color={fb.status === 'approved' ? 'green' : 'orange'}>
                          {fb.status}
                        </Tag>
                      </div>
                    </div>
                    <Space>
                      <Button size="small">Approve</Button>
                      <Button danger size="small">Delete</Button>
                    </Space>
                  </div>
                  <p className="mt-2 text-gray-600">{fb.comment}</p>
                </div>
              ))}
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  )
}

export default CustomerManagement