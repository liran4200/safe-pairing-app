import axios from 'axios';


const BASE_URL = "https://localhost:3000/api/notifications";

const postRequest = (token) => ({
  method: 'post',
  headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
  },
  url: BASE_URL,
})

export const sendNotification = async (token) => {
  try {
    const res = await axios(postRequest(token)) ;
  } catch (error) {
      console.log("error in sendNotification call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to send a notification"
  }
}
