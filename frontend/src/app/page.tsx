'use client'

import React from 'react';
import { Card, Typography, Button, Row, Col } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl shadow-lg">
        <Title level={2}>🏥 Welcome to Hospital Admin Dashboard</Title>
        <Paragraph>
          Manage patient records, appointments, and staff efficiently using this platform.
        </Paragraph>

        <Row gutter={[16, 16]} className="mt-8">
          <Col xs={24} md={12}>
            <Card hoverable variant="filled">
              <Title level={4}>Patients</Title>
              <Paragraph>View and manage all patient records.</Paragraph>
              <Link href="/patients">
                <Button type="primary" block>Go to Patients</Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} md={12}>
           <Card hoverable variant="filled">
              <Title level={4}>Login / Register</Title>
              <Paragraph>Access your account or create a new one.</Paragraph>
              <Link href="/login">
                <Button type="default" block>Go to Login</Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
