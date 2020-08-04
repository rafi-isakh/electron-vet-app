import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const medicalRecordStyle = makeStyles((theme: Theme) =>  
  createStyles({
    root: {
      padding: 50,
      marginTop: 50,
      display: 'flex',
      flexWrap: 'wrap'
    },

    shiftRight: {
      padding: 50,
      marginTop: 50,
      marginLeft: 240
    },

    table: {
      minWidth: 650,
    },
    
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    button: {
      margin: theme.spacing(1),
      marginBottom: 15,
      flex: '50%',
      textAlign: 'right'
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
