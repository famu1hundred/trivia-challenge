import { update } from "../user/actions";
import { NEW_GAME, LOAD_QUESTIONS, END_GAME } from "./types";
import Game from "../../../core/entities/game";
import Question from "../../../core/entities/question";
import axios from 'axios';
import _ from "lodash";

export const newGame = game => ({
  type: NEW_GAME,
  game: game
});

export const gameOver = () => ({
  type: END_GAME
});

export const loadQuestions = game => ({
  type: LOAD_QUESTIONS,
  game: game
});

export const startGame = (user) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let games = _.get(user, "games");
      //remove incomplete games
      games = _.compact(_.map(games, game => { if(_.get(game, "score", 0) != 0) return game;}));
      let game = new Game();
      games.push(game);
      _.set(user, "games", games);
      dispatch(newGame(game));
      dispatch(update(user)).then(() => {
        resolve(game);
      });
      
    });
  }
}

export const getQuestions = (game) => {
  return dispatch => {
    return axios.get("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
    .then(function (response) {
      let results = _.get(response, "data.results");
      let questions = _.map(results, res => {
        return new Question(
          res.category,
          res.difficulty,
          res.type,
          res.question,
          res.correct_answer,
          res.incorrect_answers
        )
      })
      _.set(game, "questions", questions);
      dispatch(loadQuestions(game));
    })
    .catch(function (error) {
      console.debug(error);
    });
  }
}

export const answerQuestion = (answer, game) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let answers = _.get(game, "game.answers");
      answers.push(answer); 
      resolve();
    });
  }
}

export const endGame = (user, game) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(update(user));
      resolve();
    });
  }
}
  

