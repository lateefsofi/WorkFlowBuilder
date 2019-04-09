import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    {
        icon: 'InboxIcon',
        link: '/',
        displayText: 'Login'
    },
    {
        icon: 'InboxIcon',
        link: '/registration',
        displayText: 'Signup'
    },
    {
        icon: 'InboxIcon',
        link: '/bot-builder',
        displayText: 'Bot Builder'
    }
]

const navList = ( navItems.map((item, index)=>(
        <li key={index}>
            <NavLink to={item.link} activeClassName="active" exact={true}>{item.displayText}</NavLink>
        </li>
    ))
);

export  { navList };