"use client"

import { useState } from 'react';
import { Tabs, Card, Form, Input, Button, Table, Tag, Switch, Upload } from 'antd';
import { BookOpen, HelpCircle, LayoutTemplate, Plus, Trash2, Edit } from 'lucide-react';
import Image from 'next/image';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('1');
  
  // Blog/News Management
  const [blogs, setBlogs] = useState([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  
  // FAQ Management
  const [faqs, setFaqs] = useState([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  
  // Homepage Content
  const [homepage, setHomepage] = useState({
    banner: {
      title: 'Empowering Menstrual Health Education',
      image: '',
      active: true,
      cta: 'Learn More'
    },
    featured: []
  });

  const blogColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Category', key: 'category', render: (_, record) => (
      <Tag color="pink">{record.category}</Tag>
    )},
    { title: 'Status', key: 'status', render: (_, record) => (
      <Tag color={record.status === 'published' ? 'green' : 'orange'}>{record.status}</Tag>
    )},
    { title: 'Actions', key: 'actions', render: () => (
      <div className="flex gap-2">
        <Button icon={<Edit size={16} />} type="link" />
        <Button icon={<Trash2 size={16} />} type="link" danger />
      </div>
    )}
  ];

  const faqColumns = [
    { title: 'Question', dataIndex: 'question', key: 'question' },
    { title: 'Category', key: 'category', render: (_, record) => (
      <Tag color="blue">{record.category}</Tag>
    )},
    // ... similar action column
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-50">
          <LayoutTemplate className="inline mr-2" />
          Content Management
        </h1>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* Blog/News Tab */}
        <Tabs.TabPane 
          tab={
            <span className="flex items-center gap-2">
              <BookOpen size={16} />
              Blog/News
            </span>
          } 
          key="1"
        >
          <div className="space-y-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Menstrual Health Articles</h2>
              <Button type="primary" icon={<Plus size={16} />} onClick={() => setShowBlogForm(true)}>
                New Post
              </Button>
            </div>
            
            <Table 
              columns={blogColumns} 
              dataSource={blogs}
              rowKey="id"
              pagination={false}
            />
          </div>
        </Tabs.TabPane>

        {/* FAQ Tab */}
        <Tabs.TabPane 
          tab={
            <span className="flex items-center gap-2">
              <HelpCircle size={16} />
              FAQs
            </span>
          } 
          key="2"
        >
          <div className="space-y-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Help Articles</h2>
              <Button type="primary" icon={<Plus size={16} />} onClick={() => setShowFaqForm(true)}>
                New FAQ
              </Button>
            </div>
            
            <Table 
              columns={faqColumns} 
              dataSource={faqs}
              rowKey="id"
              pagination={false}
            />
          </div>
        </Tabs.TabPane>

        {/* Homepage Tab */}
        <Tabs.TabPane 
          tab={
            <span className="flex items-center gap-2">
              <LayoutTemplate size={16} />
              Homepage
            </span>
          } 
          key="3"
        >
          <div className="space-y-6">
            <Card title="Main Banner" className="bg-pink-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Form layout="vertical">
                    <Form.Item label="Banner Title">
                      <Input value={homepage.banner.title} />
                    </Form.Item>
                    <Form.Item label="Call-to-Action">
                      <Input value={homepage.banner.cta} />
                    </Form.Item>
                    <Form.Item label="Active">
                      <Switch checked={homepage.banner.active} />
                    </Form.Item>
                  </Form>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden border-2 border-dashed border-pink-200">
                  <Upload.Dragger
                    className="h-full"
                    showUploadList={false}
                  >
                    {homepage.banner.image ? (
                      <Image 
                        src={homepage.banner.image} 
                        alt={homepage.banner.title}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-pink-600">Upload Banner Image</p>
                      </div>
                    )}
                  </Upload.Dragger>
                </div>
              </div>
            </Card>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}