import { PRIMARY_TEXT_COLOR, WARNING_COLOR, ERROR_COLOR } from "../../styles/constants";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "60%",
    margin: "20px 0 0",
    padding: '20px 30px',
    color: PRIMARY_TEXT_COLOR,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    borderRadius: 5,
  },
  done: {
    textDecoration: "line-through",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px"
  },
  content: {
    marginLeft: "50px",
    width: "75%",
    wordBreak: "break-word"
  },
  input: {
    width: "100%"
  },
  deleteIcon: {
    position: "absolute",
    right: -3,
    top: -3
  },
  timePicker: {
    margin: "20px 0 0 "
  },
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
