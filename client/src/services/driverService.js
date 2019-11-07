import callWebApi from '../helpers/webApiHelper';

export const updateDriver = async ({ id, ...requestData }) => {
  const response = await callWebApi({
    endpoint: `/api/drivers/${id}`,
    type: 'PUT',
    requestData
  });
  return response.json();
};
