"use client"

import { useState } from 'react';
// Update the antd imports
import { Card, Tabs, Table, Tag, Button, Rate, Progress, Tooltip, Input } from 'antd';

// Remove the Comment import and replace with custom implementation
import { MessageSquare, User, Shield, BarChart, Filter } from 'lucide-react';

const ReviewsDashboard = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState(''); // Add this state declaration

  // Mock data
  const reviews = [
    {
      id: 1,
      product: "Organic Cotton Pads",
      rating: 4,
      comment: "Great absorption but could be softer",
      status: "pending",
      user: "Sarah M.",
      date: "2024-03-15",
      responses: []
    },
    {
      id: 2,
      product: "Menstrual Cup Set",
      rating: 5,
      comment: "Life-changing product!",
      status: "approved",
      user: "Priya K.",
      date: "2024-03-14",
      responses: [{ text: "Thank you!", author: "Support Team", date: "2024-03-15" }]
    }
  ];

  const feedbackStats = [
    { category: "Product Quality", percentage: 65 },
    { category: "Shipping Speed", percentage: 85 },
    { category: "Customer Support", percentage: 78 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="text-pink-600" />
          Reviews & Ratings Management
        </h1>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* Reviews Management Tab */}
        <Tabs.TabPane 
          tab={
            <span className="flex items-center gap-2">
              <Filter size={16} />
              Reviews Moderation
            </span>
          } 
          key="1"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Quick Actions" className="bg-pink-50">
              <div className="space-y-4">
                <Button block icon={<BarChart />}>Generate Weekly Report</Button>
                <Button block icon={<Shield />}>Bulk Approve</Button>
              </div>
            </Card>
            
            <Card title="Review Details" className="col-span-2">
              <Table
                columns={[
                  { title: 'Product', dataIndex: 'product' },
                  { title: 'Rating', render: (_, r) => <Rate disabled value={r.rating} /> },
                  { title: 'Status', render: (_, r) => (
                    <Tag color={r.status === 'approved' ? 'green' : 'orange'}>
                      {r.status}
                    </Tag>
                  )},
                  { title: 'Actions', render: () => (
                    <Button size="small">Respond</Button>
                  )}
                ]}
                dataSource={reviews}
                rowKey="id"
                onRow={(record) => ({
                  onClick: () => setSelectedReview(record)
                })}
              />
            </Card>
          </div>
        </Tabs.TabPane>

        {/* Feedback Analysis Tab */}
        <Tabs.TabPane 
          tab={
            <span className="flex items-center gap-2">
              <BarChart size={16} />
              Feedback Analytics
            </span>
          } 
          key="2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbackStats.map(stat => (
              <Card key={stat.category} title={stat.category}>
                <Progress
                  percent={stat.percentage}
                  strokeColor="#ec4899"
                  status="active"
                />
              </Card>
            ))}
          </div>
        </Tabs.TabPane>

        {/* User Management Tab */}
        <Tabs.TabPane 
          tab={
            <span className="flex items-center gap-2">
              <User size={16} />
              User Roles
            </span>
          } 
          key="3"
        >
          <Card title="Access Controls">
            {/* Role management table */}
          </Card>
        </Tabs.TabPane>
      </Tabs>

      {/* Review Response Sidebar */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card 
            title={`Response to ${selectedReview.product}`} 
            className="w-full max-w-2xl bg-white"
          >
            <div className="space-y-4">
              {/* Replace the Comment component in JSX with: */}
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{selectedReview.user}</span>
                  <span className="text-gray-500 text-sm">{selectedReview.date}</span>
                </div>
                <p className="mt-2 text-gray-700">{selectedReview.comment}</p>
              </div>
              <Input.TextArea 
                rows={4} 
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your official response as an admin..."
                className="border-pink-200 focus:border-pink-400"
                showCount 
                maxLength={500}
              />
              <div className="flex justify-end gap-2">
                <Button>Save Draft</Button>
                <Button type="primary">Publish Response</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReviewsDashboard;