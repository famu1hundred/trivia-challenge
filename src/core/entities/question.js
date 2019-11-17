import _ from "lodash";

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default class Question {
  id: number;
  category: string;
  difficulty: string;
  type: bool;
  question: string;
  correct_answer: bool;
  incorrect_answers: Array<string>;

  constructor(category, difficulty, type, question, correct_answer, incorrect_answers){
    this.id = Math.floor(Math.random() * 100);
    this.difficulty = difficulty;
    this.type = type;
    this.question = entities.decode(question);
    this.correct_answer = JSON.parse(_.toLower(correct_answer));
    this.incorrect_answers = incorrect_answers;
    this.category = category;
  }
}