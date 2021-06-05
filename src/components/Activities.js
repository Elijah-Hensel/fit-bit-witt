import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  DeleteForeverOutlined as DeleteIcon,
  SaveAltOutlined as SaveIcon,
  EditOutlined as EditIcon,
} from "@material-ui/icons";
import ActivityRow from "./ActivitiesRow";
import getActivities from "../functions/getActivities";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Activities = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allActivities, setAllActivities] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const activities = async () => {
    try {
      const activitiesGrabbed = await getActivities();
      setAllActivities(activitiesGrabbed);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    activities();
  }, [allActivities]);

  const columns = [
    { id: "name", label: "Name", minWidth: 100, maxWidth: 150 },
    { id: "description", label: "Description", minWidth: 100, maxWidth: 500 },
  ];

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>ACTIVITIES</h1>
        <Paper className={classes.root}>
          <div className="container-class">
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => {
                      return (
                        <>
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontWeight: "bold",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allActivities
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return <ActivityRow key={row.id} activity={row} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allActivities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default Activities;
