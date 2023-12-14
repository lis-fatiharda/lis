//https://apiip.net/user/dashboard
//https://www.gps-coordinates.net/

import axios from "axios";

export default async function () {
  // Set endpoint and your access key
  const ip = "78.163.119.122";
  const accessKey = "2a068ab3-1662-49ef-a31b-e739f14405bf";
  const url =
    "https://apiip.net/api/check?ip=" + ip + "&accessKey=" + accessKey;

  // Make a request and store the response
  await axios
    .get(url)
    .then((response) => {
      // Output the "code" value inside "currency" object
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
  //******************************************* */

  const options = {
    method: "GET",
    url: "https://telize-v1.p.rapidapi.com/geoip",
    headers: {
      "X-RapidAPI-Key": "98e4e54b92msh91571a9b5556eadp16e9d0jsnca970fe2a8e9",
      "X-RapidAPI-Host": "telize-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error("error-telize");
    });
}
