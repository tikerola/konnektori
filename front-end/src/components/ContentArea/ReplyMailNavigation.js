import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import ReplyIcon from '@material-ui/icons/Reply'

const useStyles = makeStyles({
  root: {
    marginLeft: '10%'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none',
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

const ReplyMailNavigation = props => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p><NavLink
        to={`/profile/inbox/${props.match.params.id}/reply`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        <ReplyIcon className={classes.icon} />
        Vastaa
        </NavLink></p>
    </div>
  )
}

export default ReplyMailNavigation