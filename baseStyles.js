import React, {
  StyleSheet,
  Platform
} from 'react-native';

var fontFamily = Platform.OS === 'ios' ? 'Trebuchet MS' : 'Roboto';
var baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: fontFamily
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal'
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
    borderRadius: 5
  }
});

export default baseStyles;
