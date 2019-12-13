import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Sidebar from './Sidebar/Sidebar'
import ContentArea from './ContentArea/ContentArea'

const useStyles = makeStyles({
  contentContainer: {
    width: '100%',
    height: '88%',
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'nowrap'
  }
})

const MainPage = props => {

  const classes = useStyles()

  return (
    <div className={classes.contentContainer}>
      <Sidebar />
      <ContentArea />
    </div>
  )
}

export default MainPage