import callWebApi from '../helpers/webApiHelper';

export const register = async requestData => {
  const response = await callWebApi({
    endpoint: '/api/auth/register',
    type: 'POST',
    requestData
  });
  return response.json();
};

export const login = async requestData => {
  const response = await callWebApi({
    endpoint: '/api/auth/login',
    type: 'POST',
    requestData
  });
  return response.json();
};

export const getCurrentUser = async () => {
  const response = await callWebApi({
    endpoint: '/api/auth/user',
    type: 'GET'
  });
  return response.json();
};
