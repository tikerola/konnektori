import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import ProfilePicture from './ProfilePicture'

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
    color: '#bbb'
  },
  container: {
    background: 'rgba(0, 0, 0, 0.4)',
    width: '90%',
    height: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '1.5em',
    marginBottom: '2em',
    borderRadius: '5px'
  },
  image: {
    borderRadius: '5px',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    cursor: 'pointer',
    width: '15%'
  },
  text: {
    width: '90%',
    height: '100%',
    marginLeft: '2em',
    overflowY: 'auto'
  }
})


const Profile = ({ match, profile }) => {
  const [showBigPicture, setShowBigPicture] = React.useState(false)
  const classes = useStyles()

  if (!profile)
    return <div></div>

  return (<div className={classes.overflowContainer}>
    <div className={classes.root}>
      <h1>{profile.username} <span style={{ fontSize: '0.5em', color: '#666' }}>
        ({profile.online ? 'online' : 'offline'})</span></h1>
      <div className={classes.container}>
        <img
          src={profile.image.imageUrl}
          alt={`${profile.username}`}
          width="150"
          className={classes.image}
          onClick={() => setShowBigPicture(true)}
        />
        <div className={classes.text}>
          {profile.profileText}
        </div>
      </div>
      {showBigPicture && <ProfilePicture imageUrl={profile.image.imageUrl} showImage={setShowBigPicture} />}
    </div>
  </div>
  )
}

const mapStateToProps = (state, { match }) => {
  return {
    profile: state.profiles.find(profile => profile.username === match.params.username)
  }
}

export default connect(mapStateToProps)(withRouter(Profile))