import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'


const useStyles = makeStyles({
  card: {
    width: '5.5em',
    height: '100%',
    background: 'black',
    marginLeft: '10px',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardContent: {
    padding: 0
  },
  image: {
    margin: '0 auto',
    width: '100%',
    height: '5.5em'
  },
  button: {
    margin: '0 auto',
    fontSize: '0.8em',
    width: '100%',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: '0.8em',
    height: '0.8em',
    backgroundColor: 'green',
    fontSize: '0.8em',
    borderRadius: '50px',
    marginLeft: '0.3em'
  }
});

const ProfileThumbnail = props => {
  const classes = useStyles()

  return (
    <Card className={classes.card} elevation={10}>
      <CardContent className={classes.cardContent}>
        <img src={props.image} alt="profile" className={classes.image} onLoad={() => {
          if (props.index === 0) {
            props.setLoading(false)
          }
        }} />
      </CardContent>
      <CardActions>
        <div className={classes.button}>
          <span>{props.username.length > 5 ? `${props.username.substring(0, 5)}...` : props.username}</span>
          <div className={classes.dot} style={{ backgroundColor: props.online ? 'green' : '#333' }} />
        </div>
      </CardActions>
    </Card>
  );
}
export default ProfileThumbnail