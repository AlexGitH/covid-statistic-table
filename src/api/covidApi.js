
const URL =  'https://api.covid19api.com/summary';
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const fetchCountries = async({setError,setCountries}) => {
  try {
    const response = await fetch( URL, requestOptions )
    const orderedCountries = ( await response.json() ).Countries.map( ( x, i ) => ({...x, Index: i + 1 }) );
    setError( null );
    setCountries( orderedCountries );
  }
  catch ( err ) {
    const text = err.toString();
    setError( text );
  }
}

export default fetchCountries;
