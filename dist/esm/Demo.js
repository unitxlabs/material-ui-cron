import Scheduler from ".Scheduler";
import React from "react";
import Dialog from '@material-ui/core/Dialog';
export default function DemoAuto() {
  const [open, setOpen] = React.useState(false);
  const [cronExp, setCronExp] = React.useState("0 0 * * *");
  const [cronError, setCronError] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(true);
  React.useEffect(() => {
    setCronExp("* * * * *");
  }, [cronExp]);

  const handleClose = () => {
    setOpen(false);
  };

  return React.createElement(Dialog, {
    onClose: handleClose,
    "aria-labelledby": "customized-dialog-title",
    open: open,
    fullWidth: true,
    maxWidth: 'md'
  }, React.createElement(Scheduler, {
    cron: cronExp,
    setCron: setCronExp,
    setCronError: setCronError,
    isAdmin: isAdmin
  }));
}