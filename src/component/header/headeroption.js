import { Avatar } from '@material-ui/core'
import React from 'react'
import './header.css'


const HeaderOption = ({ Icon, title, avatar , alt }) => {


    return (
        <div className='headeroption'>
            {Icon && <Icon className='headeroption__icon' />}
            {avatar && <Avatar className='headeroption__icon' src={avatar} alt={alt} />}
            <h3 className='headeroption__title'>{title}</h3>
        </div>
    )
}

export default HeaderOption
