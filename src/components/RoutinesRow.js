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


const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const RoutinesRow = ({
  routine: { id, name, goal, creatorName, isPublic, activities }, onRemoveRoutine
}) => {
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [routineCreator, setRoutineCreator] = useState(creatorName)
  const [allRoutines, setAllRoutines] = useState([])
  const TOKEN = localStorage.getItem("token");

  const fetchPublicRoutines = async () => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAllRoutines(data);
    } catch (err) {
      throw err;
    }
  };
  

  return isPublic ? (
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
      <TableCell style={{ fontWeight: "bold" }} align="left">
          {name}
      </TableCell>
      <TableCell style={{}} align="left">
        {goal}
      </TableCell>
      <TableCell style={{}} align="left">
        {routineCreator}
      </TableCell>
      <TableCell style={{ fontSize: "small" }} align="right">
          <ul>
          {activities.length > 1 ? activities.map((activity) => {
                return <li style={{textAlign:"left"}}>{activity.name}</li>
                
            }) : "N/A"}
            </ul>
      </TableCell>
    </TableRow>
  ) : null;
};

export default RoutinesRow;
