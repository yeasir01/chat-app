import * as React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

const AnimatedAlert = ({ message, severity="error" }) => {

    const open = message ? true : false;

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Collapse in={open} timeout={500}>
              <Alert severity={severity}>
                  {message}
              </Alert>
          </Collapse>
        </Box>
    );
};

export default AnimatedAlert;
