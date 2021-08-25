import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

const ForgotPasswordModal = ({
  toggleForgotPassword,
  handleSubmitResetLink,
  userEmail,
  handleChange,
}) => {
  return (
    <div>
      <Dialog
        open={toggleForgotPassword}
        onClose={toggleForgotPassword}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">პასვორდის განახლება</DialogTitle>
        <DialogContent>
          <DialogContentText>
            გთხოვთ შეიყვანოთ იმეილი, რომლითაც ხართ დარეგისტრირებული ჩვენს საიტზე
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="იმეილი"
            type="email"
            fullWidth
            name="email"
            value={userEmail}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForgotPassword} color="primary">
            გაუქმება
          </Button>
          <Button onClick={handleSubmitResetLink} color="primary">
            გაგზავნა
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordModal;
