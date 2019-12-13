import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { theme } from '../../theme/theme'
import useField from '../../hooks/useField'
import { signup } from '../../actions/user'
import { setNotification } from '../../actions/notification'
import { connect } from 'react-redux'
import moment from 'moment'


const genders = [
  {
    value: '',
    label: 'Gender'
  },
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
]

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    height: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  header: {
    width: '100%',
    textAlign: 'center',
    color: theme.signupHeaderColor
  },
  textField: {
    color: theme.inputTextColor,
    background: theme.textFieldBackgroundColor,
    width: '100%'
  },
  input: {
    fontSize: '0.8em'
  },
  formControl: {
    color: 'yellow'
  },
  cssLabel: {
    color: theme.inputLabelColor,
    fontSize: '1em'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.inputFocusedBorderColor} !important`,
    },
    color: 'white'
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
  button: {
    width: '50%',
    margin: '20px auto',
    fontSize: '0.8em'
  },
  register: {
    width: '90%',
    height: '10%',
    margin: '10px',
    color: theme.signupHeaderColor,
    fontSize: '1em',
    textAlign: 'left',
    '& p': {
      color: 'white',
      fontSize: '1.3em',
      cursor: 'pointer'
    }
  }
})

export const Signup = props => {

  const [username, resetUsername] = useField('text')
  const [gender, resetGender] = useField('text')
  const [birthday, setBirthday] = React.useState('')
  const [password, resetPassword] = useField('password')
  const [confirmPassword, resetConfirmPassword] = useField('password')

  const classes = useStyles()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!inputValid())
      return

    const userData = {
      username: username.value,
      password: password.value,
      age: moment().diff(birthday, 'years'),
      gender: gender.value,
      birthday
    }

    try {

      await props.signup(userData)

      resetUsername()
      resetGender()
      resetPassword()
      resetConfirmPassword()
      props.toggleRegister()
      props.setNotification('Registration successfull')
    } catch (error) {
      props.setNotification('Username already taken')
    }
  }

  const inputValid = () => {

    if (!username.value || !birthday || !gender.value || !password.value || !confirmPassword.value) {
      props.setNotification('All fields must be filled')
      return false
    }

    if (password.value !== confirmPassword.value) {
      props.setNotification('Passwords wont match')
      return false
    }

    if (password.value.length < 6) {
      props.setNotification('Password must be at least 6 characters')
      return false
    }

    if (username.value.length < 4) {
      props.setNotification('Username must be at least 4 characters')
      return false
    }
    const calculatedAge = moment().diff(birthday, 'years')

    if (calculatedAge < 18 || calculatedAge > 99) {
      props.setNotification('Age must be between 18 and 99')
      return false
    }

    return true
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Rekisteröinti</h1>
        </div>

        <input type="password" style={{ display: 'none', width: '1em' }} readOnly={true} autoComplete="new-password"></input>

        <TextField
          id="username"
          {...username}
          margin="dense"
          required
          className={classes.textField}
          label="Käyttäjätunnus"
          
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
              input: classes.input
            }
          }}
        />

        <TextField
          select
          id='select-gender'
          margin="dense"
          required
          className={classes.textField}
          label="Sukupuoli"
          {...gender}
          variant="outlined"
          SelectProps={{
            SelectDisplayProps: {
              'data-testid': 'gender-select',
            },
          }}

          InputLabelProps={{
            shrink: true,
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            id: 'gender',
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              input: classes.input
            }
          }}
        >
          {genders.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>))}

        </TextField>


        <TextField
          className={classes.textField}
          type="date"
          SelectProps={{
            MenuProps: {
              icon: { color: "black !important" },
              backgroundColor: 'inherit !important'
            }
          }}
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          margin="dense"
          required
          label="Syntymäaika"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            },
          }}
          InputProps={{
            id: 'birthday',
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              input: classes.input
            }
          }}
        />


        <TextField
          className={classes.textField}
          {...password}
          id="password"
          margin="dense"
          required
          label="Salasana"
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
              input: classes.input
            }
          }}
        />


        <TextField
          className={classes.textField}
          {...confirmPassword}
          id="confirm"
          margin="dense"
          required
          label="Salasanan vahvistus"
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
              input: classes.input
            }
          }}
        />

        <Button variant="contained" size="small" color="primary" className={classes.button} onClick={handleSubmit}>
          Lähetä
        </Button>

        <div className={classes.register}>
          Sinulla on jo käyttäjätunnus?
        <p className={classes.link} onClick={props.toggleRegister}>Kirjaudu sisään täältä</p>
        </div>

      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

const mapDispatchToProps = {
  signup,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)