import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { Route } from 'react-router-dom'
import ReplyMailNavigation from './ReplyMailNavigation'
import EditNavigationContent from './EditNavigationContent'
import SendMailNavigation from './SendMailNavigation'


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '10%',
    backgroundColor: theme.smallNavigationBackground,
    
    background: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0 %, rgba(0, 0, 0, 1) 35 %, rgba(0, 212, 255, 1) 100 %)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#999',
    boxShadow: '-1px 5px 18px 0px rgba(255,255,255,0.7)'
  }
})

const Navigation = props => {

  const classes = useStyles()

  return <div className={classes.root}>
    <Route exact path="/profile/inbox/:id" component={ReplyMailNavigation} />
    <Route exact path="/profile/edit" component={EditNavigationContent} />
    <Route exact path="/profile" component={EditNavigationContent} />
    <Route exact path="/settings" component={EditNavigationContent} />
    <Route path="/search/profiles/:username" component={SendMailNavigation} />
  </div>
}

export default Navigation