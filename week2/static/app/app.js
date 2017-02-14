/**
 * Created by Diego on 13-02-17.
 */

/**
* Using API's
 *  - GeoNames/(Google map API)
 *  - Wunderground
 *
 *  With this this I'll ask the end-user to put a location in the input textfield. With this information input the api
 *  wunderground is used for weather prediction.
* */

// Example filter, map and reduce
// console.log(
//     [1,2,3,4,5]
//         .filter((el) => {return el < 5;})
//         .map((el) => {return "<h1>" + el + "<h1>\r\n";})
//         .reduce((buffer, el) => {return buffer + el;})
// );


fetch('https://randomuser.me/api');

// function getCountries(countryInfo) {
//     countryInfo.then(
//         (country) => {
//             countries = country.map((el) => {
//                 return {
//                     name: el.name,
//                     altNames: el.altSpellings
//                 }
//             });
//             // Hier verder met code
//         }
//     );
// };
//
// function requestAPI(stringURL) {
//     return pegasus(stringURL);
// };
//
// function main() {
//     const URL = "https://restcountries.eu/rest/v1/all";
//     getCountries(requestAPI(URL))
// };
//
//
// main();





























