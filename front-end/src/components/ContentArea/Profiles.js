import React from 'react'
import ProfileThumbnail from './ProfileThumbnail'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { searchProfiles } from '../../actions/profiles'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'


const useStyles = makeStyles({

  root: {
    width: '100%',
    color: '#bbb',
    paddingTop: '0.2em',
    textAlign: 'center',


  },
  center: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'

  },
  container: {
    width: '80%',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto auto',
    gridRowGap: '1.5em',
    alignContent: 'space-evenly',
    fontSize: '1em'
  },
  pagination: {
    margin: '1.5em auto',
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    fontSize: '1.3em'
  }
})

const Profiles = ({ profiles, searchOptions, searchProfiles }) => {

  const [loading, setLoading] = React.useState(true)
  const classes = useStyles()

  const handlePageChange = direction => {

    searchProfiles({
      age: searchOptions.age,
      gender: searchOptions.gender,
      page: direction === 'next' ? searchOptions.page + 1 : searchOptions.page - 1,
      limit: searchOptions.limit
    })

    setLoading(true)
  }

  const profilesArray = profiles.map((profile, index) => <Link to={`/search/profiles/${profile.username}`} key={profile.id}
    style={{ textDecoration: 'none' }}>
    <ProfileThumbnail
      username={profile.username}
      image={profile.image.imageUrl}
      online={profile.online}
      setLoading={setLoading}
      index={index}
    />
  </Link>)

  return (
    <div className={classes.root}>
      <h1>Hakutulokset</h1>
      {(loading && profiles.length > 0) && <Spinner />}
      <div className={classes.center}>
        <div className={classes.container} style={{ visibility: loading ? 'hidden' : 'visible' }}>
          {profilesArray}
        </div>
      </div>
      {profiles.length > 0 && <div className={classes.pagination}>
        <Button
          disabled={searchOptions.page === 1}
          onClick={() => handlePageChange('prev')}
          style={{ fontSize: '0.6em' }}
        >
          {'< '}Edellinen sivu
        </Button>

        <Button
          disabled={searchOptions.page * searchOptions.limit >= searchOptions.profileCount}
          onClick={() => handlePageChange('next')}
          style={{ fontSize: '0.6em' }}
        >
          Seuraava sivu{' >'}
        </Button>
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  searchOptions: state.search
})

const mapDispatchToProps = {
  searchProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)