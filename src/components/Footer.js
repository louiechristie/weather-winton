import React from 'react';
import dayjs from 'dayjs';
import { theme, Paper, Typography } from '../utilities/theme';

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderTopStyle: 'solid',
    borderTopRadius: 20,
    backgroundColor: '#F8F8F8',
    marginBottom: '0',
  },
};

const Footer = (props) => {
  const { meta } = props;
  return (
    <Paper style={styles.footer} elevation={24} square>
      <Typography variant="body2" component="p" align="center">
        Last updated: {meta.timeStamp} | Weather Winton ©️ {dayjs().year()} v
        {meta.version} | Tags: user experience, UX
      </Typography>

      <Typography variant="body2" component="p" paragraph align="center">
        Data from: Met Office | Contains public sector information licensed
        under the Open Government Licence
      </Typography>

      <Typography
        variant="body2"
        component="p"
        color="inherit"
        paragraph
        align="center"
      >
        Made by: <a href={meta.author.url}> {meta.author.name}</a>
      </Typography>
    </Paper>
  );
};

export default Footer;
