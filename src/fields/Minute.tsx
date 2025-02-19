import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import CustomSelect from '../components/CustomSelect'
import {
  atEveryOptions,
  atOptionsNonAdmin,
  defaultMinuteOptions,
  defaultMinuteOptionsWithOrdinal,
  DEFAULT_MINUTE_OPTS,
} from '../constants'
import {
  isAdminState,
  localeState,
  minuteAtEveryState,
  minuteRangeEndSchedulerState,
  minuteRangeStartSchedulerState,
  minuteState,
} from '../store'

const useStyles = makeStyles({
  every: {
    minWidth: '100px',
    marginRight: '6px',
  },
  minute: {
    minWidth: '130px',
    maxWidth: '300px',
    marginRight: '6px',
  },
  betweenSelect: {
    minWidth: '90px',
    maxWidth: '90px',
    marginRight: '6px',
  },
  between: {
    margin: '8px 6px 0 0',
  },
})

export default function Minute() {
  const classes = useStyles()
  const [minuteAtEvery, setMinuteAtEvery] = useRecoilState(minuteAtEveryState)
  const [startMinute, setStartMinute] = useRecoilState(
    minuteRangeStartSchedulerState
  )
  const [endMinute, setEndMinute] = useRecoilState(minuteRangeEndSchedulerState)
  const [minute, setMinute] = useRecoilState(minuteState)
  const [minuteOptions, setMinuteOptions] = React.useState(DEFAULT_MINUTE_OPTS)

  const [possibleStartTimes, setPossibleStartTimes] = React.useState(
    defaultMinuteOptionsWithOrdinal()
  )

  const [possibleEndTimes, setPossibleEndTimes] = React.useState(
    defaultMinuteOptionsWithOrdinal()
  )

  React.useEffect(() => {
    const startIndex = possibleStartTimes.findIndex(
      (x) => x.value === startMinute.value
    )
    const limitedPossibleTimeRange = possibleEndTimes.map(
      (possibleEndTime, index) => ({
        ...possibleEndTime,
        disabled: index <= startIndex,
      })
    )
    setPossibleEndTimes(limitedPossibleTimeRange)
  }, [startMinute])

  React.useEffect(() => {
    const endIndex = possibleEndTimes.findIndex(
      (x) => x.value === endMinute.value
    )
    const limitedPossibleTimeRange = possibleStartTimes.map(
      (possibleStartTime, index) => ({
        ...possibleStartTime,
        disabled: index >= endIndex,
      })
    )
    setPossibleStartTimes(limitedPossibleTimeRange)
  }, [endMinute])

  const isAdmin = useRecoilValue(isAdminState)

  React.useEffect(() => {
    if (minuteAtEvery.value === 'every') {
      if (minute.length > 1) {
        setMinute([minuteOptions[1]])
      } else if (minute[0].value === '0') {
        setMinute([minuteOptions[1]])
      }
      setMinuteOptions((prevMinuteOptions) =>
        prevMinuteOptions.map((prevMinuteOption) => ({
          ...prevMinuteOption,
          ...(prevMinuteOption.value === '0' && { disabled: true }),
        }))
      )
    } else {
      setMinuteOptions(defaultMinuteOptions)
    }
  }, [minuteAtEvery, isAdmin])

  React.useEffect(() => {
    if (!isAdmin && minute.length > 1) {
      setMinute((prevMinute) => [prevMinute[0]])
    }
  }, [isAdmin])

  const resolvedLocale = useRecoilValue(localeState)

  return (
    <Box display='flex' sx={{display: 'none'}} pt={1} pb={1} mt={1} mb={1}>
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
        disableClearable
        value={minuteAtEvery}
        setValue={setMinuteAtEvery}
        multiple={false}
        classes={{
          root: clsx({
            [classes.every]: true,
          }),
        }}
      />
      <CustomSelect
        options={minuteOptions}
        label={resolvedLocale.minuteLabel}
        value={minute}
        setValue={setMinute}
        disableClearable={minuteAtEvery.value === 'every' || minute.length < 2}
        single={minuteAtEvery.value === 'every' || !isAdmin}
        sort
        disableEmpty
        disabled={minuteAtEvery.value === 'every' && !isAdmin}
        classes={{
          root: clsx({
            [classes.minute]: true,
          }),
        }}
        limitTags={3}
      />
      {minuteAtEvery.value === 'every' && (
        <>
          <Typography classes={{ root: classes.between }}>
            {resolvedLocale.betweenText}
          </Typography>
          <CustomSelect
            single
            options={possibleStartTimes}
            label={''}
            value={startMinute}
            setValue={setStartMinute}
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
            value={endMinute}
            setValue={setEndMinute}
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
