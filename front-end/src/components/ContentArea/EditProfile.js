import React from 'react'
import useField from '../../hooks/useField'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { editProfileText } from '../../actions/user'

const useStyles = makeStyles({
  overflowContainer: { 
    width: '100%', 
    height: '90%', 
    overflowY: 'auto'
  },
  
  root: {
    display: 'flex',
    height: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#bbb',
    paddingTop: '1em'

  },
  textField: {
    width: '80%',
    background: 'rgba(0, 0, 0, 0.5)',
    
  },
  cssLabel: {
    color: theme.inputLabelColor,
    fontSize: '1em'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.inputFocusedBorderColor} !important`
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

const EditProfile = ({ history, editProfileText, oldText }) => {

  const [text, clearText] = useField('text', undefined, oldText)

  const classes = useStyles()

  if (!oldText)
    return <div></div>

  return <div className={ classes.overflowContainer }>
  <div className={classes.root}>
    <h1>Muokkaa profiilitekstiä</h1>
    <TextField
      id="profile-text"

      label="Muokkaa"
      {...text}
      multiline
      rows="12"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
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
          history.push('/profile')
        }}
        className={classes.button}
      >
        Peruuta
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          editProfileText(text.value)
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

const mapStateToProps = (state) => {
  return {
    oldText: state.user.profile.profileText
  }
}

export default connect(mapStateToProps, { editProfileText })(EditProfile)