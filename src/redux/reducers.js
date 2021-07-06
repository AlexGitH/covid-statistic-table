import { PROMISE } from './actionTypes'

// promise
const promiseReducer = ( state = {}, { type, status, payload, error, name } ) =>
  ( type === PROMISE
      ? { ...state, [name]: { status, payload, error } }
      : state )


export {
  promiseReducer as promise,
}


