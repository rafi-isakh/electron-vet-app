import { makeStyles, Theme } from "@material-ui/core";

const detailTabStyle = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  table: {
    minWidth: 650,
  },
}));

export default detailTabStyle;