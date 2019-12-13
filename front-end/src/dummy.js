import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({

})

const Navigation = props => {

  const classes = useStyles()

  return <div>

  </div>
}

export default Navigation




// import React, { useEffect, useRef, useState } from 'react'
// import ReactDOM from 'react-dom'
// import { makeStyles } from '@material-ui/styles'


// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     height: '100%',
//     background: 'pink'
//   }
// })

// const ChatPortal = props => {

//   const classes = useStyles()

//   let externalWindow = useRef(null)
//   const containerEl = document.createElement('div')

//   useEffect(() => {
//     externalWindow.current = window.open('', '', 'width=400,height=500,left=200,top=200')
   
//     externalWindow.current.document.body.appendChild(containerEl)
//     externalWindow.current.document.title = 'Let\'s find love - chat';

//     externalWindow.current.addEventListener('beforeunload', () => {
//       props.closeWindowPortal();
//     });

//     return () => {
//       externalWindow.current.close()
//     }
//   })

//   if (externalWindow.current === null)
//     return <div></div>

//   return ReactDOM.createPortal(props.children, containerEl)
// }

// const Chat = props => {
//   const [showPortal, setShowPortal] = useState(true)

//   useEffect(() => {
//     window.addEventListener('beforeunload', () => {
//       closeWindowPortal();
//     });
//   })

//   // const toggleWindowPortal = () => {
//   //   setShowPortal(!showPortal)
//   // }

//   const closeWindowPortal = () => {
//     setShowPortal(false)
//   }

//   return <div>
//     { showPortal && <ChatPortal closeWindowPortal={closeWindowPortal}>
//       <div>Fuck you</div>

//     </ChatPortal>}
//   </div>
// }

// export default Chat