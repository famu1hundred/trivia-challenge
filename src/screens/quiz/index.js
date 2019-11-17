import React from "react";
import { Alert } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Left, Right, Body, Title, Button, Icon, Content, Text, Card, CardItem, H2, H3, Footer} from "native-base";
import { connect } from "react-redux";
import material from "../../../native-base-theme/variables/material";
import { getQuestions, answerQuestion, endGame, startGame, gameOver } from "../../redux/reducers/game/actions";
import { reset } from "../../redux/reducers/user/actions";
import _ from "lodash";
import styles from "./styles";


const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  getQuestions: game => dispatch(getQuestions(game)),
  answerQuestion: (answer, game) => dispatch(answerQuestion(answer, game)),
  endGame: (user, game) => dispatch(endGame(user, game)),
  startGame: () => dispatch(startGame()),
  gameOver: () => dispatch(gameOver()),
  reset: () => dispatch(reset())
});

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      answer: null
    };
  }

  componentDidMount = () => {
    const { getQuestions, user } = this.props;
    let game = _.find(_.get(user, "user.games"), {score: 0});
    getQuestions(game);
  }

  

  goBack = () => {
    const { navigation, gameOver, user, reset } = this.props;
    Alert.alert(
      "End Game",
      "Are you sure you want to end the game?",
      [
        {text: "Cancel", onPress: () => {}, style: "cancel"},
        {text: "OK", onPress: () => {
          gameOver();
          if(_.isEqual(_.get(user, "user.username"), "Guest")) {
            reset();
          }
          navigation.navigate("Home");
        }}
      ]
    )
  }

  calcScore = (game) => {
    let answers = _.get(game, "answers");
    let correct = _.sumBy(answers, answer => {
      if(answer.correct){
        return 1;
      }
    });
    let incorrect = _.sumBy(answers, answer => {
      if(!answer.correct){
        return 1;
      }
    });

    return Math.floor((correct/_.size(_.get(game, "questions"))) * 100);
  }

  nextQuestion = () => {
    const { game, answerQuestion, endGame, user, navigation } = this.props;
    const { index, answer } = this.state;

    if (answer === null) return; 

    let questions = _.get(game, "game.questions");
    let question = questions[index];
    let correct_answer = _.get(question, "correct_answer");
    
    let _index = index + 1;
    if (_index !== _.size(questions)) {
      //log answer
      answerQuestion({id: _.get(question, "id"), answer: answer, correct: _.isEqual(correct_answer, answer)}, game)
        .then(() => {
          this.setState({index: _index, answer: null});
        });
    } else if (_index === _.size(questions)) {
      //end of game
      answerQuestion({id: _.get(question, "id"), answer: answer, correct: _.isEqual(correct_answer, answer)}, game)
        .then(() => {
          let _game = _.get(game, "game");
          let score = this.calcScore(_game);
          _.set(_game, "score", score); 
          endGame(_.get(user, "user"), _game)
            .then(() => {
              this.setState({index: 0, answer: null});
              navigation.navigate("Results");
            });
        });
    }
  }

  render() {
    const { game } = this.props;
    const { index, answer } = this.state;
    let questions = _.get(game, "game.questions");
    let question = _.get(questions, index);
    return (
      <Container style={styles.container}>
        <Header transparent>
            <Left style={{flex: 1}}>
              <Button transparent onPress={this.goBack}>
                <Icon name="ios-arrow-back" style={{color: material.brandPrimary}} />
              </Button>
            </Left>
            <Body style={styles.title}><Title>Question {index + 1}</Title></Body>
            <Right style={{flex: 1}}></Right>
          </Header>
        <Content style={styles.content}>
          <Grid>
            <Row>
              <Col>
                <Card>
                  <CardItem header>
                    <H2>{_.get(question, "category")}</H2>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <H3>{_.get(question, "question")}</H3>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Text>{index + 1} of {_.size(questions)}</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button block bordered={answer === null || answer === false} style={{marginVertical: 15, borderColor: answer === true ? "" : "#D4EAF2"}} onPress={() => this.setState({answer: true})}>
                  <Text style={{color: answer === true ? "#fff" : "#bbcdd4"}}>True</Text>
                </Button>
                <Button block bordered={answer === null || answer === true} style={{borderColor: answer === false ? "" : "#D4EAF2"}} onPress={() => this.setState({answer: false})}>
                  <Text style={{color: answer === false ? "#fff" : "#bbcdd4"}}>False</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
          <Footer transparent style={styles.footer}> 
            <Button block transparent onPress={this.nextQuestion}>
              <Text style={styles.nextBtn}>Next</Text>
            </Button>
          </Footer>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
