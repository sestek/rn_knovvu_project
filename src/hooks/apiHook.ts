import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useRequest = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const getRequestToken = async (url: string, dataBody: any) => {
    const encode2 = str =>
      encodeURIComponent(str)
        .replace(/\!/g, '%21')
        .replace(/\~/g, '%7E')
        .replace(/\*/g, '%2A')
        .replace(/\'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
    const toFormUrlEncoded = data =>
      Object.entries(data)
        .map(([key, value]) => `${encode2(key)}=${encode2(value)}`)
        .join('&');

    const formData = toFormUrlEncoded(dataBody);
    // console.log(formData);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        AsyncStorage.setItem('token', data.access_token)
        // console.log('API yanıtı:', data.access_token);
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  };

  //   useEffect(() => {
  //     fetchData(tokenBaseUrl);
  //   }, []);

  // custom hook returns value
  return {
    response,
    error,
    loading,
    getRequestToken,
  };
};

export default useRequest;
