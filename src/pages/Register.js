import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import api from '../helper';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const res = await api.post('/api/users/register', values);
      console.log('Response:', res);
      message.success('Registered Successfully');
      navigate('/login');
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error('Something Went Wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="app-title">POS APP</h1>
        <h3 className="page-title">Register Page</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="userId" label="User ID">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <div className="form-footer">
            <p>
              Already registered? <Link to="/login">Login Here</Link>
            </p>
            <Button
              className="register-button"
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
