import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        values
      );
      if (response.data.success) {
        toast.success(response.data.success);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(
          response.data ? response.data.message : "Something went wrong"
        );
      }
    } catch (error) {
      toast.error("Catch Something went wrong");
    }
  };
  return (
    <div>
      <div>
        <h1>Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            LOGIN
          </Button>
          <h3>Don't Have Account?</h3>
          <Link to="/register">Create Account</Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
