import React from 'react'
import useField from '../../hooks/useField'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { reply } from '../../actions/mail'

const useStyles = makeStyles({
  overflowContainer: {
    width: '100%',
    height: '90%',
    overflowY: 'auto'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#bbb',
    marginBottom: '2em'
  },
  textField: {
    width: '80%',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#bbb'
  },
  cssLabel: {
    color: theme.inputLabelColor,
    fontSize: '1em'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.inputFocusedBorderColor} !important`,
    },
    color: '#bbb',
    fontSize: '0.9em'
  },
  cssFocused: {
    color: `${theme.inputFocusedLabelColor} !important`
  },
  icon: {
    backgroundColor: 'inherit'
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${theme.inputBorderColor} !important`
  },
  buttonContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: '10px',
    marginRight: '30px',
    width: '100px',
    fontSize: '0.7em',
  }

})

const ReplyMailForm = ({ match, history, reply, mail, blockedBy }) => {

  const [text, clearText] = useField('text')

  const classes = useStyles()

  if (!mail)
    return <div></div>

  return <div className={classes.overflowContainer} >
    <div className={classes.root}>
      <h1>Vastaa käyttäjälle: {mail.author} </h1>
      <TextField
        id="reply-text"
        label="Vastaa"
        {...text}
        multiline
        rows="7"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          }
        }}
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            history.goBack()
          }}
          className={classes.button}
        >
          Peruuta
      </Button>

        <Button
          disabled={blockedBy.includes(mail.author)}
          variant="contained"
          color="primary"
          onClick={() => {
            reply(match.params.id, text.value)
            clearText()
            history.push('/profile')
          }}
          className={classes.button}
        >
          Lähetä
      </Button>
      </div>
    </div>
  </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    mail: state.mail.inbox.find(m => m.id === ownProps.match.params.id),
    blockedBy: state.user.blockedBy
  }
}

export default connect(mapStateToProps, { reply })(ReplyMailForm)