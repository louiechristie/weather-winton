import React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

const spacing = (multiple: number) => {
  return `${multiple * 8}px`;
};

export const theme = {
  spacing,
};

/*
 * Performance optimisation
 * For not using so much material ui
 */
const Div = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props}>{props.children ?? null}</div>
);
// const Span = (props: React.ComponentPropsWithoutRef<'span'>) => (
//   <div>
//     <span {...props}>{props.children ?? null}</span>
//   </div>
// );

export const Paper = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div>
    <div {...props}>{props.children ?? null}</div>
  </div>
);
export const Box = Div;

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

export { Typography, AppBar, Toolbar, IconButton };
