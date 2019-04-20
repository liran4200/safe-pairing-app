import axios from 'axios';

const BASE_URL = "http://localhost:4444/api/users";

const getRequest = (addUrl, token) => ({
  method: 'get',
  headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
  },
  url: BASE_URL + addUrl,
})

export const searchUser = async (searchText, token) => {
  try {
    const res = await axios(getRequest(`/search?keyWord=${searchText}&pageNumber=1&pageSize=5`,token));
    let arrayToReturn = res.data;
    arrayToReturn = arrayToReturn.map(user => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user._id
      }
    })
    return arrayToReturn;
  } catch (error) {
      console.log("error in searchUser call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while searching for a user"
  }
}

export const registerUser = async (user) => {
    try {
        const url = BASE_URL + '/register'
        const res = await axios.post(url ,user,{headers: {
            'Content-Type': 'application/json'
        }
    });
        return {
            status: res.status,
            data: res.data
        };
    }catch(error) {
        console.error(error.message);
        return {error: error.message};
    }
}
