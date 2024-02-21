import React from 'react'
import { Button, Form, Input } from "antd";
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Register() {
    const onFinish=async(values)=>{
        try{
            const response=await axios.post('/api/user/register',values);
            if(response.data.success)
            {
               toast.success(response.data.message);
            }
            else
            {
                toast.error(response.error.message);
            }
            console.log(response.data)
        }catch(error)
        {
            //console.error("Error while Registering",error.message);
            toast.error("Something went Wrong")
        }
    };

  return (
    <div className='authentication'>
        <div className='authentication-form'>
            <div className='form'>
                <h1>Nice To Meet U</h1>
                <Form layout='verticle' onFinish={onFinish} >
                <Form.Item label="Name" name="name">
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input placeholder="Password" type="password" />
                </Form.Item>
                <Button className='primary' htmlType='submit'>REGISTER</Button>
                <Link to="/login">CLICK HERE TO LOGIN</Link>
             
                </Form>
            </div>
        </div>
    </div>
  )
}

export default Register