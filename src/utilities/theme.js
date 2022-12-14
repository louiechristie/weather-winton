import React from 'react';

const spacing = (multiple) => {
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
// export const Card = Div;

export {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Card,
  Box,
} from '@mui/material';
