import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as sessionAction from '../../../store/session'
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import './DropDown.css'

const DropDown = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = (e) =>{
    e.preventDefault()
    handleClose()
    dispatch(sessionAction.logout())
    history.push('/login')
  }

  return (
   <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='dropdown__button'
      >
        <Avatar className='dropdown_user__icon'src='images/LoginLogo.png'/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='dropdownMenu'
      >
        <MenuItem className='dropdown__item'onClick={handleLogOut}>
          <ExitToAppIcon className='dropdown__icon' style={{fontSize:'2rem', fontWeight: '800'}}/>
          <p className='dropdown__text'>Logout</p>
        </MenuItem>

        <MenuItem className='dropdown__item'onClick={handleLogOut}>
          <QuestionAnswerIcon className='dropdown__icon' style={{fontSize:'2rem'}}/>
          <p className='dropdown__text'>Q/A</p>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default DropDown
