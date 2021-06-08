import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ActivitiesList from "./ActivitiesList";

const CreateRoutineModal = () => {
  const [newRoutine, setNewRoutine] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [routinePublic, setRoutinePublic] = useState(true);
  const [open, setOpen] = useState(false);
  const [allActivities, setAllActivities] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    setRoutineName("");
    setRoutineGoal("");
  };

  const onFormSubmit = async () => {
    await createRoutine();
    setOpen(false);
  };

  const handleChange = (event) => {
    setRoutinePublic({
      ...routinePublic,
      [event.target.name]: event.target.checked,
    });
  };

  const createRoutine = async () => {
    const myToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://fitnesstrac-kr.herokuapp.com/api/routines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
          body: JSON.stringify({
            name: routineName,
            goal: routineGoal,
            isPublic: routinePublic,
          }),
        }
      );
      const data = await response.json();
      setNewRoutine(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Create Routine</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ color: "white" }} id="form-dialog-title">
          Your Routine
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "left" }}>
            <p style={{ margin: 2, color: "white" }}>
              Create a new routine full of work out activities curated{" "}
            </p>
            <p style={{ margin: 2 }}>
              <b>by you, for you</b>
            </p>
          </DialogContentText>
        </DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Routine Name"
          type="text"
          value={routineName}
          onChange={(event) => {
            setRoutineName(event.target.value);
          }}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Routine Goal"
          type="text"
          value={routineGoal}
          onChange={(event) => {
            setRoutineGoal(event.target.value);
          }}
          fullWidth
        />
        <ActivitiesList />
        <FormControlLabel
          control={
            <Checkbox
              checked={routinePublic}
              onChange={handleChange}
              name="isPublic"
            />
          }
          label="Make Public?"
          style={{ color: "white" }}
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onFormSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateRoutineModal;
