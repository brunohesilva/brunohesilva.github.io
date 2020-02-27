import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import StudentsMenu from '../../components/StudentsMenu'
import api from '../../services/api';
import Container from '@material-ui/core/Container';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const initialState = {
    id: 0,
    name: '',
    password: '',
    passwordConfirm: '',
    birthDate: '',
    cpf: '',
    email: '',
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

  const StudentRegister = props => {
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();
    const [expanded, setExpanded] = React.useState('');

    const [students, setStudents] = useState([]);

    const [abreModalStudentSalvo, setAbreModalStudentSalvo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    useEffect(() => {
        listarStudents();
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

    const listarStudents = () => {
        api.get("StudentsProfile", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("user-querotrampar")
          }
         }).then((resp) => {
           console.log("resposta", resp);
           setStudents(resp.data);
         }).catch((erro) => {
          console.log("erro", erro);
        })
    }

    const salvaStudent = (data, e) => {
        e.preventDefault();
        setIsLoading(true);

        api.post("/StudentsProfile", data, {
            headers: {
                Authorizhation: 'Bearer' + localStorage.getItem("user-querotrampar")
            }
        }).then((resp) => {
          setAbreModalStudentSalvo(true);
          listarStudents();
            setExpanded('');
            reset({
                name: "",
                password: "",
                passwordConfirm: "",
                birthDate: "",
                cpf: "",
                email: ""
            })
        }).catch((erro) => {
            console.log('erro', erro);
        }).finally(() => {
            setIsLoading(false);
        })
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <StudentsMenu titulo="Cadastro de Estudantes" />
            <main className={classes.content}>

            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>

                <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChangeExpanded('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        arial-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Cadastro de Estudantes
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form onSubmit={handleSubmit(salvaStudent)} no noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Senha"
                                    name="password"
                                    autoComplete="current-password"
                                    type="password"
                                    error={!!errors.password}
                                    inputRef={register({
                                        required: true,
                                    })}
                                    />
                                    {errors.password && <Alert severity="error">Informe a Senha</Alert>}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                    variant="outlined"  
                                    margin="normal"
                                    required
                                    multiline
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirme a Senha"
                                    name="confirmPassword"
                                    autoComplete="current-password"
                                    type="password"
                                    error={!!errors.confirmPassword}
                                    inputRef={register({
                                        required: true,
                                    })}
                                    />
                                    {errors.confirmPassword && <Alert severity="error">Confirme a Senha</Alert>}
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="birthDate"
                                  label="Data de Nascimento"
                                  name="birthDate"
                                  type="date"
                                  error={!!errors.birthDate}
                                  inputRef={register({
                                      required: true,
                                    })}
                                    />
                                  {errors.birthdate && <Alert severity="error">Informe sua Data de Nascimento</Alert>}
                              </Grid>
                              <Grid item xs={6}>
                                  <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="cpf"
                                  label="CPF"
                                  name="cpf"
                                  type="text"
                                  error={!!errors.cpf}
                                  inputRef={register({
                                      required: true,
                                    })}
                                  />
                                  {errors.cpf && <Alert severity="error">Informe apénas Numeros</Alert>}
                              </Grid>
                              <Grid item xs={6}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="email"
                                      label="Email"
                                      name="email"
                                      type="text"
                                      error={!!errors.email}
                                      inputRef={register({
                                          required: true,
                                        })}
                                        />
                                  {errors.email && <Alert severity="error">Informe o Email</Alert>}
                              </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={2}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={isLoading}
                                        >
                                        {isLoading ? "Salvando..." : "Salvar"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Paper style={{ padding: 16, marginTop:20 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Lista de Estudantes
          </Typography>
          <TableContainer>
            <Table stickyHeader arial-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell>
                    Data de Nascimento
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(student => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>

                    <TableCell>
                      <p>{student.name}</p>
                    </TableCell>
                    <TableCell>
                      <p>{student.birthDate}</p>
                    </TableCell>
                    <TableCell>
                      <p>{student.email}</p>
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
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
            </Container>
            <Dialog
      open={abreModalStudentSalvo}
      onClose={() => setAbreModalStudentSalvo(false)}
      arial-labelledby="alert-dialog-title"
      aria-describedy="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Estudante Salva"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estudante salvo e o mesmo já está disponível para visualização no aplicaticovo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbreModalStudentSalvo(false)} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
          </main>
        </div>
    )
}

export default StudentRegister;
