import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import CustomSelect from '../components/CustomSelect'
import {
  atEveryOptions,
  atOptionsNonAdmin,
  defaultHourOptions,
  DEFAULT_HOUR_OPTS_AT,
  DEFAULT_HOUR_OPTS_EVERY,
} from '../constants'
import {
  hourAtEveryState,
  hourRangeEndSchedulerState,
  hourRangeStartSchedulerState,
  hourState,
  isAdminState,
  localeState,
} from '../store'
import { getTimesOfTheDay } from '../utils'
import { resolve } from 'dns'

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
  const isAdmin = useRecoilValue(isAdminState)
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

  React.useEffect(() => {
    if (hourAtEvery.label !== resolvedLocale.atOptionLabel || hourAtEvery.label !== resolvedLocale.everyOptionLabel) {
      setHourAtEvery(atEveryOptions(resolvedLocale.atOptionLabel, resolvedLocale.everyOptionLabel)[0]);
    }
    if (hourAtEvery.value === 'every') {
      if (hour.length > 1) {
        setHour([hourOptions[1]])
      } else if (hour[0].value === '0') {
        setHour([hourOptions[1]])
      }
      setHourOptions(DEFAULT_HOUR_OPTS_EVERY)
    } else {
      setHourOptions(DEFAULT_HOUR_OPTS_AT)
    }
  }, [hourAtEvery, isAdmin])

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
          isAdmin
            ? atEveryOptions(
                resolvedLocale.atOptionLabel,
                resolvedLocale.everyOptionLabel
              )
            : atOptionsNonAdmin(
                resolvedLocale.atOptionLabel,
                resolvedLocale.everyOptionLabel
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
        single={hourAtEvery.value === 'every' || !isAdmin}
        sort
        disableEmpty
        limitTags={3}
        disableClearable={hourAtEvery.value === 'every' || hour.length < 2}
        disabled={!isAdmin && hourAtEvery.value === 'every'}
        classes={{
          root: clsx({
            [classes.hour]: true,
          }),
        }}
      />
      {hourAtEvery.value === 'every' && (
        <>
          <Typography classes={{ root: classes.between }}>
            {resolvedLocale.betweenText}
          </Typography>
          <CustomSelect
            single
            options={possibleStartTimes}
            label={''}
            value={startHour}
            setValue={setStartHour}
            multiple={false}
            disableClearable
            classes={{
              root: clsx({
                [classes.betweenSelect]: true,
              }),
            }}
            disabled={!isAdmin}
          />
          <Typography classes={{ root: classes.between }}>
            {resolvedLocale.andText}
          </Typography>
          <CustomSelect
            single
            options={possibleEndTimes}
            label={''}
            value={endHour}
            setValue={setEndHour}
            multiple={false}
            disableClearable
            classes={{
              root: clsx({
                [classes.betweenSelect]: true,
              }),
            }}
            disabled={!isAdmin}
          />
        </>
      )}
    </Box>
  )
}
