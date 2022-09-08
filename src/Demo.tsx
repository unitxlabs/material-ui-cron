import Scheduler from ".Scheduler";
import React from "react";
import Dialog from '@material-ui/core/Dialog';

export default function DemoAuto() {
    const [open, setOpen] = React.useState(false);
    const [cronExp, setCronExp] = React.useState("0 0 * * *");
    const [cronError, setCronError] = React.useState(""); // get error message if cron is invalid
    const [isAdmin, setIsAdmin] = React.useState(true); // set admin or non-admin to enable or disable high frequency scheduling (more than once a day)
    React.useEffect(() => {
        setCronExp("* * * * *");
      }, [cronExp]);

    const handleClose = () => {
    setOpen(false);
    };

    return (
    <Dialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    fullWidth
    maxWidth={'md'}
    >
        <Scheduler
        cron={cronExp}
        setCron={setCronExp}
        setCronError={setCronError}
        isAdmin={isAdmin}
        />
    </Dialog>

    );
}
