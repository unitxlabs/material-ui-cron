function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CustomSelect from '../components/CustomSelect';
import { atEveryOptions, defaultHourOptions } from '../constants';
import { hourRangeEndSchedulerState, hourRangeStartSchedulerState, hourState, isAdminState, localeState, hourAtEveryState } from '../store';
import { getTimesOfTheDay } from '../utils';
const POSSIBLE_TIME_RANGES = getTimesOfTheDay();
const useStyles = makeStyles({
  every: {
    marginRight: '6px'
  },
  hour: {
    "& .MuiFormControl-root": {
      "& .MuiInputLabel-root": {
        lineHeight: 'normal'
      }
    },
    minWidth: '130px',
    maxWidth: '450px',
    marginRight: '6px'
  },
  betweenSelect: {
    minWidth: '130px',
    marginRight: '6px'
  },
  between: {
    margin: '8px 6px 0 0'
  }
});
export default function Hour() {
  const classes = useStyles();
  const resolvedLocale = useRecoilValue(localeState);
  const [hourAtEvery, setHourAtEvery] = useRecoilState(hourAtEveryState);
  const [startHour, setStartHour] = useRecoilState(hourRangeStartSchedulerState);
  const [endHour, setEndHour] = useRecoilState(hourRangeEndSchedulerState);
  const [hour, setHour] = useRecoilState(hourState);
  const [hourOptions, setHourOptions] = React.useState(defaultHourOptions);
  const [possibleStartTimes, setPossibleStartTimes] = React.useState(POSSIBLE_TIME_RANGES);
  const [possibleEndTimes, setPossibleEndTimes] = React.useState(POSSIBLE_TIME_RANGES);
  React.useEffect(() => {
    const startIndex = possibleStartTimes.findIndex(x => x.value === startHour.value);
    const limitedPossibleTimeRange = possibleEndTimes.map((possibleEndTime, index) => _objectSpread(_objectSpread({}, possibleEndTime), {}, {
      disabled: index <= startIndex
    }));
    setPossibleEndTimes(limitedPossibleTimeRange);
  }, [startHour]);
  React.useEffect(() => {
    const endIndex = possibleEndTimes.findIndex(x => x.value === endHour.value);
    const limitedPossibleTimeRange = possibleStartTimes.map((possibleStartTime, index) => _objectSpread(_objectSpread({}, possibleStartTime), {}, {
      disabled: index >= endIndex
    }));
    setPossibleStartTimes(limitedPossibleTimeRange);
  }, [endHour]);
  const isAdmin = useRecoilValue(isAdminState);
  React.useEffect(() => {
    setHourAtEvery(atEveryOptions(resolvedLocale.atOptionLabel, resolvedLocale.everyOptionLabel)[0]);
  }, [resolvedLocale]);
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
  }, resolvedLocale.atEveryText), React.createElement(CustomSelect, {
    options: hourOptions,
    label: resolvedLocale.hourLabel,
    value: hour,
    setValue: setHour,
    sort: true,
    disableEmpty: true,
    limitTags: 3,
    disableClearable: hourAtEvery.value === 'every' || hour.length < 2,
    disabled: !isAdmin && hourAtEvery.value === 'every',
    classes: {
      root: clsx({
        [classes.hour]: true
      })
    }
  }));
}