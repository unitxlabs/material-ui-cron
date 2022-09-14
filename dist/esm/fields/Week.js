import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Box from '@material-ui/core/Box';
import CustomSelect from '../components/CustomSelect';
import { weekOptions as defaultWeekOptions } from '../constants';
import { localeState, weekState } from '../store';
const useStyles = makeStyles({
  week: {
    "& .MuiFormControl-root": {
      "& .MuiInputLabel-root": {
        lineHeight: 'normal'
      }
    },
    minWidth: '300px',
    maxWidth: '500px',
    marginRight: '6px'
  },
  on: {
    margin: '0 6px 0 0'
  }
});
export default function Week() {
  const classes = useStyles();
  const [week, setWeek] = useRecoilState(weekState);
  const resolvedLocale = useRecoilValue(localeState);
  const [weekOptions, setWeekOptions] = React.useState(defaultWeekOptions(resolvedLocale.weekDaysOptions));
  React.useEffect(() => {
    const days = week.map(day => day.value);
    let translatedWeek = [];

    for (const opt of defaultWeekOptions(resolvedLocale.weekDaysOptions)) {
      if (days.includes(opt.value)) {
        translatedWeek.push(opt);
      }
    }

    setWeek(translatedWeek);
  }, [resolvedLocale]);
  return React.createElement(Box, {
    display: "flex",
    pt: 1,
    pb: 1,
    mt: 1,
    mb: 1
  }, React.createElement(Typography, {
    classes: {
      root: classes.on
    },
    mr: 0.625,
    style: {
      alignSelf: 'center',
      visibility: 'visible',
      maxWidth: 'none',
      height: 'auto'
    }
  }, resolvedLocale.onText), React.createElement(CustomSelect, {
    options: weekOptions,
    label: resolvedLocale.dayOfWeekLabel,
    value: week,
    setValue: setWeek,
    disableClearable: true,
    sort: true,
    disableEmpty: true,
    classes: {
      root: clsx({
        [classes.week]: true
      })
    },
    limitTags: 3
  }));
}