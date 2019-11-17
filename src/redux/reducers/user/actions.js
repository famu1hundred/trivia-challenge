import { AsyncStorage } from "react-native";
import { loading } from "../app/actions";
import { LOGIN, REGISTER, LOGOUT, ERROR, RESET, UPDATE_USER, LOAD_USERS, SAVE_USERS } from "./types";
import _ from "lodash";

export const registerUser = (user) => ({
  type: REGISTER,
  user: user
});

export const loginUser = (user) => ({
  type: LOGIN,
  user: user
});

export const logout = () => ({
  type: LOGOUT,
});

export const error = (err) => ({
  type: ERROR,
  error: err
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user: user
});

export const reset = () => ({
  type: RESET,
});

export const loadUsers = users => ({
  type: LOAD_USERS,
  users: users
});

export const saveUsers = users => ({
  type: SAVE_USERS,
  users: users
});

export const getUsers = () => dispatch => 
  AsyncStorage.getItem("users")
    .then(users => {
      let _users = JSON.parse(users);
      dispatch(loadUsers(_users));
      if(!_.isEmpty(_users)){
        let user = _.last(_users);
        dispatch(loginUser(user));
      } 
      dispatch(loading(false));
    })

export const setUsers = (users) => dispatch => 
  AsyncStorage.setItem("users", JSON.stringify(users))
    .then(result => {
      dispatch(loading(false));
    })

export const register = (user) => dispatch => 
  AsyncStorage.getItem("users")
  .then(users => {
    let _users = _.clone(JSON.parse(users)) || [];
    _users.push(user);
    AsyncStorage.setItem("users", JSON.stringify(_users))
    .then(result => {
      dispatch(registerUser(user));
    })
  })

export const login = (username, password) => dispatch => 
  AsyncStorage.getItem("users")
  .then(users => {
    let _users = JSON.parse(users) || [];
    let user = _.find(_users, { username: username, password: password});
    if (user) {
      dispatch(loginUser(user));
    } else {
      dispatch(error("Invalid login. Please try again"));
    }
  })

export const update = (user) => dispatch => 
  AsyncStorage.getItem("users")
  .then(users => {
    let _users = JSON.parse(users) || [];
    let _user = _.find(_users, { username: _.get(user, "username") });
    if (_user) {
      _user = user;
      dispatch(updateUser(_user));
      if(!_.isEqual(_.get(user, "username"), "Guest")) {
        _.remove(_users, {username: _.get(user, "username")});
        _users.push(_user);
        dispatch(setUsers(_users));
      }
    } else {
      //user is a guest
      dispatch(updateUser(user));
    }
  })


  


