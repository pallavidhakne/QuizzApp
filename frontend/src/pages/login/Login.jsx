import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div>
        <div>
            <h1>Welcome Back</h1>
            <Form layout="vertical">
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input placeholder="Password" type="password"/>
                </Form.Item>
                <Button>LOGIN</Button>
            </Form>
        </div>
    </div>
  )
}

export default Login