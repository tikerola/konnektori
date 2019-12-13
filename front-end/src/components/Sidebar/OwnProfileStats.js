import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchInbox, fetchSent } from '../../actions/mail'
import { Paper, Badge } from '@material-ui/core'
import { theme } from '../../theme/theme'
import EmailIcon from '@material-ui/icons/Email'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import ChatIcon from '@material-ui/icons/Chat'
import { openChat } from '../../actions/chat'

const useStyles = makeStyles({
  root: {
    height: '90%',
    width: '100%',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  statsContainer: {
    width: '80%',
    height: '40%',
    
  },
  postsContainer: {
    width: '80%',
    marginTop: '3em'
  },
  link: {
    color: '#bbb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '12px',
    paddingLeft: '3em',
    color: '#bbb',
    textAlign: 'left'
  },
  icon: {
    paddingRight: '5px',
    fontSize: '1em'
  }
})

const OwnProfileStats = ({ user, fetchInbox, fetchSent, countOfUnread, openChat }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.statsContainer}>
      <Paper elevation={10} className={classes.paper}>
        <h2>Käyttäjätiedot</h2>
        <p>Tunnus: {user.username}</p>
        <p>Sukupuoli: {user.gender === 'male' ? 'mies' : 'nainen'}</p>
        <p>Ikä: {user.age}</p>
      </Paper>
    </div>
    <div className={classes.postsContainer}>
      <Paper elevation={10} className={classes.paper}>
        <p><Link to="/profile/inbox" className={classes.link} onClick={() => fetchInbox()}>
          <Badge badgeContent={countOfUnread} color="primary" variant="dot" anchorOrigin={{
            horizontal: "left",
            vertical: "top"
          }}>
            <EmailIcon className={classes.icon} />
          </Badge>
          Saapuneet</Link></p>
        <p><Link to="/profile/sent" className={classes.link} onClick={() => fetchSent()} >
          <MailOutlineIcon className={classes.icon} />
          Lähetetyt</Link></p>
        <p className={classes.link} onClick={openChat} style={{ cursor: 'pointer' }}>
          <ChatIcon className={classes.icon} />Chat
        </p>

      </Paper>
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: state.user,
  countOfUnread: state.mail.countOfUnread
})

const mapDispatchToProps = {
  fetchInbox,
  fetchSent,
  openChat
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfileStats)