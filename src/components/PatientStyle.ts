import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const patientPageStyle = makeStyles((theme: Theme) =>  
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
}));

export default patientPageStyle;
