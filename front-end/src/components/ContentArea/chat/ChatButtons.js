import React from 'react'
import { styled, makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { setChatWith, setDot, destroySession } from '../../../actions/chat'
import { Badge } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

const CustomButton = styled('div')({
  width: '5em',
  height: '1.8em',
  background: 'rgba(0,0,0,0.9)',
  color: '#bbb',
  borderRadius: '5px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)',
  position: 'fixed',
  bottom: '1.5em',
  fontSize: '0.8em',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid blue',
  transition: 'all .2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 2px 10px 5px rgba(0,0,0,0.75)'
  }
})

const styles = makeStyles({
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'

  },
  icon: {
    fontSize: '0.7em',
    marginLeft: 'auto',
    cursor: 'pointer'
  },
  name: {
    cursor: 'pointer'
  }
})


const ChatButtons = ({ candidates, chatWith, setChatWith, sessions, setDot, destroySession }) => {

  const classes = styles()

  const buttonStyles = (index, name) => {
    return {
      left: 50 + index * 130,
      color: chatWith === name ? 'white' : '#999'
    }
  }

  return <div>
    {candidates && candidates.map((name, index) =>
      <CustomButton
        key={index}
        style={buttonStyles(index, name)}
      >
        <Badge badgeContent={sessions[name].dot} className={classes.buttonContainer} color="primary" variant="dot" anchorOrigin={{
          horizontal: "left",
          vertical: "top"
        }}>

          <ClearIcon className={classes.icon} onClick={() => destroySession(name)} />
          <span className={classes.name} onClick={() => {
            setChatWith(name)
            setDot(name, 0)
          }}>{name.length > 5 ? `${name.substring(0, 8)}...` : name}</span>

        </Badge>
      </CustomButton>)}
  </div>
}

const mapStateToProps = state => ({
  candidates: Object.keys(state.chat.sessions),
  chatWith: state.chat.chatWith,
  sessions: state.chat.sessions
})

export default connect(mapStateToProps, { setChatWith, setDot, destroySession })(ChatButtons)