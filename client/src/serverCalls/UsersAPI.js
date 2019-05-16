import axios from 'axios';

const BASE_URL = "http://localhost:4444/api/users";

const getRequest = (addUrl, token) => ({
  method: 'get',
  headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
  },
  url: BASE_URL + addUrl
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
      throw new Error("an error as occured while searching for a user");
  }
}

export const registerUser = async (user) => {
    let res;
    try {
        const url = BASE_URL + '/register'
        res = await axios.post(url ,user,{headers: {
            'Content-Type': 'application/json'
        }
    });
        return res.data;
    }catch(error) {
        console.error(res);
        console.log(JSON.stringify(error));
        return {error: error.response.data};
    }
}

export const getUserById = async (id, token) => {
  try {
    const res = await axios(getRequest(`/${id}`,token));
    return {
      userId: res.data._id,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email
    };
  } catch (error) {
      console.log("error in getUserById call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw new Error("an error as occured while searching for a user");
  }
}

export const confirmUser = async (id,code) => {
  try {
    const url = BASE_URL + '/confirmation/' + id
    const res = await axios.post(
      url,
      {
        code: code
      },
      {
      headers: {
        'Content-Type': 'application/json'
            }
    });
      return res.data;
      }catch(error) {
        console.log(error);
        console.log(JSON.stringify(error));
        return {error: error.response.data};
      }
}

export const getCurrentUser = async (token) => {
  try {
    const url = BASE_URL + '/me';
    const headers ={
      'Content-Type': 'application/json',
      'x-auth-token': token
    };
    const res = await axios.get(url, {headers});
    return res.data;
  } catch (error) {
      console.log(error)
      console.log(JSON.stringify(error))
      return {error: error.response.data};
  }
}
