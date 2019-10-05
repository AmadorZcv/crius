import { createStore, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";

// Todos os middlewares vão juntos
const middleWare = [];
// Adicionando o Redux Thunk
middleWare.push(thunk);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middleWare)),
);

export default store;