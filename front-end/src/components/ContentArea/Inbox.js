import React from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { deleteMail, mailRead } from '../../actions/mail'

const StyledTableCell = withStyles({
  head: {
    fontSize: '1em',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    borderWidth: 0,
    fontFamily: 'inherit',
    padding: '0.5em',
    paddingLeft: '1em'
  },
  body: {
    fontSize: '1em',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    borderWidth: 0,
    fontFamily: 'inherit',
    padding: '0.5em',
    paddingLeft: '1em'
  },
})(TableCell);


const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '80%',
    color: '#bbb',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  root: {
    width: '70%',
    overflowX: 'auto',
    background: 'rgba(0, 0, 0, 0.2)'

  },
  table: {
    width: '100%',
  },
})

const Inbox = ({ inbox, deleteMail, mailRead }) => {

  const classes = useStyles()

  if (inbox.length === 0)
    return <div className={classes.container}>
      <h1>Ei viestejä</h1>
    </div>

  return <div className={classes.container}>
    <h1>Saapuneet viestit</h1>
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Otsikko</StyledTableCell>
            <StyledTableCell align="left">Lähettäjä</StyledTableCell>
            <StyledTableCell align="left">Päivämäärä</StyledTableCell>
            <StyledTableCell align="left">Poista</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inbox && inbox.map(mail => (
            <TableRow key={mail.id}>
              <StyledTableCell component="th" scope="row">
                <Link to={`/profile/inbox/${mail.id}`} onClick={() => {
                  if (!mail.read)
                    mailRead(mail.id)
                }}>{mail.title}</Link>
              </StyledTableCell>
              <StyledTableCell align="left">{mail.author}</StyledTableCell>
              <StyledTableCell align="left">{moment(mail.createdAt).format('LLL')}</StyledTableCell>
              <StyledTableCell align="left">
                <DeleteForeverIcon style={{ cursor: 'pointer', fontSize: '1em' }} onClick={() => deleteMail(mail.id, 'inbox')} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
}

const mapStateToProps = state => ({
  inbox: state.mail.inbox
})


export default connect(mapStateToProps, { deleteMail, mailRead })(Inbox)