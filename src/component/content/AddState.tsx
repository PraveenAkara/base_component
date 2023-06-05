import React, { FC } from 'react'

import { Form, Button, Input } from 'antd'

type Anchor = 'right';




const AddState: FC = () => {



  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (

<div style={{width:'100%'}}>

    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='vertical'
    >
      <Form.Item
        label="State Name"
        name="state_name"
        rules={[{ required: true, message: 'State Name!' }]}
      >
        <Input placeholder='State Name'/>
      </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
     
    </Form>
    </div>
  );




  return (
    <>
      <div>
        hai

      </div>
    </>
  )
}
export default AddState