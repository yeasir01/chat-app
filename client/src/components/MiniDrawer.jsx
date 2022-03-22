import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const useStyles = ({open}) => ({
  list: {
    p:0
  },
  listItemButton: {
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5
  },
  listItemIcon: {
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
  },
  listItemText: {
    opacity: open ? 1 : 0
  },
  flexGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 1
  }
})

const MiniDrawer = () => {
  const [open, setOpen] = React.useState(false);
  
  const classes = useStyles({open});
  
  const toggleDrawer = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={classes.flexGroup}>
          <List sx={classes.list}>
            <ListItemButton sx={classes.listItemButton}>
              <ListItemIcon sx={classes.listItemIcon}>
                <ChatBubbleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Chats" sx={classes.listItemText} />
            </ListItemButton>
          </List>
          <List sx={classes.list}>
            <Divider />
            <ListItemButton sx={classes.listItemButton}>
              <ListItemIcon sx={classes.listItemIcon}>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={classes.listItemText} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default MiniDrawer;