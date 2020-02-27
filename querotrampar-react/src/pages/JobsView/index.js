import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from '../../components/Menu'
import api from '../../services/api';
import Container from '@material-ui/core/Container';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const initialState = {
    id: 0,
        title: '',
        description: '',
        level: '',
        requirements: '',
        payment: '',
        companyName: '',
        createdAt: '',
        address: '',
        status: true
}

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, 
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    fixedHeight: {
      height: 240,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }));

const JobView = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('');

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(initialState);

    const [abreModalJobSalvo, setAbreModalJobSalvo] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        listarJobs();
    },[])

    const handleChangeExpanded = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const listarJobs = () => {
      api.get("/Jobs/All", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("user-querotrampar")
        }
       }).then((resp) => {
         console.log("resposta", resp);
         setJobs(resp.data);
       }).catch((erro) => {
        console.log("erro", erro);
      })  
  }
  
  return (
    <div className={classes.root}>
    <CssBaseline />
    <Menu titulo="Lista de Vagas" />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>

        <Paper style={{ padding: 16, marginTop:20 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Lista de Vagas
          </Typography>
          <TableContainer>
            <Table stickyHeader arial-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Título
                  </TableCell>
                  <TableCell>
                    Descrição
                  </TableCell>
                  <TableCell>
                    Nível
                  </TableCell>
                  <TableCell>
                    Requerimento
                  </TableCell>
                  <TableCell>
                    Sálario
                  </TableCell>
                  <TableCell>
                    Empresa
                  </TableCell>
                  <TableCell>
                    Data Inserção
                  </TableCell>
                  <TableCell>
                    Endereço
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(job => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={job.id}>

                    <TableCell>
                      <p>{job.title}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.description}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.level}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.requirements}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.payment}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.companyName}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.createdAt}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.address}</p>
                    </TableCell>
                    <TableCell>
                      <p>{job.status ? 'Active' : 'Inative'}</p>
                    </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Dialog
      open={abreModalJobSalvo}
      onClose={() => setAbreModalJobSalvo(false)}
      arial-labelledby="alert-dialog-title"
      aria-describedy="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Vaga Salva"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vaga salva e o mesmo já está disponível para visualização no aplicaticovo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbreModalJobSalvo(false)} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  </div>
)
}

export default JobView;