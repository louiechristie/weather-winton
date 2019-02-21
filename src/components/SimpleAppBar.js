import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props) {
  const { title } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(SimpleAppBar);
