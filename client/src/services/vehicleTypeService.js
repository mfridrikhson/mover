import callWebApi from '../helpers/webApiHelper';

export const getVehicleTypes = async () => {
  const response = await callWebApi({
    endpoint: '/api/vehicle-types',
    type: 'GET'
  });
  return response.json();
};
