import axios from 'axios';


const BASE_URL = "http://localhost:4444/api/notifications";

const postRequest = (token, data) => ({
  method: 'post',
  headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
  },
  url: BASE_URL,
  data: data
})

export const sendNotification = async (token, senderId, receiverId) => {
  try {
    const notificationData = {
      "senderId": senderId,
      "receiverId": receiverId,
      "type": "matching-request"
    }
    const res = await axios(postRequest(token, notificationData));
    return res;
  } catch (error) {
      console.log("error in sendNotification call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to send a notification"
  }
}
