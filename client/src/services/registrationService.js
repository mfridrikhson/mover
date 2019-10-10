import callWebApi from '../helpers/webApiHelper';

export const register = async request => {
  const response = await callWebApi({
    endpoint: '/api/auth/register',
    type: 'POST',
    request
  });
  return response.json();
};
