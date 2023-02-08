'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { Button } from '@mui/material';

import Search_component from './search';



const links = [ 
  {
    label: 'Home',
    href: '/',
  },{
    label: 'Login',
    href: '/login',
  }]
export const Header_component = ()=>{
 
  return (
    <header>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  style={{ background: "#DBA800" }}>
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{color: "black"}}
          >
           NEXTLY
          </Typography >
          <ul >{links.map(({ href, label }) => (<Button  ><Link key="uniqueId1" style={{color:'black',textDecoration:'none',paddingTop:'15px'}} href={href as string}>{label}</Link></Button>))}</ul>
          <Search_component/>
        </Toolbar>
      </AppBar>
    </Box>
      </header>
  )
}