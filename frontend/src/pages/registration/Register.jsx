import React from 'react'
import { Button, Form, Input } from "antd";
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
function Register() {
  return (
    <div>
        <div>
            <div className='form'>
                <h1>Nice To Meet U</h1>
                <Form>
                <Form.Item label="Name" name="name">
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input placeholder="Password" type="password" />
                </Form.Item>
                <Button>REGISTER</Button>
               {/* // <Link to="/login">CLICK HERE TO LOGIN</Link> */}
               {/* <Link to="/login"></Link> */}
                </Form>
            </div>
        </div>
    </div>
  )
}

export default Register