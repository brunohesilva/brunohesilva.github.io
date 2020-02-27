import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#026279',
        },
        secondary: {
            main: '#7D707D',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#026279',
        },
    },
});

export default theme;