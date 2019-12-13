import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createChatSession, openChat } from '../../actions/chat'
import { addToFavorites, blockUser } from '../../actions/user'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import BlockIcon from '@material-ui/icons/Block'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#999'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  active: {
    color: 'white'
  },
  icon: {
    paddingRight: '5px',
    fontSize: '1em'
  }
})

const SendMailNavigation = props => {

  const classes = useStyles()

  if (props.blockedBy)
    return null


  return (
    <div className={classes.root}>
      <p><NavLink
        to={`/search/profiles/${props.match.params.username}/send`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}

      >
        <MailOutlineIcon className={classes.icon} />
        Lähetä viesti
        </NavLink></p>

      <p className={classes.navLink} onClick={() => {
        if (!props.profile.chatEnabled || !props.profile.online) return

        if (!props.session)
          props.createChatSession(props.match.params.username, true)

        else
          props.openChat()
      }}>
        <ChatIcon className={classes.icon} style={{ color: props.profile.chatEnabled && props.profile.online ? 'green' : ''}} /> Chat
      </p>

      <p  >
        {props.isFavorite
          ?
          <span className={classes.navLink} onClick={() => props.addToFavorites(props.match.params.username, 'remove')}>
            <StarIcon className={classes.icon} style={{ color: 'yellow'}} />
            Suosikeissa
          </span>
          :
          <span className={classes.navLink} onClick={() => props.addToFavorites(props.match.params.username, 'add')}>
            <StarBorderIcon className={classes.icon} />
            Lisää suosikkeihin
          </span>
        }
      </p>

      <p>
        {props.blocked
          ?
          <span className={classes.navLink} onClick={() => props.blockUser(props.match.params.username, false)}>
            <BlockIcon className={classes.icon} style={{ color: 'red' }} />
            Blokattu
          </span>
          :
          <span className={classes.navLink} onClick={() => props.blockUser(props.match.params.username, true)}>
            <BlockIcon className={classes.icon} />
            Blokkaa
          </span>
        }
      </p>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  blocked: state.user.blocked.includes(ownProps.match.params.username),
  blockedBy: state.user.blockedBy.includes(ownProps.match.params.username),
  session: state.chat.sessions[ownProps.match.params.username],
  isFavorite: state.user.favorites.find(profile => profile.username === ownProps.match.params.username),
  profile: state.profiles.find(profile => profile.username === ownProps.match.params.username)
})

export default connect(mapStateToProps, { createChatSession, openChat, addToFavorites, blockUser })(SendMailNavigation)