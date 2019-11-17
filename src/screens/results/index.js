import React from "react";
import { Alert, Image, View } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Left, Right, Body, Title, Button, Icon, Content, Text, Card, CardItem, H1, H2, H3, Footer, Accordion } from "native-base";
import { connect } from "react-redux";
import material from "../../../native-base-theme/variables/material";
import { gameOver, startGame, getQuestions } from "../../redux/reducers/game/actions";
import { reset } from "../../redux/reducers/user/actions";
import _ from "lodash";
import styles from "./styles";

const quizAppLogo = require("../../../assets/images/quiz-app-logo-text.png")


const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  gameOver: () => dispatch(gameOver()),
  getQuestions: game => dispatch(getQuestions(game)),
  startGame: user => dispatch(startGame(user)),
  reset: () => dispatch(reset())
});

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      correct: 0,
      incorrect: 0,
      score: 0,
      results: []
    };
  }

  componentDidMount = () => {
    const { game } = this.props;
    let questions = _.get(game, "game.questions");
    let answers = _.get(game, "game.answers");
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

    //setup results
    let results = _.map(questions, (question, idx) => {
      let answer = _.find(answers, {id: question.id});
      let content = { correct_answer: _.toString(question.correct_answer),  answer: _.toString(answer.answer), isCorrect: answer.correct, question: question.question }; 
      return { title: "Question " + (idx + 1), content: content};
    })

    this.setState({
      correct: correct,
      incorrect: incorrect,
      results: results
    })
  }

  renderHeader = (item, expanded) => {
    return (
      <View style={styles.resultsHeader}>
        <Text style={{fontFamily: "NunitoSansBold"}}>{item.title}</Text>
        {expanded
          ? <Icon style={{ color: material.brandPrimary }} name="ios-arrow-down" />
          : <Icon style={{ color: material.brandPrimary }} name="ios-arrow-forward" />}
      </View>
    );
  }

  renderContent = (item) => {
    return (
      <View style={{padding: 10, backgroundColor: "#fafafa"}}>
        <Text style={{paddingBottom: 5}}>{_.get(item, "content.question")}</Text>
        <Text>Correct Answer: {_.get(item, "content.correct_answer")}</Text>
        <Text>You answered: {_.get(item, "content.answer")}</Text>
        <Icon name={_.get(item, "content.isCorrect") ? "checkmark" : "close"} style={{fontSize: 18, color: _.get(item, "content.isCorrect") ? "#66bb6a" : "#ef5350"}} />
      </View>
    )
  }

  play = () => {
    const { user, navigation, startGame, getQuestions } = this.props;
    let _user = _.get(user, "user");
    if (_.isEmpty(_user)) {
      //guest
      _user = new User({name: "Guest", username: "Guest"});
    } 

    startGame(_user).then(game => {
      getQuestions(game);
      navigation.navigate("Quiz");
    });
    
  }


  render() {
    const { navigation, gameOver, game, reset, user } = this.props;
    const { correct, incorrect, results } = this.state;
    let score = _.get(game, "game.score");
    return (
      <Container style={styles.container}>
        <Header transparent>
            <Left style={{flex: 1}}></Left>
            <Body style={styles.title}><Title>Results</Title></Body>
            <Right style={{flex: 1}}>
              <Button transparent onPress={() => {
                gameOver();
                if(_.isEqual(_.get(user, "user.username"), "Guest")) {
                  reset();
                }
                navigation.navigate("Home");
              }}>
                <Icon name="close" style={{color: material.brandPrimary}} />
              </Button>
            </Right>
          </Header>
        <Content style={styles.content}>
          <Grid>
            <Row>
              <Col style={{ height: 200 }}>
                <Image source={quizAppLogo} style={styles.logo} />
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom: 15}}>
                { score >= 70 &&
                  <H1>Congratulations!</H1>
                }
                { score <= 69 &&
                  <H1>Well...</H1>
                }
              </Col>
            </Row>
            <Row>
              <Col style={{marginBottom: 15}}>
                { score >= 70 &&
                  <Text>You did an awesome job! Really...truly amazing getting that many answers correct. You must be a genius.</Text>
                }
                {score <= 69 &&
                  <Text>Better luck next time. Don't worry, its not the end of the world. Hopefully you are still smarter than a 4th grader.</Text>
                }
              </Col>
            </Row>
            <Row>
              <Col>
                <View style={styles.results}>
                  <Icon name="checkmark" style={{color: "#66bb6a", marginRight: 5}} />
                  <Text style={{ color: "#424242" }}>{correct} correct</Text>
                </View>
              </Col>
              <Col style={{alignItems: "center"}}>
                <View style={styles.results}>
                  <Icon name="close" style={{color: "#ef5350", marginRight: 5}} />
                  <Text style={{ color: "#424242" }}>{incorrect} incorrect</Text>
                </View>
              </Col>
            </Row>
            <Row>
              <Col>
                <Accordion 
                  style={{marginVertical: 15}}
                  dataArray={results} 
                  expanded={0}
                  renderHeader={this.renderHeader}
                  renderContent={this.renderContent} />
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer transparent style={styles.footer}>
          <Button block transparent onPress={this.play}>
            <Text style={styles.nextBtn}>Start New Game</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
