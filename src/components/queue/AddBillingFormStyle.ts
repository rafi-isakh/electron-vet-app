import { makeStyles, createStyles, Theme } from "@material-ui/core";

const billingFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {  
        margin: '2.5%',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginLeft: 20
    },

    button: {
      margin: theme.spacing(1),
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'flex-end',
    },

    buttonItem: {
      marginLeft: 10
    },

    text: {
      marginRight: 10
    }
  }),
);

export default billingFormStyle;