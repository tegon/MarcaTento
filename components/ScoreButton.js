import React, {
  Text,
  StyleSheet,
  Component,
  TouchableHighlight,
} from 'react-native';

import baseStyles from '../baseStyles';

export default class ScoreButton extends Component {
  render() {
    return(
      <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this.props.onClick}  underlayColor='#FFE082'>
        <Text style={[baseStyles.buttonText, styles.buttonText]}>{this.props.score}</Text>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    height: 100,
    borderRadius: 50,
    width: 100,
    margin: 10
  },
  buttonText: {
    fontSize: 40,
    marginTop: 20,
    marginLeft: 5
  }
});
