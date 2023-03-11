import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  link: {
    // minHeight: 'inherit',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    textDecoration: 'none',
    marginRight: '1rem',
    // color: '#474642',
    color: '#333',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '0.9px',
    // fontFamily: 'Open Sans',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  activeLink: {
    // paddingTop: '2px',
    color : theme.palette.primary.main,
    // borderBottom: '3px solid red',
  },
}));
