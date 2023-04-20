import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('ticket');
    // const userToken = JSON.parse(tokenString);
    // return userToken?.ticket
    return tokenString === null || tokenString === undefined? undefined:tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('ticket', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}