
const URL =  'https://api.covid19api.com/summary';
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const fetchCountries = async() => {
  try {
    const response = await fetch( URL, requestOptions )
    const orderedCountries = ( await response.json() ).Countries;
    return orderedCountries;
  }
  catch ( err ) {
    throw err;
  }
}

export default fetchCountries;
