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


const GEONAMES = "api.geonames.org/postalCodeSearch?";

let postalcode = "2037pc";
let country = "Nederland";

const REQUEST = 'http://api.geonames.org/postalCodeLookupJSON?postalcode=' + postalcode  + '&country=' + country  + '&callback=getLocation&username=demo';

let wtf = new JSONscriptRequest(REQUEST);
console.log(wtf);
































