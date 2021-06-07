import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ActivitiesList = () => {
  const classes = useStyles();
  const [allActivities, setAllActivities] = useState([]);
  const [activity, setActivity] = useState("");

  const fetchAllActivities = async () => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/activities",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAllActivities(data)
    } catch (err) {
      throw err;
    }
  };



  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Activity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activity}
          onChange={handleChange}
        >
          {allActivities.map((activity) => {
                return <MenuItem value={activity.id}>{activity}</MenuItem>;
              })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ActivitiesList;
