import callWebApi from '../helpers/webApiHelper';

export const addVehicle = async requestData => {
  const response = await callWebApi({
    endpoint: '/api/vehicles',
    type: 'POST',
    requestData
  });
  return response.json();
};
