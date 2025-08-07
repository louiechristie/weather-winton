import React from 'react';

const spacing = (multiple: number) => {
  return `${multiple * 8}px`;
};

export const theme = {
  spacing,
};

/*
 * Potential performance optimisation
 * For not using so much material ui
 */
// const Div = (props) => <div {...props}>{props.children ?? null}</div>;
// const Span = (props) => (
//   <div>
//     <span {...props}>{props.children ?? null}</span>
//   </div>
// );

// export const Paper = (props) => (
//   <div>
//     <div {...props}>{props.children ?? null}</div>
//   </div>
// );
// export const Box = Div;

const styles = {
  card: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    minWidth: 300,
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden',
    textAlign: 'center',
  },
} as const;

export const Card = (props: React.ComponentProps<'div'>) => (
  <div {...props} style={styles.card}>
    {props.children ?? null}
  </div>
);

export {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Box,
} from '@mui/material';
