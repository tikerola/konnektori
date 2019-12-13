import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import FileUpload from './FileUpload'
import PhotoIcon from '@material-ui/icons/Photo'
import EditIcon from '@material-ui/icons/Edit'
import SettingsIcon from '@material-ui/icons/Settings'

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

const MailNavigationContent = props => {

  const [showFileUpload, setShowFileUpload] = React.useState(false)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p >
        <NavLink
          to={`/profile/edit`}
          exact
          className={classes.navLink}
          activeClassName={classes.active}
        >
          <EditIcon className={classes.icon} />
          Lisää profiilin kuvaus
        </NavLink></p>
      <p className={classes.navLink} onClick={() => setShowFileUpload(!showFileUpload)}>
        <PhotoIcon className={classes.icon} />
        Lisää kuva</p>

      <p>
        <NavLink className={classes.navLink} to="/settings">
          <SettingsIcon className={classes.icon} />
          Asetukset
        </NavLink>
      </p>

      {showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}
    </div>
  )
}

export default MailNavigationContent