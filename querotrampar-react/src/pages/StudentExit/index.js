import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            margiLeft: theme.spacing(2),
        },
    },
}));

const StudentExit = props => {

    const classes = useStyles();

    useEffect(() => {

        setTimeout(() => {
            localStorage.removeItem("user-querotrampar")
            props.history.push("/studentlogin");
        }, 3000);
    }, [])

    return(

        <Grid
        conatainer
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh'}}
    >

        <Grid item xs={3}>
            <CircularProgress color='primary' />
            <Typography component="h2" variant="h3" color="primary" gutterBottom>
                Saindo do Sistema
            </Typography>
        </Grid>
    </Grid>
    );
}

export default StudentExit;