import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';

import UserList from './UserList';
import baseStyles from '../baseStyles';

export default class SignIn extends Component {
  _onChangeText() {
    console.log('onChangeText');
  }

  _onClick() {
    this.props.navigator.push({
      title: 'Marrecos',
      component: UserList
    });
  }

  render() {
    return(
      <View style={[baseStyles.container, styles.container]}>
        <Image style={styles.logoCircle} source={require('../img/logo_circle.png')} />
        <Text style={[baseStyles.title, styles.title]}>Pronto pra jogar, marreco?</Text>
        <Text style={[baseStyles.title, styles.title]}>Se perder no zero tem que passar embaixo da mesa hein!</Text>
        <Text style={[baseStyles.title, styles.title, baseStyles.subtitle]}>Escreve seu nome aí, e bora trucar!</Text>
        <TextInput
          style={styles.nameInput}
          autoFocus={true}
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
