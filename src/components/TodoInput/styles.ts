import { WHITE_COLOR } from "../../styles/constants";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  addTodo: {
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
    padding: '20px 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    borderRadius: 5,
    borderColor: WHITE_COLOR,
    border: "4px solid"
  },
  input: {
    width: "80%"
  }
});
