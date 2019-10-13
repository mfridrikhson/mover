import callWebApi from '../helpers/webApiHelper';

export const register = async request => {
  const response = await callWebApi({
    endpoint: '/api/auth/register',
    type: 'POST',
    request
  });
  return response.json();
};

export const login = async request => {
  const response = await callWebApi({
    endpoint: '/api/auth/login',
    type: 'POST',
    request
  });
  return response.json();
};
