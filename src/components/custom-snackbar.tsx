import React from 'react';
import { IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';

interface ICustomSnackBarProps {
  message: string;
  success: boolean;
  closeSnackBar: () => void;
}

const useStyle = makeStyles({
  snackBarError: {
    backgroundColor: `red`,
  },
  snackBarSuccess: {
    backgroundColor: `green`,
  },
});
const CustomSnackbar = (props: ICustomSnackBarProps) => {
  const { message, success, closeSnackBar } = props;
  const styles = useStyle();

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      message={message}
      anchorOrigin={{ vertical: `top`, horizontal: `right` }}
      className={success ? styles.snackBarSuccess : styles.snackBarError}
      onClick={closeSnackBar}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackBar}
        >
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};
export default CustomSnackbar;
