import axios from 'axios';


const BASE_URL = "http://localhost:4444/api/users";

const getRequest = (addUrl, token) => ({
  method: 'get',
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-auth-token': token
  },
  url: BASE_URL + addUrl,
})

export const searchUser = async (searchText, token) => {
  try {
    const res = await axios(getRequest(`/search/${searchText}`,token)) ;
  } catch (error) {
      console.log("error in searchUser call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error as occured while searching for a user"
  }
}
