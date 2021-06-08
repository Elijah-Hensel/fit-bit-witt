import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  DeleteForeverOutlined as DeleteIcon,
  SaveAltOutlined as SaveIcon,
  EditOutlined as EditIcon,
} from "@material-ui/icons";
import getMyRoutines from "../functions/getMyRoutines";
import ActivitiesList from "./ActivitiesList";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const MyRoutinesRow = ({
  routine: { id, name, goal, creatorName, isPublic }, onRemoveRoutine
}) => {
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [editMode, setEditMode] = useState(false);
  const [userRoutines, setUserRoutines] = useState([])
  const TOKEN = localStorage.getItem("token");

  useEffect(async () => {
    const routines = await getMyRoutines();
    setUserRoutines(routines)
  }, [userRoutines])

  const onEdit = () => {
    setEditMode(true);
  };

  const onSave = async (id) => {
    setEditMode(false);
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            name: routineName,
            goal: routineGoal,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    } finally {
        const routines = await getMyRoutines();
        setUserRoutines(routines)
    }
  };

  const onDelete = async (id) => {
    try {
        const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        }
        )
        const data = response.json()
        return data
    } catch (err) {
      throw err;
    }
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
      <TableCell style={{ fontWeight: "bold" }} align="left">
        {editMode ? (
          <TextField
            value={routineName}
            onChange={(event) => {
              setRoutineName(event.target.value);
            }}
          />
        ) : (
          name
        )}
      </TableCell>
      <TableCell style={{}} align="left">
        {editMode ? (
          <TextField
            value={routineGoal}
            onChange={(event) => {
              setRoutineGoal(event.target.value);
            }}
          />
        ) : (
          goal
        )}
      </TableCell>
      <TableCell style={{}} align="left">
        {isPublic ? <p>yes</p> : <p>no</p>}
      </TableCell>
      <TableCell style={{ fontSize: "small" }} align="right">
        {editMode ? (
          <SaveIcon
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              onSave(id);
            }}
          />
        ) : (
          <EditIcon style={{ cursor: "pointer" }} onClick={onEdit} />
        )}
        {<DeleteIcon onClick={(e) => {
          onRemoveRoutine(0)
            onDelete(id);
        }} />}
              <TableCell style={{}} align="left">
        {editMode ? <ActivitiesList /> : null}
      </TableCell>
      </TableCell>
    </TableRow>
  );
};

export default MyRoutinesRow;
