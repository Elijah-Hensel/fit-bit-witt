import React, { useState, useEffect } from "react";
import axios from "axios";
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
import MyRoutinesRow from "./MyRoutinesRow";
import CreateRoutineModal from "./CreateRoutineModal"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const myUsernameFetch = async (myToken) => {
  try {
    return axios
      .get(`https://fitnesstrac-kr.herokuapp.com/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then(({ data: { username } }) => {
        return username;
      });
  } catch (err) {
    console.error(err);
  }
};

const myRoutinesFetch = async (username, myToken) => {
  try {
    return axios
      .get(
        `https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(({ data }) => {
        return data;
      });
  } catch (err) {
    console.error(err);
  }
};

const MyRoutines = () => {
  const classes = useStyles();
  const [userRoutines, setUserRoutines] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editMode, setEditMode] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState('')
  let myUsername;

  // useEffect(async () => {
  //   const myToken = localStorage.getItem("token");
  //   if (myToken) {
  //     setIsLogged(true);
  //     myUsername = await myUsernameFetch(myToken);
  //     const routines = await myRoutinesFetch(myUsername, myToken);
  //     setUserRoutines(routines);
  //   }
  // }, []);

  useEffect(() => {
        const myToken = localStorage.getItem('token');
        setToken(myToken)
        if (myToken) {
            const fetchData = async () => {

                let myUsername;

                try {
                    myUsername = await myUsernameFetch(myToken);
                    const routines = await myRoutinesFetch(myUsername, myToken);
                    setUserRoutines(routines);

                } catch (error) {
                    console.error(error)
                }
            };

            fetchData();
        }

    }, [token]);

  // useEffect(() => {
  //   getMyRoutines();
  // },[userRoutines])

  const columns = [
    { id: "name", label: "Name", minWidth: 100, maxWidth: 150 },
    { id: "description", label: "Description", minWidth: 100, maxWidth: 500 },
    { id: "isPublic", label: "Public Post?", minWidth: 100, maxWidth: 150 },
  ];

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const copy = [...userRoutines];

  const onRemoveRoutine = (idx) => {
    copy.splice(idx, 1);
    setUserRoutines(copy);
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
        <h1>MY ROUTINES</h1>
        <Paper className={classes.root}>
          {/* {userRoutines.length > 1 ? ( */}
            <>
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
                                align="left"
                                style={{
                                  minWidth: column.minWidth,
                                  fontWeight: "bold",
                                  textAlign: "left",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            </>
                          );
                        })}
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userRoutines ? 
                      userRoutines
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return <MyRoutinesRow key={row.name} onRemoveRoutine={onRemoveRoutine} routine={row} />;
                        }) : "CREATE A NEW ROUTINE"}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={userRoutines.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          
{/*           
          // ) : (
          //   <div style={{display:"flex", flexDirection:"column", alignItems:"center", color:"white", fontWeight:"bold"}}>
          //     <p>Create Your First Routine!</p>
          //     <CreateRoutineModal />
          //   </div>
          // )} */}
        </Paper>
      </div>
    </>
  );
};

// return (
//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell align="right">ID</TableCell>
//           <TableCell align="right">Name</TableCell>
//           <TableCell align="right">Goal</TableCell>
//           <TableCell align="right">Creator Name</TableCell>
//           <TableCell align="right">Is Public</TableCell>
//           <TableCell align="right"></TableCell>
//           <TableCell align="right"></TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {userRoutines.map((routine, idx) => {
//           return (
//             <MyRoutinesRow
//               key={routine.id}
//               routine={routine}
//               // onRemoveRoutine={() => {
//               //   onRemoveRoutine(idx);
//               // }}
//             />
//           );
//         })}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );
// };

export default MyRoutines;
