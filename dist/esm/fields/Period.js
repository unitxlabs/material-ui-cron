import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CustomSelect from '../components/CustomSelect';
import { getPeriodOptions, getPeriodOptionsWithHourDisabled } from '../constants';
import { isAdminState, localeState, periodState } from '../store';
const useStyles = makeStyles({
  period: {
    minWidth: 200,
    marginRight: '6px',
    maxWidth: 200
  },
  every: {
    margin: '0 5px 0 0'
  }
});
export default function Period() {
  const [period, setPeriod] = useRecoilState(periodState);
  const classes = useStyles();
  const isAdmin = useRecoilValue(isAdminState);
  const resolvedLocale = useRecoilValue(localeState);
  return React.createElement(Box, {
    display: "flex",
    pt: 1,
    pb: 1,
    mt: 1,
    mb: 1
  }, React.createElement(Typography, {
    classes: {
      root: classes.every
    },
    mr: 0.625,
    style: {
      alignSelf: 'center',
      visibility: 'visible',
      maxWidth: 'none',
      height: 'auto'
    }
  }, resolvedLocale.everyText), React.createElement(CustomSelect, {
    single: true,
    disableClearable: true,
    options: isAdmin ? getPeriodOptions(resolvedLocale.periodOptions) : getPeriodOptionsWithHourDisabled(resolvedLocale.periodOptions),
    label: resolvedLocale.periodLabel,
    value: period,
    setValue: setPeriod,
    multiple: false,
    classes: {
      root: clsx({
        [classes.period]: true
      })
    }
  }));
}