import { makeStyles, createStyles, Theme } from "@material-ui/core";

const recordFormStyle = makeStyles((theme: Theme) =>
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

    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    chip: {
      margin: 2,
    },
  }),
);

export default recordFormStyle;