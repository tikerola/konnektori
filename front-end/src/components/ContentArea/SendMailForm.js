import React from 'react'
import useField from '../../hooks/useField'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { sendMail } from '../../actions/mail'

const useStyles = makeStyles({
  overflowContainer: {
    width: '100%',
    height: '90%',
    overflowY: 'auto',

  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#bbb',
    paddingTop: '1em'
  },
  textField: {
    width: '80%',
    background: 'rgba(0, 0, 0, 0.5)'
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
    marginBottom: '2em'
  }

})

const SendMailForm = ({ match, history, sendMail }) => {

  const [content, clearContent] = useField('text')
  const [title, clearTitle] = useField('text')

  const classes = useStyles()

  return <div className={classes.overflowContainer} >
    <div className={classes.root}>
      <h1>Lähetä viesti käyttäjälle: {match.params.username} </h1>

      <TextField
        {...title}
        className={classes.textField}
        label="Otsikko"
        id="title"
        margin="normal"
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          }
        }}
      />

      <TextField
        label="Teksti"
        {...content}
        id="text"
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
          variant="contained"
          id="send"
          color="primary"
          onClick={() => {
            sendMail(match.params.username, title.value, content.value)
            clearContent()
            clearTitle()
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

export default connect(null, { sendMail })(SendMailForm)