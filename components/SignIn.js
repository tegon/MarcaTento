import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TextInput,
  Image,
  TouchableHighlight,
  AsyncStorage,
  TouchableNativeFeedback,
} from 'react-native';

import UserList from './UserList';
import baseStyles from '../baseStyles';
import FirebaseRef from '../FirebaseRef';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (err, result) => {
      if (result) {
        this.setState({ user: JSON.parse(result) });
      }
    });

    FirebaseRef.auth().onAuthStateChanged(this._onAuthStateChanged.bind(this));
  }

  _onAuthStateChanged(auth) {
    if (auth) {
      if (!this.state.user.uid) {
        let user = Object.assign(this.state.user, { uid: auth.uid });
        AsyncStorage.setItem('user', JSON.stringify(user));
        this.setState({ user: user });
        FirebaseRef.database().ref('users/' + user.uid).set({
          username: user.username
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.state.user.uid && this.state.user.username) {
      this.props.navigator.replace({
        title: 'Marrecos',
        component: UserList,
        passProps: { user: this.state.user }
      });
    }
  }

  _onChangeText(text) {
    this.setState({ user: { username: text } });
  }

  _onClick() {
    if (this.state.user.username) {
      FirebaseRef.auth().signInAnonymously();
    }
  }

  render() {
    return(
      <View style={[baseStyles.container, styles.container]}>
        <Image style={styles.logoCircle} source={require('../img/logo_circle.png')} />
        <Text style={[baseStyles.title, styles.title]}>Pronto pra jogar, marreco?</Text>
        <Text style={[baseStyles.title, styles.title]}>Se perder no zero tem que passar embaixo da mesa hein!</Text>
        <Text style={[baseStyles.title, styles.title, baseStyles.subtitle]}>Escreve seu nome aí, e bora trucar!</Text>
        <TextInput
          autoCapitalize='none'
          maxLength={6}
          style={styles.nameInput}
          autoFocus={true}
          value={this.state.user.username}
          onChangeText={this._onChangeText.bind(this)}/>
        <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
          <Text style={baseStyles.buttonText}>TRUUUCOOOO!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems:'center'
  },
  nameInput: {
    height: 40,
    borderRadius: 5,
    borderColor: '#FFCA28',
    borderWidth: 1,
    marginTop: 20
  },
  title: {
    textAlign: 'center',
    margin: 10
  },
  logoCircle: {
    height: 200,
    width: 200
  },
  button: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 20
  },
});
