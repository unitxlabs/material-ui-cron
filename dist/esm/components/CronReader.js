import { makeStyles, createStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import cronstrue from 'cronstrue/i18n';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { cronExpState } from '../selector';
import { localeState } from '../store';
const useStyles = makeStyles(() => createStyles({
  error: {
    color: 'red'
  }
}));
export default function CronReader() {
  const cronExp = useRecoilValue(cronExpState);
  const resolvedLocale = useRecoilValue(localeState);
  return React.createElement(Box, {
    display: "flex",
    pt: 1,
    pb: 1,
    mt: 1,
    mb: 1
  }, React.createElement(Typography, {
    variant: "h6",
    style: {
      color: '#382B5F'
    }
  }, cronstrue.toString(cronExp, {
    locale: resolvedLocale.cronDescriptionText
  })));
}