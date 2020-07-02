import { makeStyles, Theme } from "@material-ui/core";

const detailTabStyle = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  table: {
    minWidth: 650,
  },

  input: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default detailTabStyle;