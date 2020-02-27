import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import Copyright from '../../components/Copyright';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
    root: {
        height: '50vh',
        marginTop: '15vh',
        // marginRight: '-5500vh',
        marginLeft: '60vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }

}));

const Login = props => {
    
    const { register, handleSubmit, errors } = useForm();

    const [erroMensagem, setErroMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const efetuaLogin = (data, e) => {
        e.preventDefault();
        setIsLoading(true);

        api.post("/Users", {
            "email" : data.email,
            "password" : data.password,
            "role" : data.role
        }).then(resp => {
            if (resp.status === 200) {
                localStorage.setItem("user-querotrampar", resp.data.token)
                props.history.push("/jobregister")
            } else {
                setErroMensagem("Email ou Senha inválidos")
            }
        }).catch(erro => {
            setErroMensagem("Email ou Senha inválidos")
        }).finally(() =>  {
            setIsLoading(false);
        })
    };

    const classes = useStyles();

    return (
       <Grid container component="main" className={classes.root}>
           <CssBaseline />
           <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} circle>
               <div className={classes.paper}>
                   <Typography component="h1" variant="h5">
                       Acesse sua Conta!
                   </Typography>
                   {erroMensagem !== '' && <Alert severity="error">{erroMensagem}</Alert>}
                   <form className={classes.form} onSubmit={handleSubmit(efetuaLogin)} noValidate>
                       <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            error={!!errors.email}
                            inputRef={register({
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                minLength: 6,
                                maxLength: 100
                            })}
                        />
                        {errors.email && <Alert severity="error">Email inválido</Alert>}
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
                                minLength: 8,
                                maxLength: 20
                            })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="role"
                            label="Role"
                            name="role"
                            autoComplete="role"
                            error={!!errors.role}
                            inputRef={register({
                                required: true,
                                minLength: 6,
                                maxLength: 100
                            })}
                        />

                    {(errors.password && errors.password.type === 'required') && <Alert severity="error">Informe a Senha</Alert>}
                    {(errors.password && errors.password.type === 'minLength') && (
                        <Alert severity="error">A Senha deve ter no mínimo 8 caracteres</Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disable={isLoading}
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>

                    <Box mt={5}>
                        <Copyright />
                    </Box>
                   </form> 
               </div>
           </Grid>
       </Grid> 
    )
}

export default Login;