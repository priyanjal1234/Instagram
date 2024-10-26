import api from "../api";

export const sendNotification = async function (userId, id) {
  try {
    let sendNotificationRes = await api.post(
      `/notifications/create/like/${userId}`,
      { id },
      { withCredentials: true }
    );
    return sendNotificationRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error sending notification");
    }
  }
};

export const getNotifications = async function (id) {
  try {
    let getNotificationsRes = await api.get(`/notifications/get/${id}`, {
      withCredentials: true,
    });
    return getNotificationsRes;
  } catch (error) {
    if(error.response && error.response.status === 500) {
      console.log("Error fetching notifications")
    }
  }
};
