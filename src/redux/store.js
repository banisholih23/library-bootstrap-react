import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware'
import reducer from "./reducer";


const logger = createLogger();
const enhancers = applyMiddleware(logger, promise);
const store = createStore(reducer, enhancers);
export default store;