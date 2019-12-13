import React from 'react'
import { styled } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { addProfileImage } from '../../actions/user'
import CloseIcon from '@material-ui/icons/Close';

const FileWindow = styled('div')({
  width: '15%',
  backgroundColor: '#1769aa',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2em',
  borderRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  left: '50%',
  top: '50%',
  fontSize: '1em',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)',
})


const FileUpload = props => {

  const handleChange = e => {
    props.addProfileImage(e.target.files['0'])
    props.setShowFileUpload(false)
  }

  return <FileWindow>
    <div style={{ width: '100%', textAlign: 'right', cursor: 'pointer'}}>
    <CloseIcon fontSize="small" onClick={() => props.setShowFileUpload(false)} id="close-icon" style={{ fontSize: '1em' }} />
    </div>
    <Button 
      color="primary"
      variant="contained"
      size="small"
      component="label"
      style={{ fontSize: '0.8em' }}
    >
      Lataa kuva
        <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </Button>

    <p style={{ fontSize: '0.7em', color: '#ccc' }}>max leveys/korkeus: 500px (jpg/png)</p>

  </FileWindow>
}

export default connect(null, { addProfileImage })(FileUpload)
