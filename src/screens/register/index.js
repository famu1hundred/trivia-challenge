import React from "react";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Content, Form, Item, Input, Footer, Text, Label } from "native-base";
import { connect } from "react-redux";
import { register } from "../../redux/reducers/user/actions";
import material from "../../../native-base-theme/variables/material";
import User from "../../core/entities/user";
import styles from "./styles";
import _ from "lodash";

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user))
});

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: ""
    };
  }

  componentDidMount = () => {}

  registerUser = () => {
    const { name, username, password } = this.state;
    const { register } = this.props;

    let user = new User({name: name, username: username, password: password});
    register(user).then(data => {
      console.debug(data);
    });
    
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header transparent>
            <Left style={{flex: 1}}>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="ios-arrow-back" style={{color: material.brandPrimary}} />
              </Button>
            </Left>
            <Body style={styles.title}><Title>Register</Title></Body>
            <Right style={{flex: 1}}></Right>
          </Header>
        <Content style={styles.content}>
          <Grid>
            <Row>
              <Col>
                <Form>
                  <Item floatingLabel style={styles.item}>
                    <Label>Name</Label>
                    <Input 
                      onChangeText={name => this.setState({ name })}
                      autoCorrect={false} 
                      autoCapitalize="words" />
                  </Item>
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
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                      autoCorrect={false} 
                      autoCapitalize="none" />
                  </Item>
                  <Button block onPress={this.registerUser}>
                    <Text>Sign Up</Text>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
