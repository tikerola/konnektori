import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Slider, Button, Typography, Grid, Switch, TextField } from '@material-ui/core/'
import { connect } from 'react-redux'
import { searchProfiles, searchProfile } from '../../actions/profiles'
import { withRouter } from 'react-router-dom'
import { theme } from '../../theme/theme'
import { Paper } from '@material-ui/core'
import useField from '../../hooks/useField'


const useStyles = makeStyles({
  root: {
    width: '90%',
    height: '90%',
    margin: '0 auto',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  typography: {
    marginRight: 'auto',
    fontSize: '1em'
  },
  button: {
    marginTop: '1em',
    fontSize: '0.8em'
  },
  switchBase: {
    color: '#1769aa',
    '&$checked': {
      color: 'purple',
    },
    '&$checked + $track': {
      backgroundColor: 'rgb(0, 0, 0, 0)',
    }
  },
  track: {},
  checked: {},
  textField: {
    color: '#bbb',
    background: 'rgba(0, 0, 0, 0)',
    fontSize: '1em',
    width: '100%',
    
  },
  cssLabel: {
    color: '#bbb',
    fontSize: '1em'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#1769aa !important`,
      borderWidth: '1px !important'
    }
  },

  cssFocused: {
    color: `${theme.inputFocusedLabelColor} !important`,
    padding: 'inherit'
  },
  icon: {
    backgroundColor: 'inherit'
  },
  noPadding: {
    padding: '0px'
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `#1769aa !important`

  },
  paper: {
    width: '90%',
    maxHeight: '45%',
    background: theme.sidebarBackground,
    padding: '1em',
    color: '#bbb',
    textAlign: 'left'
  },
  inputMarginDense: {
    padding: '1em !important'
  }
})

function valuetext(value) {
  return `${value}`;
}

export const Search = props => {
  const classes = useStyles()
  const [value, setValue] = React.useState([18, 99])
  const [gender, setGender] = React.useState(true)
  const [username, clearUsername] = useField('text')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleSearchProfile = () => {
    props.searchProfile(username.value, props.history)

    clearUsername()
  }

  const handleSearchProfiles = () => {

    const searchData = {
      age: value,
      gender: gender === false ? 'male' : 'female',
      page: 1,
      limit: 12
    }

    props.searchProfiles(searchData)
    props.history.push('/search/profiles')
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.typography} gutterBottom>
          Ikä
      </Typography>
        <Slider
          id="age-slider"
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="age-slider"
          getAriaValueText={valuetext}

        />


        <Typography className={classes.typography} style={{ marginTop: '1em' }} component="div">
          Etsin
          </Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Miehiä</Grid>
          <Grid item>
            <Switch
              id="gender"
              size="small"
              classes={{
                switchBase: classes.switchBase
              }}
              checked={gender}
              onChange={e => setGender(e.target.checked)}
              value="male"
              color="primary"
            />
          </Grid>
          <Grid item>Naisia</Grid>
        </Grid>


        <Button
          className={classes.button}
          id="search1"
          size="small"
          variant="outlined"
          color='primary'
          onClick={handleSearchProfiles}
        >
          Etsi
        </Button>
      </Paper>

      <Paper className={classes.paper}>
        <TextField
          {...username}
          className={`${classes.textField} ${classes.noPadding}`}
          id="search-input"
          label="Syötä käyttäjänimi"
          margin="dense"
          
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
              root: `${classes.cssOutlinedInput}`,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              inputMarginDense: classes.noPadding
            },
            style: { fontSize: '1em', padding: '1em'}
          }}
        />
        <Button
          className={classes.button}
          id="search2"
          size="small"
          variant="outlined"
          color='primary'
          onClick={handleSearchProfile}
        >
          Etsi
        </Button>
      </Paper>

    </div>
  )
}


export default connect(null, { searchProfiles, searchProfile })(withRouter(Search))