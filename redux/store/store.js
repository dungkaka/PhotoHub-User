import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./../reducers/root-reducer";
import request from "./../../utils/axios";
import axios from "axios";

const store = createStore(appReducer, applyMiddleware(thunk));

// const store = createStore(appReducer, applyMiddleware(thunk));

export default store;
