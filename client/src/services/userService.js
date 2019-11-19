import callWebApi from '../helpers/webApiHelper';

export const updateUser = async ({ id, ...requestData }) => {
  const response = await callWebApi({
    endpoint: `/api/users/${id}`,
    type: 'PUT',
    requestData
  });
  return response.json();
};

export const setUserRating = async ({ userId, rating }) => {
  const response = await callWebApi({
    endpoint: `/api/users/${userId}/rating`,
    type: 'POST',
    requestData: { rating }
  });
  return response.json();
};
