import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  link: {
    minHeight: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    marginRight: '1.5rem',
    color: '#474642',
    fontWeight: 300,
    fontSize: '16px',
    letterSpacing: '0.8px',
    fontFamily: 'Open Sans',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  activeLink: {
    paddingTop: '2px',
    borderBottom: '3px solid #fff',
  },
}));
