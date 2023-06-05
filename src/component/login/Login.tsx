import React, { FC, useState } from "react";
import User_registration from "./User_registration";
import Forgot_password from "./Forgot_password";
import { Form, Input, Button } from 'antd'
import { Container, Box } from "@mui/material";
import API from "../api_service/api_service";
import SweetAlert from '../alert/Alert'
import Lottie from "lottie-react";
import Loader from '../../Assest/38321-loading.json'

export interface Information {
    stage: number;
    Loader:any
   
}


type Props={
    setToken: React.Dispatch<React.SetStateAction<any>>;
};

const Login: FC <Props> = ({setToken}) => {

    const [stage, setStage] = useState<number>(0)
    const [loading,setLoading]=useState<boolean>(false)

    const api = new API()
    const alert = new SweetAlert()
    const onFinish = (values: any) => {
        setLoading(true)
        api.login(values).then((res) => {
            console.log(res)
            if (res?.data.meta.error === 0) {
                alert.successAlert({ message: "Login Successfully", text: "Welcome" })
                localStorage.setItem('auth', res.data.meta.access_token)
                localStorage.setItem('refresh', res.data.meta.refresh_token)
                setToken( localStorage.setItem('refresh', res.data.meta.refresh_token))
                setLoading(false)
            } else {

                alert.errorAlert({ message: "User Name or Password Wrong", text: res?.data.meta.msg })
                setLoading(false)
            }
        }).catch((e) => {
            console.log(e)
        })

    }
    return (
        <React.Fragment>

       {/* {
        loading==true ? <div className="loader"><Lottie animationData={Loader} loop={true} style={{height:"27vh",top:'247Px',position:'relative'}}/></div>: */}
      


            <div className="login_page">
          
                <Container maxWidth="xs">
                        
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "100vh",
                            justifyContent: "center"
                        }}
                    >


                        {
                            stage == 0 ?
                                <>
                                    <h2>Welcome to Login</h2>
                                    <div style={{}}>
                                        <Form layout='vertical' onFinish={onFinish} >

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
                                        <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 0 0 0 ", columnGap: "30px" }}>
                                            <Button type="link" onClick={() => setStage(2)} >Forgot password?</Button>
                                            <Button type="link" onClick={() => setStage(1)} >Don't have an account?Sign Up</Button>
                                        </div>
                                    </div>
                                </>
                                : <>{stage === 1 ? <User_registration stage={setStage} /> : <Forgot_password stage={setStage} />}
                                </>
                        }


                    </Box>
                </Container>
            </div>
              {/* }   */}
        </React.Fragment>

    )
}

export default Login