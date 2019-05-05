import axios from 'axios';


const BASE_URL = "http://localhost:4444/api/notifications";

const getRequest = (token, ownerId) => ({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
  url: BASE_URL + "/" + ownerId + "?pageNumber=1&pageSize=100"
});

const putRequest = (token, data) => ({
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
  url: BASE_URL + '/status/' + data.notificationId,
  data: data
})

export const getNotifications = async (token, ownerId) => {
  try {
    const res = await axios(getRequest(token, ownerId));
    let arrayToReturn = res.data;
    arrayToReturn = arrayToReturn.map(notification => {
      return {
        notificationId: notification._id,
        matchingRequestId: notification.matchingRequestId._id,
        ownerId: notification.ownerId,
        matchingRequestStatus: notification.matchingRequestStatus,
        type: notification.type,
        receiverUser: notification.matchingRequestId.receiverId,
        senderUser: notification.matchingRequestId.senderId,
        status: notification.status,
        updateDate: notification.lastUpdateDate
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

export const updateNotificationStatus = async (token, notificationId, ownerId, status) => {
  try {
    const matchingRequestData = {
      "notificationId": notificationId,
      "ownerId": ownerId,
      "status": status
    }
    const res = await axios(putRequest(token, matchingRequestData));
    return res.data;
  } catch (error) {
      console.log("error in updateNotificationStatus call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to update a notification status"
  }
}
