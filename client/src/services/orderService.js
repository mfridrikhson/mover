import callWebApi from '../helpers/webApiHelper';

export const submitOrder = async requestData => {
  const response = await callWebApi({
    endpoint: '/api/orders',
    type: 'POST',
    requestData
  });
  return response.json();
};
