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
  routine: { id, name, goal, creatorName, isPublic, activities }
}) => {
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [routineCreator, setRoutineCreator] = useState(creatorName)
  const [allRoutines, setAllRoutines] = useState([])

  

  return isPublic ? (
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
      <TableCell style={{ fontWeight: "bold" }} align="left">
          {name}
      </TableCell>
      <TableCell style={{}} align="left">
        {goal}
      </TableCell>
      <TableCell style={{}} align="left">
        {creatorName}
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
