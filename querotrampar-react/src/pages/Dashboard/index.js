import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from '../../components/Copyright'
import Menu from '../../components/Menu'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, 
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

  export default function Dashboard() {
      const classes = useStyles();

      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

      return (
          <div className={classes.root}>
              <CssBaseline />
              <Menu titulo="Dashboard" />
              <main className={classes.content}>
                  <div className={classes.appBarSpacer} />
                  <Container maxWidth="lg" className={classes.container}>
                      <Grid container spacing={3}>
                          <Grid item xs={12} md={4} lg={3}>
                              <Paper className={fixedHeightPaper}>
                              </Paper>
                          </Grid>
                          <Grid item xs={12}>
                              <Paper className={classes.paper}>

                              </Paper>
                            </Grid>
                      </Grid>
                      <Box pt={4}>
                          <Copyright />
                      </Box>
                  </Container>
              </main>
          </div>
      );
  }