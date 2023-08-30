import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import api from '../helper';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch({ type: 'SHOW_LOADING' });

      const response = await api.post('/api/users/login', values);
      dispatch({ type: 'HIDE_LOADING' });
      message.success('User logged in successfully');
      localStorage.setItem('auth', JSON.stringify(response.data));

      navigate('/');
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error('Something Went Wrong');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="app-title">POS APP</h1>
        <h3 className="page-title">Demo Login Credentials</h3>
        <p className="credential-info">
          <strong>userId:</strong> admin_006
          <br />
          <strong>Password:</strong> admin_006
        </p>
        <h3 className="page-title">Login Page</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="userId" label="User ID">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <div className="form-footer">
            <p>
              Not a user? <Link to="/register">Register Here</Link>
            </p>
            <Button className="login-button" type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
