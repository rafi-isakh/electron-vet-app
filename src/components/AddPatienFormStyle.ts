import { makeStyles, Theme, createStyles } from "@material-ui/core";

const patientFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: '2.5%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },

    button: {
      margin: theme.spacing(1),
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'flex-end',
    },

    buttonItem: {
      marginLeft: 10
    }
  }),
);

export default patientFormStyle;