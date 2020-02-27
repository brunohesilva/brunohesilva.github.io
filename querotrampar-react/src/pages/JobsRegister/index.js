import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from '../../components/Menu'
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
  
  const JobRegister = props => {
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();
    const [expanded, setExpanded] = React.useState('');
    
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(initialState);
    
    const [abreModalJobSalvo, setAbreModalJobSalvo] = useState(false);
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

      const salvaJob = (data, e) => {
        e.preventDefault();
        setIsLoading(true);
        
        api.post("/Jobs", data, {
            headers: {
              Authorizhation: 'Bearer' + localStorage.getItem("user-querotrampar")
            }
        }).then((resp) => {
          setAbreModalJobSalvo(true);
            setExpanded('');
            listarJobs();
            reset({
              title: "",
              description: "",
              level: "",
              requirements: [""],
              payment: "",
              companyName: "",
              createdAt: "",
              address: "",
              status : false
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
            <Menu titulo="Cadastro de Vagas" />
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
                            Cadastro de Vagas
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form onSubmit={handleSubmit(salvaJob)} no noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Título"
                                    name="title"
                                    type="text"
                                    error={!!errors.title}
                                    inputRef={register({
                                      required: true,
                                    })}
                                    />
                                    {errors.title && <Alert severity="error">Informe o Título</Alert>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"  
                                    margin="normal"
                                    required
                                    multiline
                                    fullWidth
                                    rows="10"
                                    id="description"
                                    label="Descrição"
                                    name="description"
                                    autoComplete="current-password"
                                    type="Multiline"
                                    error={!!errors.description}
                                    inputRef={register({
                                        required: true,
                                    })}
                                    />
                                    {errors.description && <Alert severity="error">Informe a Descrição</Alert>}
                                </Grid>
                                  <Grid item xs={3}>
                                    {/* <label><select type="checkbox"  name="level" ref={register} />Level</label> */}
                                    {/* <select>
                                      <option>
                                          
                                      </option>
                                    </select>
                                  </Grid>
                                <Grid item xs={6}>
                                  {/* <label><input type="checkbox"  name="reqirements" ref={register} />Requisitos</label> */}
                                   <TextField
                                    variant="outlined"  
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="level"
                                    label="Level"
                                    name="level"
                                    type="text"
                                    error={!!errors.level}
                                    inputRef={register({
                                        required: true,
                                    })}
                                    />
                                    {errors.level && <Alert severity="error">Informe o Level</Alert>}
                                </Grid>
                                <Grid item xs={3}>
                                <TextField
                                    variant="outlined"  
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="requirements"
                                    label="Requisitos"
                                    name="requirements"
                                    type="text"
                                    error={!!errors.requirements}
                                    inputRef={register({
                                        required: false,
                                    })}
                                    />
                                    {errors.requirements && <Alert severity="error">Informe os Requisitos</Alert>}
                                </Grid>
                                <Grid item xs={3}>
                                <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="payment"
                                  label="Sálario"
                                  name="payment"
                                  type="text"
                                  error={!!errors.payment}
                                  inputRef={register({
                                      required: true,
                                    })}
                                    />
                                  {errors.payment && <Alert severity="error">Informe o Sálario</Alert>}
                              </Grid>
                              <Grid item xs={4}>
                                  <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="companyName"
                                  label="Empresa"
                                  name="companyName"
                                  type="text"
                                  error={!!errors.companyName}
                                  inputRef={register({
                                      required: true,
                                    })}
                                  />
                                  {errors.companyName && <Alert severity="error">Informe a Empresa</Alert>}
                              </Grid>
                              <Grid item xs={3}>
                                  <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="createdAt"
                                      label="Data Inserção"
                                      name="createdAt"
                                      type="date"
                                      error={!!errors.createdAt}
                                      inputRef={register({
                                          required: true,
                                        })}
                                        />
                                  {errors.createdAt && <Alert severity="error">Informe a Data Inserção</Alert>}
                              </Grid>
                              <Grid item xs={4}>
                                  <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="address"
                                  label="Endereço"
                                  name="address"
                                  type="text"
                                  error={!!errors.address}
                                  inputRef={register({
                                      required: true,
                                    })}
                                    />
                                  {errors.address && <Alert severity="error">Informe o Endereço</Alert>}
                              </Grid>
                                <Grid item xs={3}>
                                  {/* <label><input type="checkbox"  name="status" ref={register} />Status</label> */}
                                  <TextField
                                    variant="outlined"  
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="status"
                                    label="Status"
                                    name="status"
                                    autoComplete="status"
                                    type="text"
                                    error={!!errors.status}
                                    inputRef={register({
                                        required: true,
                                    })}
                                    />
                                    {errors.status && <Alert severity="error">Informe o Estado da Vaga</Alert>}
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

export default JobRegister;