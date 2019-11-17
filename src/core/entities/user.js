import _ from "lodash";
import Game from "./game";

export default class User {
  name: string;
  username: string;
  password: string;
  games: Array<Game>;

  constructor(user){
    this.name = _.toString(_.get(user, "name"));
    this.username = _.toString(_.get(user, "username"));
    this.password = _.toString(_.get(user, "password", ""));
    this.games = [];
  }
}