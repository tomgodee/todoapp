import { WARNING_COLOR, ERROR_COLOR } from "../../styles/constants";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  warningContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0 0 ",
  },
  warning: {
    color: WARNING_COLOR
  },
  error: {
    color: ERROR_COLOR
  }
});
