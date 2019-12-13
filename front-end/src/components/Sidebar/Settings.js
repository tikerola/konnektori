import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Grid, Switch } from '@material-ui/core'
import { connect } from 'react-redux'
import { theme } from '../../theme/theme'
import { Paper } from '@material-ui/core'
import { toggleChatEnabled, toggleProfileVisible } from '../../actions/user'
import { Link } from 'react-router-dom'
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded'

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: '90%',
    margin: '0 auto',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    textAlign: 'center'
  },
  typography: {
    marginRight: 'auto',
    fontSize: '1em'
  },
  link: {
    color: 'red',
    textDecoration: 'none',
    border: '1px solid red',
    padding: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '1.5em',
    color: '#bbb',
    textAlign: 'left'
  },
  switchBase: {
    color: '#1769aa',
    '&$checked': {
      color: 'purple',
    },
    '&$checked + $track': {
      backgroundColor: 'rgb(0, 0, 0, 0)',
    },
  },
  track: {},
  checked: {},
  linkContainer: {
    paddingTop: '20px',

  },
  icon: {
    paddingRight: '0.3em',
    paddingLeft: '0.5em',
    color: 'red',

  }
})

const Settings = ({ chatEnabled, toggleChatEnabled, visible, toggleProfileVisible }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.container}>

      <Paper className={classes.paper} elevation={10}>
        <h2>Asetukset</h2>
        <Typography className={classes.typography} style={{ marginTop: '1em' }} component="div">
          Chat käytössä
          </Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Ei</Grid>
          <Grid item>
            <Switch
              id="settings-chat"
              size="small"
              classes={{
                switchBase: classes.switchBase
              }}
              checked={chatEnabled}
              onChange={() => toggleChatEnabled(!chatEnabled)}
              value="male"
              color="primary"
            />
          </Grid>
          <Grid item>Kyllä</Grid>
        </Grid>

        <Typography className={classes.typography} style={{ marginTop: '1em' }} component="div">
          Profiili näkyvissä
          </Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Ei</Grid>
          <Grid item>
            <Switch
              size="small"
              id="settings-hide"
              classes={{
                switchBase: classes.switchBase
              }}
              checked={visible}
              onChange={() => toggleProfileVisible(!visible)}
              value="male"
              color="primary"
            />
          </Grid>
          <Grid item>Kyllä</Grid>
        </Grid>

        <hr style={{ border: 'none', borderTop: '1px solid #bbb', marginTop: '15px' }} />

        <div className={classes.linkContainer}>
          <Link to="/erase" className={classes.link}><MeetingRoomRoundedIcon className={classes.icon} />Poista profiili</Link>
        </div>

      </Paper>
    </div>
  </div>
}

const mapStateToProps = state => ({
  chatEnabled: state.user.profile.chatEnabled,
  visible: state.user.profile.visible
})


export default connect(mapStateToProps, { toggleChatEnabled, toggleProfileVisible })(Settings)