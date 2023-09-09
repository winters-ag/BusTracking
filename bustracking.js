//These functions are moved to map2.js, future state will figure out how to have them live separately
async function run(){
  // get bus data    
const locations = await getBusLocations();
console.log(new Date());
console.log(locations);


// timer
setTimeout(run, 60000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}

run();