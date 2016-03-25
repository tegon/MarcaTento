import React, {
  View,
  Text,
  Platform,
  StyleSheet,
  Component,
  TextInput
} from 'react-native';

export default class SignIn extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Pronto pra jogar, marreco?</Text>
        <Text>Se perder no zero tem que passar embaixo da mesa hein!</Text>
        <TextInput />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC107'
  }
});
