import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux'
import { setNotification } from '../../actions/notification'

const useStyles = makeStyles({
  close: {
    padding: '10px',
  },
});

const Notification = ({ message, setNotification }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (message)
      setOpen(true)

  }, [message])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setNotification('')
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      message={<span id="message-id">{message}</span>}
        action={[
          
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  message: state.notification
})

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)