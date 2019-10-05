import axios from "axios";
const hostUrl = "http://10.11.81.17:4000/";

const defaultOptions = {
  baseURL: hostUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    dataType: "json"
  },
  transformResponse: [
    function (data) {
      // Transformando pro formato antigo da api
      // Alguns erros não podem ser formatados para json,nesse caso simplesmente retornamos data
      try {
        let dataJson = JSON.parse(data);
        if (dataJson.data) {
          dataJson = dataJson.data;
        }
        return dataJson;
      } catch (error) {
        return data;
      }
    }
  ]
};

const Api = axios.create(defaultOptions);
Api.interceptors.request.use(function (config) {
  console.log("Request headers", config.headers);
  if (__DEV__) {
    console.log("URL  é", config.url);
    // console.log("URL:", config.url, hasToken);
  }
  return config;
});
export default api;