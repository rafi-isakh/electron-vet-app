import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const addQueueDialogStyle = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },

  dialogTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  dialogTitleIcon: {
    marginRight: '15px'
  }
});

export default addQueueDialogStyle;