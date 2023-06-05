import React,{FC} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {Link,useNavigate } from 'react-router-dom';
import Alert from '../alert/Alert'
import EditIcon from '@mui/icons-material/Edit';

type Props={
    setToken: React.Dispatch<React.SetStateAction<any>>;
};

const Header:FC<Props>=({setToken})=>{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);


    const open = Boolean(anchorEl);
    const navigate=useNavigate()
    const alert=new Alert()
    const open1 = Boolean(anchorE2);

const Logout=()=>{
    localStorage.removeItem('auth')
    navigate('/')
    setToken("")
    alert.successAlert({ message: "LogOut Successfully", text: "Welcome Back" })
}

    function stringToColor(string: string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name: string) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      



      const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorE2(event.currentTarget);
      };


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorE2(null);
  
  };

  const handleClose = () => {
    setAnchorEl(null);
  
  };



    return(
<>

<div className='header'>
        <h2>Mater Data Collection</h2>

<div style={{display:"flex",alignItems:'center',justifyContent:'end',width:"73%",columnGap:"28px" }}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       Master
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
            <Link to='State_Master'>
            State Master
            </Link>
            </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to='District_Master'>
            District Master
            </Link>
            
            </MenuItem>

            <MenuItem onClick={handleClose}>
            <Link to='/'>
       Home
            </Link>
            
            </MenuItem>
      
      </Menu>

     
     
    
<Button
        id="demo-positioned-button1"
        aria-controls={open1 ? 'demo-positioned-menu1' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick1}
      >
       <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar('Kent Dodds')} />
     
    </Stack>
      </Button>
      <Menu
        id="demo-positioned-menu1"
        aria-labelledby="demo-positioned-button1"
        anchorEl={anchorE2}
        open={open1}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      > 
         <MenuItem onClick={handleClose}>Profile</MenuItem>
       <MenuItem onClick={Logout}>Log Out</MenuItem>
      
      </Menu>
       
      
     
   
     
    </div>

    <div>
   
    </div>

    </div>
</>
    )
}

export default Header



