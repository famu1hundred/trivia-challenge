import Question from "./question";

export default class Game {
  id: number;
  score: number;
  questions: Array<Question>;
  answers: Array<{id: number, answer: bool, correct: bool }>;

  constructor(){
    this.id = Math.floor(Math.random() * 100);
    this.score = 0;
    this.answers = [];
    this.questions = [];
  }
}