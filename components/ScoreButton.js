import React, {
  Text,
  StyleSheet,
  Component,
} from 'react-native';

import Button from './Button';

export default class ScoreButton extends Component {
  render() {
    return(
      <Button
        buttonStyle={styles.button}
        onPress={this.props.onClick}
        text={this.props.score}
        buttonTextStyle={styles.buttonText} />
    );
  }
}

var styles = StyleSheet.create({
  button: {
    height: 100,
    borderRadius: 50,
    width: 100,
    margin: 10,
  },
  buttonText: {
    fontSize: 40,
    marginTop: 20,
    marginLeft: 5,
    alignSelf: 'center'
  }
});
