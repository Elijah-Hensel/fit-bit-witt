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
import getActivities from "../functions/getActivities";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const ActivityRow = ({ activity: { id, name, description } }) => {
  const [activityName, setActivityName] = useState(name);
  const [activityDescription, setActivityDescription] = useState(description);
  const [activityId, setActivityId] = useState(id);
  const [editMode, setEditMode] = useState(false);
  const columns = [
    { id: "name", label: "Name", minWidth: 100, maxWidth: 150 },
    { id: "description", label: "Description", minWidth: 100, maxWidth: 500 },
  ];
  //   setAllActivities(getActivities());

  const onEdit = () => {
    setEditMode(true);
  };

  return (
        <TableRow hover role="checkbox" tabIndex={-1} key={id}>   
              <TableCell
                style={{ fontWeight: "bold" }}
                key={id}
                align="left"
              >
                  {name}
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold" }}
                key={id}
                align="left"
              >
                  {description}
              </TableCell>
      </TableRow>
  );
};

export default ActivityRow;
