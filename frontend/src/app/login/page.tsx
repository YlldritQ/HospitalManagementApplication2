'use client'

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth.hook';
import { Card, Tabs, Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const { TabPane } = Tabs;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleLogin = async (values: { userName: string; password: string }) => {
    setIsLoading(true);
    try {
      await login(values.userName, values.password);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (values: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    gender: string;
    password: string;
    address: string;
  }) => {
    setIsLoading(true);
    try {
      await register(
        values.firstName,
        values.lastName,
        values.userName,
        values.email,
        values.gender,
        values.password,
        values.address
      );
      toast.success('Registration successful! Please login.');
      loginForm.setFieldsValue({ userName: values.userName });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <Tabs defaultActiveKey="login" centered>
          <TabPane tab="Login" key="login">
            <Form
              form={loginForm}
              name="login"
              onFinish={handleLogin}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  size="large"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form
              form={registerForm}
              name="register"
              onFinish={handleRegister}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="First Name"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Last Name"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: 'Please select your gender!' }]}
              >
                <Select
                  placeholder="Select Gender"
                  size="large"
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input.TextArea
                  placeholder="Address"
                  size="large"
                  rows={3}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  size="large"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginPage; 