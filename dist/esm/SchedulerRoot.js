import React from 'react';
import { RecoilRoot } from '@timiscoding/recoil';
import Scheduler from './Scheduler';
export default function SchedulerRoot(props) {
  return React.createElement(RecoilRoot, null, React.createElement(Scheduler, props));
}