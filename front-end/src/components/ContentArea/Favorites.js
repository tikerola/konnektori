import React from 'react'
import ProfileThumbnail from './ProfileThumbnail'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'


const useStyles = makeStyles({

  root: {
    width: '100%',
    color: '#bbb',
    paddingTop: '1em',
    textAlign: 'center'
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
    alignContent: 'space-evenly'
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

const Favorites = ({ profiles }) => {
  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(true)
  const classes = useStyles()

  const handlePageChange = direction => {
    if (direction === 'next')
      setPage(page + 1)

    else if (direction === 'prev')
      setPage(page - 1)
  }


  return (
    <div className={classes.root}>

      <h1>{profiles.length > 0 ? 'Suosikit' : 'Ei suosikkeja valittu'}</h1>
      {(loading && profiles.length > 0) && <Spinner />}
      <div className={classes.center}>
        <div className={classes.container} style={{ visibility: loading ? 'hidden' : 'visible'}}>
          {
            profiles.slice((page - 1) * 12, 12 + (page - 1) * 12).map((profile, index) =>
              <Link to={`/search/profiles/${profile.username}`} key={profile.id} style={{ textDecoration: 'none' }} >
                <ProfileThumbnail
                  username={profile.username}
                  image={profile.image.imageUrl}
                  online={profile.online}
                  setLoading={setLoading}
                  index={index}
                />
              </Link>)
          }
        </div>
      </div>
      {profiles.length > 0 && <div className={classes.pagination}>
        <Button
          disabled={page === 1}
          onClick={() => handlePageChange('prev')}
          style={{ fontSize: '0.6em' }}
        >
          {'< '}prev page
        </Button>

        <Button
          disabled={profiles.length <= page * 12}
          onClick={() => handlePageChange('next')}
          style={{ fontSize: '0.6em' }}
        >
          next page{' >'}
        </Button>
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  profiles: state.user.favorites
})


export default connect(mapStateToProps)(Favorites)