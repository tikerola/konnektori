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
    justifyContent: 'flex-start',
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
    borderRadius: '5px',
    marginBottom: '2em'
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
    paddingRight: '1em',
    marginBottom: '1em',
    overflowY: 'auto'

  },
  noText: {
    width: '90%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }
})


const Profile = ({ profile }) => {
  const [showBigPicture, setShowBigPicture] = React.useState(false)
  const classes = useStyles()

  if (!profile)
    return <div></div>

  return (<div className={classes.overflowContainer}>
    <div className={classes.root}>
      <h1>{profile.username}</h1>
      <div className={classes.container}>
        <img
          src={profile.image.imageUrl}
          alt={`${profile.username}`}
          className={classes.image}
          width="150"
          onClick={() => setShowBigPicture(true)}
        />
        <div className={classes.text}>
          {profile.profileText ? profile.profileText : <div className={classes.noText}>Ei profiilitekstiä lisätty</div>}
        </div>
      </div>
      {showBigPicture && <ProfilePicture imageUrl={profile.image.imageUrl} showImage={setShowBigPicture} />}
    </div>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Profile))