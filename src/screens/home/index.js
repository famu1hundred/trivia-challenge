import React from "react";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, View } from "react-native";
import { Container, Button, Content, Form, Item, Input, Footer, Text, Label, H1 } from "native-base";
import { connect } from "react-redux";
import { login, logout, reset, getUsers } from "../../redux/reducers/user/actions";
import { startGame } from "../../redux/reducers/game/actions";
import User from "../../core/entities/user";
import _ from "lodash";
import styles from "./styles";

const quizAppLogo = require("../../../assets/images/quiz-app-logo-text.png")

const mapStateToProps = state => ({
  app: state.app,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  logout: () => dispatch(logout()),
  login: (username, password) => dispatch(login(username, password)),
  reset: () => dispatch(reset()),
  startGame: user => dispatch(startGame(user))
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount = () => {
    const { getUsers } = this.props;
    getUsers();
  }

  login = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    login(username, password);
  }

  logout = () => {
    const { logout } = this.props;
    logout();
  }

  play = () => {
    const { user, navigation, startGame } = this.props;
    let _user = _.get(user, "user");
    if (_.isEmpty(_user)) {
      //guest
      _user = new User({name: "Guest", username: "Guest"});
    } 

    startGame(_user).then(() => {
      navigation.navigate("Quiz");
    });
    
  }

  render() {
    const { navigation, user, reset } = this.props;
    let _user = _.get(user, "user");
    let _error = _.get(user, "error");
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Grid>
            <Row>
              <Col style={{ height: 200 }}>
                <Image source={quizAppLogo} style={styles.logo} />
              </Col>
            </Row>
            <Row>
              <Col>
                { _.isEmpty(_user) &&
                  <Form>
                    <Item floatingLabel style={styles.item}>
                      <Label>Username</Label>
                      <Input 
                        onChangeText={username => this.setState({ username })}
                        autoCorrect={false} 
                        autoCapitalize="none" />
                    </Item>
                    <Item floatingLabel style={[styles.item, styles.password]}>
                      <Label>Password</Label>
                      <Input 
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}
                        autoCorrect={false} 
                        autoCapitalize="none" />
                    </Item>
                    <Button block style={{marginBottom: 10}} onPress={this.login}>
                      <Text>Sign In</Text>
                    </Button>
                    <Button block bordered onPress={this.play}>
                      <Text>Play As Guest</Text>
                    </Button>
                    { !_.isNull(_error) &&
                      <Text style={styles.error}>{_error}</Text>
                    }
                  </Form>
                }
                { !_.isEmpty(_user) &&
                  <View style={{marginTop: 15}}>
                    <H1 style={{marginBottom: 15}}>Welcome back, {_.get(_user, "name")}</H1>
                    <Text style={{marginBottom: 15}}>Wanna play {_.isEmpty(_.get(_user, "games")) ? "a" : "another"} game?</Text>
                    <Button block onPress={this.play}>
                      <Text>Play</Text>
                    </Button>
                  </View>
                }
              </Col>
            </Row>
          </Grid>
        </Content>
        { _.isEmpty(_user) &&
          <Footer transparent style={styles.footer}> 
            <Text>Don't have an account?</Text>
            <Button transparent style={{marginLeft: -12}} onPress={() => {
              reset();
              navigation.navigate("Register");
            }}>
              <Text>Register Now</Text>
            </Button>
          </Footer>
        }
        { !_.isEmpty(_user) &&
          <Footer transparent style={styles.footer}> 
            <Text>Not {_.get(_user, "name")}?</Text>
            <Button transparent style={{marginLeft: -12}} onPress={this.logout}>
              <Text>Sign In</Text>
            </Button>
          </Footer>
        }
      </Container>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
