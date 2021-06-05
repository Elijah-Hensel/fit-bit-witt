const createRoutine = async () => {
  const TOKEN = localStorage.getItem("token")
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          name: "Eat your weight in hotdogs",
          goal: "To make your body physically big as hell!",
          isPublic: true,
        }),
      }
    );
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    throw err;
  }
};

export default createRoutine;
