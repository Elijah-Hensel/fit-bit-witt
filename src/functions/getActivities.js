const getActivities = async () => {
    try {
      const response = await fetch(
        "https://fitnesstrac-kr.herokuapp.com/api/activities",
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

  export default getActivities;