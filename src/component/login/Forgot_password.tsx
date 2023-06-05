import React,{FC} from 'react'
import { Form, Input, Button } from 'antd'
import { Container,Box } from "@mui/material";
import {ArrowLeftOutlined } from '@ant-design/icons'

type Props={
    stage: React.Dispatch<React.SetStateAction<any>>;
};
const Forgot_password:FC<Props>=({stage})=>{
   
    return(
        <>
        <h2>Forget Password</h2>
          <div style={{width:"100%"  }}>
                <Form layout='vertical' >

                    <Form.Item label="User Name" name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please Enter The User Name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item >

                    <Form.Item label="Password" name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please Enter The Password",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" block htmlType='submit' >
                        submit
                    </Button>
                </Form>
                <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 0 0 0 ",columnGap: "30px"}}>
                    
                    <Button type="link" onClick={()=>stage(0)} ><ArrowLeftOutlined/>Go to Login</Button>
                </div>
            </div>
        </>
    )
}

export default Forgot_password