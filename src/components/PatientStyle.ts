import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const patientPageStyle = makeStyles((theme: Theme) =>  
  createStyles({
    root: {
      padding: 50,
      marginTop: 50
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
    }
}));

export default patientPageStyle;
