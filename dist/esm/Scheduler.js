import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import CronExp from './components/CronExp';
import CronReader from './components/CronReader';
import DayOfMonth from './fields/DayOfMonth';
import Hour from './fields/Hour';
import Month from './fields/Month';
import Period from './fields/Period';
import Week from './fields/Week';
import { supportedLanguages } from './i18n';
import { cronExpState } from './selector';
import { cronExpInputState, cronValidationErrorMessageState, dayOfMonthState, hourState, isAdminState, localeState, monthState, periodState, weekState } from './store';
import { getPeriodIndex } from './utils';
const useStyles = makeStyles({
  box: {
    minHeight: 'min-content'
  }
});
export default function Scheduler(props) {
  const {
    cron,
    setCron,
    setCronError,
    isAdmin,
    locale,
    customLocale
  } = props;
  const classes = useStyles();
  const period = useRecoilValue(periodState);
  const [periodIndex, setPeriodIndex] = React.useState(0);
  const setCronExp = useSetRecoilState(cronExpState);
  const cronError = useRecoilValue(cronValidationErrorMessageState);
  const setIsAdmin = useSetRecoilState(isAdminState);
  const [cronExpInput, setCronExpInput] = useRecoilState(cronExpInputState);
  const setResolvedLocale = useSetRecoilState(localeState);
  const resetCronExpInput = useResetRecoilState(cronExpInputState);
  const resetHour = useResetRecoilState(hourState);
  const resetDayOfMonth = useResetRecoilState(dayOfMonthState);
  const resetDayOfWeek = useResetRecoilState(weekState);
  const resetMonth = useResetRecoilState(monthState);
  const resetPeriod = useResetRecoilState(periodState);
  React.useEffect(() => {
    setCronError(cronError);
  }, [cronError]);
  React.useEffect(() => {
    setPeriodIndex(getPeriodIndex(period));
  }, [period]);
  React.useEffect(() => {
    if (isAdmin) {
      setIsAdmin(isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [isAdmin]);
  React.useEffect(() => {
    setCronExpInput(cron);
    return () => {
      setCronExp('0 0 * * 1-5');
      resetCronExpInput();
      resetHour();
      resetDayOfMonth();
      resetDayOfWeek();
      resetMonth();
      resetPeriod();
    };
  }, [cron]);
  React.useEffect(() => {
    if (customLocale) {
      setResolvedLocale(customLocale);
    } else if (locale) {
      setResolvedLocale(supportedLanguages[locale]);
    } else {
      setResolvedLocale(supportedLanguages['en']);
    }
  }, []);
  return React.createElement(React.Fragment, null, React.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    className: classes.box,
    style: {
      position: 'relative',
      borderStyle: 'none',
      paddingLeft: '0px'
    }
  }, React.createElement(Period, null), periodIndex > 3 && React.createElement(Month, null), periodIndex > 2 && React.createElement(DayOfMonth, null), periodIndex > 1 && React.createElement(Week, null), periodIndex > 0 && React.createElement(Hour, null), React.createElement(CronExp, null), React.createElement(CronReader, null)));
}