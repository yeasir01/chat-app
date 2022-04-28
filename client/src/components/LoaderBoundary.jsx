import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const useStyles = () => ({
  root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 1,
      height: 1,
  },
  wrapper: {
    position: "relative",
    display: "inline-flex"
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 0
  },
  icon: {
    transform: "rotate(-45deg)",
    fontSize: 30,
  }
})

const Loader = (props) => {
  
  const classes = useStyles();

  if (props.loading){
    return (
      <Box sx={classes.root}>
          <Box>
            <Box sx={classes.wrapper}>
              <CircularProgress size={80} thickness={1} disableShrink/>
              <Box sx={classes.iconWrapper}>
                  <SendOutlinedIcon color="primary" sx={classes.icon} value={100}/>
              </Box>
            </Box>
            <Typography align="center" variant="subtitle1" color="text.secondary">
              Loading...
            </Typography>
          </Box>
      </Box>
    )
  }

  return (
    <>
      {props.children}
    </>
  )
}

export default React.memo(Loader);