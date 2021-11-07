import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Linkedin from '../img/linkedin.png'
import './header.css'
import HeaderOption from './headeroption';
import { SupervisorAccount, Home } from '@material-ui/icons';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import WorkIcon from '@mui/icons-material/Work';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'


const Header = ({ user }) => {

    console.log(user)

    return (
        <div className='header'>

            <div className='header__left'>
                <img src={Linkedin} alt='' />

                <div className='header__search'>
                    <SearchIcon />
                    <input type='text' />
                </div>

            </div>

            <div className='header__right'>
                    <HeaderOption Icon={Home} title='Home' />
                    <HeaderOption Icon={SupervisorAccount} title='My Network' />
                    <HeaderOption Icon={ChatBubbleIcon} title='Chat' />
                    <HeaderOption Icon={WorkIcon} title='Job' />
                    <HeaderOption Icon={NotificationAddIcon} title='Notifications' />
                    <HeaderOption avatar={user ? user.photoURL : null} title='Me' alt={user ? user.displayName : null} />
            </div>
        </div>


    )
}
export default Header