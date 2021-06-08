const TOKEN = localStorage.getItem("token");

const getMe = async () => {
  try {
    const response = await fetch(
      "https://fitnesstrac-kr.herokuapp.com/api/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const getMyRoutines = async () => {
  const { username } = await getMe();
  try {
    const response = await fetch(
      `https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data
  } catch (err) {
    throw err;
  }
};

export default getMyRoutines;
