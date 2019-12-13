import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { Route, withRouter } from 'react-router-dom'
import Profiles from './Profiles'
import Profile from './Profile'
import Navigation from './Navigation'
import OwnProfile from './OwnProfile'
import Inbox from './Inbox'
import SentMail from './SentMail'
import MailContent from './MailContent'
import ReplyMailForm from './ReplyMailForm'
import EditProfile from './EditProfile'
import SendMailForm from './SendMailForm'
import Favorites from './Favorites'
import EraseProfile from './EraseProfile'


const useStyles = makeStyles({
  root: {
    width: '74%',
    height: '90%',
    marginRight: '1%',
    background: theme.contentAreaBackground,
    border: '2px solid #bbb',
    overflow: 'hidden'
  },
  welcome: {
    width: '100%',
    height: '100%',
    backgroundImage: "url('/assets/images/tausta4.jpg')",
    backgroundSize: 'cover'
  }
})

const Welcome = props => {
  const classes = useStyles()

  return <div className={classes.welcome} />
}

const ContentArea = ({ location }) => {

  
  const classes = useStyles()
  
  return <Paper className={classes.root} elevation={5}>
    { location.pathname !== '/' && <Navigation /> }
    <Route exact path="/search/profiles/:username/send" component={SendMailForm} />
    <Route exact path="/search/profiles/:username" component={Profile} />
    <Route exact path="/search/profiles" render={() => <Profiles />} />
    <Route exact path="/search" component={Favorites} />
    <Route exact path="/erase" component={EraseProfile} />
    <Route exact path="/profile/inbox/:id/reply" component={ReplyMailForm} />
    <Route exact path="/profile/inbox/:id" component={MailContent} />
    <Route exact path="/profile/inbox" component={Inbox} />
    <Route exact path="/profile/sent/:id" component={MailContent} />
    <Route exact path="/profile/sent" component={SentMail} />
    <Route exact path="/profile/edit" component={EditProfile} />
    <Route exact path="/profile" component={OwnProfile} />
    <Route exact path="/settings" component={OwnProfile} />
    <Route exact path="/" component={Welcome} />
  
  </Paper>
}


export default withRouter(ContentArea)