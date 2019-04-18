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

const getRequest = (addUrl, token) => ({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
  url: BASE_URL + addUrl
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

export const getNotifications = async (token) => {
  try {
    const res = await axios(getRequest(`?pageNumber=1&pageSize=10`, token));
    let arrayToReturn = res.data;
    arrayToReturn = arrayToReturn.map(notification => {
      return {
        matchingUser: notification.senderId,
        status: notification.status
      }
    })
    return arrayToReturn;
  } catch (error) {
      console.log("error in getNotifications call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to get notifications"
  }
}
