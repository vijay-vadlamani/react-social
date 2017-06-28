/**
 * middleware is a function of a function of a function
 */

const promiseMiddleware = store => next => action => {
  /**
   * We are going to check if action.payload is a promise
   */
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });
    action.payload.then(
      res => {
        // After the promise is resolved we are going to dispatch the action after overriding
        //  the payload with the result of the promise
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  }
  /**
   * next function is how you pass control to the next piece of middleware in the chain
   * in our case we do not have anything in the middleware to execute hence it will move on to the reducer
   */
  next(action);
};

/**
 * we are assuming something is a promise if it has a property of then, then it is a function
 */
function isPromise(v) {
  return v && typeof v.then === 'function';
}

export { promiseMiddleware };