import React, {
  View,
  Text,
  Platform,
  StyleSheet,
  Component,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';

import UserList from './UserList';

export default class SignIn extends Component {
  _onChangeText() {
    console.log('onChangeText');
  }

  _onClick() {
    console.log('_onClick');
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: 'Marrecos',
        component: UserList
      });
    } else if (Platform.OS === 'android') {
      this.props.navigator.push({
        title: 'Marrecos',
        name: 'UserList'
      });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={styles.logoCircle} source={require('../img/logo_circle.png')} />
        <Text style={styles.title}>Pronto pra jogar, marreco?</Text>
        <Text style={styles.title}>Se perder no zero tem que passar embaixo da mesa hein!</Text>
        <Text style={[styles.title, styles.subtitle]}>Escreve seu nome aí, e bora trucar!</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this._onChangeText.bind(this)}/>
        <TouchableHighlight style={styles.button} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
          <Text style={styles.buttonText}>TRUUUCOOOO!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems:'center'
  },
  logoCircle: {
    height: 200,
    width: 200
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Trebuchet MS',
    margin: 10
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  nameInput: {
    height: 40,
    borderRadius: 5,
    borderColor: '#FFCA28',
    borderWidth: 1,
    marginTop: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#FFC107',
    borderColor: '#FFCA28',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 20
  }
});
