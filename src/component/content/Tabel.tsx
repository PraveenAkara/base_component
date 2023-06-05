import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import API from '../api_service/api_service';
import AddState from './AddState';


interface DataType {
  key: any;
  state_name: any;
  m_state_id: any;
  id: any;

}


export interface Information {
  setToken: string;

}




const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pagecount, setPagecount] = useState<number>(10)
  const [select, setSelect] = useState<any>({
    selectedRowKeys: [],
    loading: false
  });
  const [state, setState] = useState<any>([])

  const [drawer, setDrawer] = React.useState<any>(false);


  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(open)
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawer(open);
    };

  const api = new API()

  useEffect(() => {
    api.getState(1, 10).then((res) => {

      if (res?.data.meta.error === 0) {


        setState(res.data.meta.data.data)

      }
      console.log(state)
    }).catch((e) => {
      console.log(e)
    })

  }, [])

  console.log("selectedRowKeys", select);

  const { selectedRowKeys, loading } = select;


  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelect({
        ...select,
        selectedRowKeys: selectedRowKeys
      });
    }
  };

  const AddDistrict = (id: any) => {


  }
  const EditMode = (id: any) => {

  }

  const DeleteCall = (id: any) => {

  }


  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (value: any, item: any, index: number) => (page - 1) * pagecount + index + 1,
    },
    {
      title: 'State',
      dataIndex: 'state_name',

      width: '30%',
    },
    {
      title: 'State Code',
      dataIndex: 'm_state_id',

    },

    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: any) =>
        <div style={{ display: "flex", columnGap: "10px" }}>
          <Tooltip title="Edit" placement="top-start">
            <Button onClick={() => EditMode(id)} ><EditIcon /></Button>
          </Tooltip>

          <Popconfirm title="Sure to delete?" okText="Yes" onConfirm={() => DeleteCall(id)}  >
            <Tooltip title="Delete" placement="top-start">
              <Button ><DeleteIcon /></Button>
            </Tooltip>
          </Popconfirm>

        </div>

    },

    {
      title: 'Add District',
      dataIndex: 'id',
      render: (id: React.Key) =>

        <div style={{ display: "flex", columnGap: "10px" }}>
          <Tooltip title="Add District" placement="top-start">
            <Button onClick={() => AddDistrict(id)} >   ADD DISTRICT   </Button>
          </Tooltip>
        </div>

    },
  ];


  const data: DataType[] = [];
  console.log(state)
  state.map((e: any) => {
    return (
      data.push({
        key: e.m_state_id,
        state_name: e.state_name,
        m_state_id: e.m_state_id,
        id: e,

      })
    )
  })

  function onChange(pagination: any, current: any) {
    console.log(pagination)
    setPagecount(pagination.pageSize)
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'end', padding: "10px" }}>

        <Button style={{ display: "flex", columnGap: "5px" }} onClick={toggleDrawer(true)}>
          <ControlPointIcon />Add State</Button>
      </div>



      <div>
        <Drawer
          PaperProps={{
            sx: { width: "25%" },
          }}
          anchor={"right"}
          open={drawer}
          onClose={toggleDrawer(false)}
        >
          <Box style={{padding:'10px'}}>
            <h3>Add District</h3>
         <div>
         <AddState />
         </div>
             
           
          </Box>
        </Drawer>
      </div>

      <Table columns={columns} dataSource={data} scroll={{ y: 450 }} onChange={onChange} 
        pagination={{
          onChange(current) {
            setPage(current);
          },
          pageSizeOptions: ['10', '30', '100'],
          showSizeChanger: true,

        }
        }
        rowSelection={rowSelection}
       
 
      />
    </Card>
  )




}
export default App;