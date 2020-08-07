import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const medicalRecordStyle = makeStyles((theme: Theme) =>  
  createStyles({
    root: {
      padding: 50,
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column'
    },

    shiftRight: {
      padding: 50,
      marginTop: 50,
      marginLeft: 240,
      display: 'flex',
      flexDirection: 'column'
    },

    table: {
      minWidth: 650,
    },
    
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      marginBottom: 40
    },

    button: {
      margin: theme.spacing(1),
      marginTop: 15,
      flex: '50%',
      textAlign: 'right'
    },

    button2: {
      marginTop: 15,
      textAlign: 'left'
    },

    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },

    iconButton: {
      padding: 10,
    },
    
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      width: '25%',
    },

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      '& > *': {  
        margin: '2.5%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
}));

export default medicalRecordStyle;
