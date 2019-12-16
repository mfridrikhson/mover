import callWebApi from '../helpers/webApiHelper';

export const submitOrder = async requestData => {
  const response = await callWebApi({
    endpoint: '/api/orders',
    type: 'POST',
    requestData
  });
  return response.json();
};

export const updateOrder = async ({ id, ...requestData }) => {
  const response = await callWebApi({
    endpoint: `/api/orders/${id}`,
    type: 'PUT',
    requestData
  });
  return response.json();
};
