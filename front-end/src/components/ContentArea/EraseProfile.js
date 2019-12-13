import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import userService from '../../services/user'
import { logout } from '../../actions/user'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '40%',
    margin: '0 auto',
    paddingTop: '8%',
    color: '#bbb'
  },
  buttonContainer: {
    width: '80%',
    paddingTop: '3%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headersAndImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const EraseProfile = ({ logout, history, token }) => {

  const classes = useStyles()

  const handleErase = async () => {
    userService.saveToken(token)
    await userService.eraseUser()
    history.push('/')
    logout(false)
    
    
  }

  return <div className={classes.root}>
    <div className={classes.headersAndImage}>
      <div className={classes.headerContainer}>
        <h1>Ikävä, että olet lähdössä!</h1>
        <h2>Haluatko varmasti jättää meidät?</h2>
      </div>
      <img src="./assets/images/tear1.png" width="120" alt="cry" />
    </div>
    <div className={classes.buttonContainer}>
      <Button color="secondary" variant="contained" onClick={handleErase} id="erase-button">Poista profiili</Button>
      <Button color="primary" variant="outlined" onClick={() => history.push("/profile")} >Peruuta</Button>
    </div>

  </div>
}

const mapStateToProps = state => ({
  token: state.user.token
})

export default connect(mapStateToProps, { logout })(EraseProfile)


