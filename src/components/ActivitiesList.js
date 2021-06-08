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
  const [activitiesList, setActivitiesList] = useState([]);
  const [anActivity, setAnActivity] = useState('')

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
      return data
    } catch (err) {
      throw err;
    }
  };

    useEffect(() => {
        fetchAllActivities()
            .then((activitiesList) => {
                setActivitiesList(activitiesList);
                console.log(activitiesList);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [setActivitiesList]);




  const handleChange = (event) => {
    setAnActivity(event.target.value);
  };

  return (
    <fieldset>
                    <label htmlFor="select-century">
                        Activity{" "}
                    </label>
                    <select
                        name="century"
                        id="select-century"
                        value={anActivity}
                        onChange={(event) => {
                            setAnActivity(event.target.value);
                        }}
                    >
                        <option value="Any">Any</option>
                        {activitiesList.map((activity) => (
                            <option
                                key={`${activity.id}+${activity.name}`}
                                value={activity.name}
                            >
                                {activity.name}
                            </option>
                        ))}
                    </select>
                </fieldset>
  );
};

export default ActivitiesList;
