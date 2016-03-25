import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableHighlight,
} from 'react-native';

import baseStyles from '../baseStyles';

export default class Game extends Component {
  _onClick() {

  }

  render() {
    return(
      <View style={baseStyles.container}>
        <View style={[baseStyles.container, styles.container, styles.scoreContainer]}>
          <Text style={baseStyles.title}>10</Text>
          <Text style={baseStyles.title}>x</Text>
          <Text style={baseStyles.title}>2</Text>
        </View>
        <View style={[baseStyles.container, styles.container, styles.usersContainer]}>
          <Text style={baseStyles.title}>leo</Text>
          <Text style={baseStyles.title}>gordo</Text>
        </View>
        <View style={baseStyles.container}>
          <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
            <Text style={baseStyles.buttonText}>+1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
            <Text style={baseStyles.buttonText}>+3</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
            <Text style={baseStyles.buttonText}>+6</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
            <Text style={baseStyles.buttonText}>+9</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
            <Text style={baseStyles.buttonText}>+12</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10
  },
  scoreContainer: {
    flex: .05,
    justifyContent: 'space-around'
  },
  usersContainer: {
    flex: .80,
    justifyContent: 'space-around'
  }
});
