import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";

import "../CSS/confirmModal.css"

const ConfirmModal = ({
  contentText,
  confirmText,
  open,
  setOpen,
  confirmClick,
  cancel,
}) => {
  return (
    <>
      <Dialog open={open} onClose={setOpen} className="confirmmodal">
        {contentText}
        <DialogContent>
          <DialogActions>
            <Button onClick={confirmClick} color="primary">
              {confirmText}
            </Button>
            <Button onClick={cancel} color="primary">
              გაუქმება
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
