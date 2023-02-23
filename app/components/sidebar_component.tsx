import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut,useSession } from 'next-auth/react';
import Link from 'next/link';
import { LinkOffSharp } from '@material-ui/icons';
import HomeIcon from '@mui/icons-material/Home';
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from 'recoil';
import {playlistIdState} from "../../atoms/playlistAtom"
import { MainBody } from './mainBody';
const drawerWidth = 240;




export default function SidebarComponent(props: any) {
  const spotifyApi = useSpotify()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [playlist, setPlaylist] = React.useState([])
  const {data:session,status} = useSession()
  const [plylistId,setPlaylistId] = useRecoilState(playlistIdState)




  React.useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data:any) => {
        setPlaylist(data.body.items)
      })
    }
  }, [session,spotifyApi])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton  onClick={() => signOut()}><Link  style={{color:'black',textDecoration:'none',paddingTop:'15px'}}  href='/'/>
              <ListItemIcon style={{color:'white'}}>
                {index % 2 === 0 ? <InboxIcon /> : <SearchIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider variant="middle"  style={{borderColor: 'white', borderStyle:'dotted'}} />
      <List style={{padding:0}}>
        {playlist.map((playlist) => (
          <ListItem key={playlist['id']}> 
            <ListItemButton onClick={()=>setPlaylistId(playlist['id'])}>
              {playlist['name']}
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText  />
            </ListItemButton> 
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:'yellow'
          
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{color: 'black'}}>
            Nextly
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth  ,backgroundColor:'black',color:'white',height:'87%' , },
          
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth , height:'87%' ,backgroundColor:'black',color:'white' },
          
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <MainBody/>
      </Box>
    </Box>
  );
}