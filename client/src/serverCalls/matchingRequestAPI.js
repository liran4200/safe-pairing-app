import axios from 'axios';


const BASE_URL = "http://localhost:4444/api/matching-requests";

const postRequest = (token, data) => ({
  method: 'post',
  headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
  },
  url: BASE_URL,
  data: data
});

const getRequest = (token, userId) => ({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
  url: BASE_URL + "/" + userId + "?pageNumber=1&pageSize=100"
});

const putRequest = (token, data) => ({
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
  url: BASE_URL + '/status/' + data.matchingRequestId,
  data: data
})

export const updateMatchingRequestStatus = async (token, matchingRequestId, receiverId, senderId, status) => {
  try {
    const matchingRequestData = {
      "matchingRequestId": matchingRequestId,
      "senderId": senderId,
      "receiverId": receiverId,
      "type": "matching-request",
      "status": status
    }
    const res = await axios(putRequest(token, matchingRequestData));
    return res.data;
  } catch (error) {
      console.log("error in updateNotification call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to update a matching request status"
  }
}

export const sendMatchingRequest = async (token, senderId, receiverId) => {
  try {
    const matchingRequestData = {
      "senderId": senderId,
      "receiverId": receiverId,
      "type": "matching-request"
    }
    const res = await axios(postRequest(token, matchingRequestData));
    return res.data;
  } catch (error) {
      console.log("error in sendMatchingRequest call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to send a matching request"
  }
}

export const getMatchingRequests = async (token, userId) => {
  try {
    const res = await axios(getRequest(token, userId));
    let arrayToReturn = res.data;
    arrayToReturn = arrayToReturn.map(matchingRequest => {
      return {
        nmatchingRequestId: matchingRequest._id,
        receiverUser: matchingRequest.receiverId.firstName + " " + matchingRequest.receiverId.lastName,
        receiverId: matchingRequest.receiverId._id,
        senderUser: matchingRequest.senderId.firstName + " " + matchingRequest.senderId.lastName,
        senderId: matchingRequest.senderId._id,
        status: matchingRequest.status,
        createdDate: matchingRequest.createdDate,
        evaluation: matchingRequest.evaluation
      }
    })
    return arrayToReturn;
  } catch (error) {
      console.log("error in getMatchingRequests call")
      console.log(error)
      console.log(JSON.stringify(error))
      throw "an error occured while tryed to get matching requests"
  }
}
