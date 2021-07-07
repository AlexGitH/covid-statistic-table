const URL =  'https://api.covid19api.com/summary';
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const fetchCountries = async() => {
  try {
    const response = await fetch( URL, requestOptions );
    if ( !response.ok ) {
      const {message} = await response.json();
      throw new Error( `Server Side Error: ${message}` );
    }

    const { Countries, Message } = await response.json();
    if ( Array.isArray( Countries ) ) {
      return Countries;
    }

    throw new Error( `Server Side Error: ${Message}` );
  }
  catch ( err ) {
    throw err;
  }
}

export default fetchCountries;
