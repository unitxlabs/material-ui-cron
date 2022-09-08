import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import CustomSelect from '../components/CustomSelect'
import {
  atEveryOptions,
  defaultHourOptions,
  DEFAULT_HOUR_OPTS_AT,
} from '../constants'
import {
  hourRangeEndSchedulerState,
  hourRangeStartSchedulerState,
  hourState,
  isAdminState,
  localeState,
  hourAtEveryState,
} from '../store'
import { getTimesOfTheDay } from '../utils'

const POSSIBLE_TIME_RANGES = getTimesOfTheDay()

const useStyles = makeStyles({
  every: {
    minWidth: '100px',
    marginRight: '6px',
  },
  hour: {
    minWidth: '130px',
    maxWidth: '450px',
    marginRight: '6px',
  },
  betweenSelect: {
    minWidth: '130px',
    marginRight: '6px',
  },
  between: {
    margin: '8px 6px 0 0',
  },
})

export default function Hour() {
  const classes = useStyles()
  const resolvedLocale = useRecoilValue(localeState)
  const [hourAtEvery, setHourAtEvery] = useRecoilState(hourAtEveryState)
  const [startHour, setStartHour] = useRecoilState(hourRangeStartSchedulerState)
  const [endHour, setEndHour] = useRecoilState(hourRangeEndSchedulerState)
  const [hour, setHour] = useRecoilState(hourState)
  const [hourOptions, setHourOptions] = React.useState(defaultHourOptions)

  const [possibleStartTimes, setPossibleStartTimes] = React.useState(
    POSSIBLE_TIME_RANGES
  )

  const [possibleEndTimes, setPossibleEndTimes] = React.useState(
    POSSIBLE_TIME_RANGES
  )

  React.useEffect(() => {
    const startIndex = possibleStartTimes.findIndex(
      (x) => x.value === startHour.value
    )
    const limitedPossibleTimeRange = possibleEndTimes.map(
      (possibleEndTime, index) => ({
        ...possibleEndTime,
        disabled: index <= startIndex,
      })
    )
    setPossibleEndTimes(limitedPossibleTimeRange)
  }, [startHour])

  React.useEffect(() => {
    const endIndex = possibleEndTimes.findIndex(
      (x) => x.value === endHour.value
    )
    const limitedPossibleTimeRange = possibleStartTimes.map(
      (possibleStartTime, index) => ({
        ...possibleStartTime,
        disabled: index >= endIndex,
      })
    )
    setPossibleStartTimes(limitedPossibleTimeRange)
  }, [endHour])

  const isAdmin = useRecoilValue(isAdminState)

  React.useEffect(() => {
    setHourAtEvery(atEveryOptions(resolvedLocale.atOptionLabel)[0]);
  }, [resolvedLocale]);

  React.useEffect(() => {
    setHourOptions(DEFAULT_HOUR_OPTS_AT)
  }, [hourAtEvery])

  React.useEffect(() => {
    if (!isAdmin && hour.length > 1) {
      setHour((prevHour) => [prevHour[0]])
    }
  }, [isAdmin])

  return (
    <Box display='flex' pt={1} pb={1} mt={1} mb={1}>
      <CustomSelect
        single
        options={
          atEveryOptions(
            resolvedLocale.atOptionLabel,
          )
        }
        label={resolvedLocale.atEveryText}
        value={hourAtEvery}
        setValue={setHourAtEvery}
        multiple={false}
        disableClearable
        classes={{
          root: clsx({
            [classes.every]: true,
          }),
        }}
      />
      <CustomSelect
        options={hourOptions}
        label={resolvedLocale.hourLabel}
        value={hour}
        setValue={setHour}
        sort
        limitTags={3}
        classes={{
          root: clsx({
            [classes.hour]: true,
          }),
        }}
      />
    </Box>
  )
}
