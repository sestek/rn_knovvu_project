import {useState, useEffect} from 'react';
AsyncStorage;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

const useRequest = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = (baseUrl: string) => {
    axios
      .get(baseUrl)
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const createPostAxios = async (baseUrl: string, data: any) => {
    try {
      const response = await axios.post(baseUrl, data);
      return 200;
    } catch (err) {
      return 400;
    }
  };

  const createPostFormUrlEncoded = async (baseUrl: string, data: any) => {
    // try {
    //   console.log(baseUrl, data);
    //   const response: any = await axios.post(baseUrl, data, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   });

    //   console.log('response : ', response);
    //   await AsyncStorage.setItem('token', response.data);
    //   console.log('Yeni gönderi oluşturuldu:', response.data);
    // } catch (error) {
    //   console.error('Gönderi oluşturulurken hata oluştu:', error);
    // }
    console.log('istek : ', baseUrl, '-', data);

    axios
      .post(
        'https://nesibe-yilmaz-tokyo.backend-identity.test.core.devops.sestek.com.tr/connect/token',
        qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          // httpsAgent: new https.Agent({
          //   rejectUnauthorized: false, // SSL sertifikası doğrulamasını devre dışı bırakma (opsiyonel)
          //   // cert: certPath, // Sertifika yolu (varsayılan olarak yok sayabilirsiniz)
          // }),
        },
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log('api Erorr: ', err.response));
  };

  const getAdvice = () => {
    axios.get('http://api.adviceslip.com/advice/' + 5).then(response => {
      console.log(response.data);
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
    createPostAxios,
    createPostFormUrlEncoded,
    getAdvice,
  };
};

export default useRequest;
