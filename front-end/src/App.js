import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Navigation from './components/Navigation/Navigation'

import { theme } from './theme/theme'
import { BrowserRouter, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Notification from './components/NotificationSnackbar/Notification';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#440627',
    margin: 0,
    padding: 0,
    color: theme.signupHeaderColor,
    fontFamily: 'Forum, cursive, "Times New Roman", Times, serif',
    fontSize: '1.1vw'
  },
  container: {
    width: '95%',
    height: '90%',
    background: theme.background,
    margin: 0,
    padding: 0
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start'
  }
})


function App(props) {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={8}>
        <BrowserRouter>
          <Navigation />
          <Route path="/" render={(props) => <MainPage {...props} />} />
        </BrowserRouter>
        <Notification />
      </Paper>
    </div>
  );
}


export default App;
