import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Box from '@mui/material/Box'
import CustomSelect from '../components/CustomSelect'
import { weekOptions as defaultWeekOptions } from '../constants'
import { localeState, weekState } from '../store'

const useStyles = makeStyles({
  week: {
    minWidth: '300px',
    maxWidth: '500px',
    marginRight: '6px',
  },
  on: {
    margin: '8.5px 6px 0 0',
  },
})

export default function Week() {
  const classes = useStyles()
  const [week, setWeek] = useRecoilState(weekState)
  const resolvedLocale = useRecoilValue(localeState)
  const [weekOptions, setWeekOptions] = React.useState(
    defaultWeekOptions(resolvedLocale.weekDaysOptions)
  )

  return (
    <Box display='flex' pt={1} pb={1} mt={1} mb={1}>
      <Typography classes={{ root: classes.on }}>
        {resolvedLocale.onText}
      </Typography>
      <CustomSelect
        options={weekOptions}
        label={resolvedLocale.dayOfWeekLabel}
        value={week}
        setValue={setWeek}
        disableClearable
        sort
        disableEmpty
        classes={{
          root: clsx({
            [classes.week]: true,
          }),
        }}
        limitTags={3}
      />
    </Box>
  )
}
