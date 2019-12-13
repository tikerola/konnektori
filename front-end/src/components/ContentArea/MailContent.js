import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  root: {
    color: '#bbb',
    textAlign: 'center',
    widht: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    background: 'rgba(0, 0, 0, 0.4)',
    width: '80%',
    minHeight: '40%',
    maxHeight: '65%',
    borderRadius: '5px',
    textAlign: 'left',
    padding: '20px',
    overflowY: 'auto'
  }
})

const MailContent = ({ mail }) => {

  const classes = useStyles()

  if (!mail)
    return <div></div>

  return <div className={classes.root}>
      {<h1>{mail.title}</h1>}
      <div className={classes.container}>
        {mail.content}

      </div>
    </div>
  
}

const mapStateToProps = (state, { match }) => {

  if (match.path.includes('inbox'))
    return {
      mail: state.mail.inbox.find(mail => mail.id === match.params.id)
    }

  else
    return {
      mail: state.mail.sent.find(mail => mail.id === match.params.id)
    }
}
export default connect(mapStateToProps)(MailContent)