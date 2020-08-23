import React, { useState, useEffect } from 'react';
import { DeadlineWarningInterface } from "../../interfaces";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { differenceInSeconds } from 'date-fns'
import { WARNING_TIME } from "../../helper/constants";
import { useStyles } from "./styles";

const DeadlineWarning = (props: DeadlineWarningInterface): JSX.Element | null => {
  const classes = useStyles();

  const { deadline } = props;
  const [warningState, setWarningState] = useState(false);
  const [timeDifferenceState, setTimeDifferenceState] = useState(differenceInSeconds(new Date(deadline), new Date()));
  let realTimeDifference = differenceInSeconds(new Date(deadline), new Date());

  useEffect(() => {
    setWarningState(false);
    setTimeDifferenceState(realTimeDifference);
    let intervalID: NodeJS.Timeout;
    if (realTimeDifference > WARNING_TIME) {
      intervalID = setInterval(() => {
        // eslint-disable-next-line
        realTimeDifference = realTimeDifference - 3;
        if (realTimeDifference >= 0 && realTimeDifference < WARNING_TIME && !warningState) {
          setWarningState(true);
          setTimeDifferenceState(realTimeDifference);
        }
        if (realTimeDifference < 0) {
          clearInterval(intervalID);
          setTimeDifferenceState(realTimeDifference);
        }
      }, 3000);
    } else if (realTimeDifference >= 0 && realTimeDifference < WARNING_TIME) {
      intervalID = setInterval(() => {
        // eslint-disable-next-line
        realTimeDifference = realTimeDifference - 3;
        if (realTimeDifference < 0) {
          clearInterval(intervalID);
          setTimeDifferenceState(realTimeDifference);
        }
      }, 3000);
    }

    return function cleanup() {
      clearInterval(intervalID);
    };
  }, [deadline]);

  if (timeDifferenceState >= 0 && timeDifferenceState < WARNING_TIME) {
    return (
      <div className={[classes.warningContainer, classes.warning].join(" ")}>
        <WarningRoundedIcon />
        <span>Soon to expired !</span>
      </div>
    );
  } else if (timeDifferenceState < 0) {
    return (
      <div className={[classes.warningContainer, classes.error].join(" ")}>
        <ErrorRoundedIcon />
        <span>This item is not done yet !!!</span>
      </div>
    );
  } else return null;
}

export default DeadlineWarning;
