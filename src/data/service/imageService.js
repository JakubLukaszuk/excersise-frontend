import request from '../../api/agent';

export const getImageAsync = async() => {
  const data = request
    .get('/photos/2093720/pexels-photo-2093720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
    .catch(error => {
      throw error;
    })
    return data;
}