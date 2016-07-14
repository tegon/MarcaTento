import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableHighlight,
} from 'react-native';

import baseStyles from '../baseStyles';
import ScoreButton from './ScoreButton';

export default class Game extends Component {
  componentDidMount() {
    console.log(this.props.game);
  }

  _onClick() {

  }

  render() {
    return(
      <View style={baseStyles.container}>
        <View style={[baseStyles.container, styles.container, styles.scoreContainer]}>
          <Text style={[baseStyles.title, styles.title]}>10</Text>
          <Text style={baseStyles.title}>x</Text>
          <Text style={[baseStyles.title, styles.title]}>2</Text>
        </View>
        <View style={[baseStyles.container, styles.container, styles.usersContainer]}>
          <Text style={[baseStyles.title, styles.title]}>leo</Text>
          <Text style={[baseStyles.title, styles.title]}>gordo</Text>
        </View>
        <View style={[baseStyles.container, styles.buttonsContainer]}>
          <ScoreButton score={'+1'} onClick={this._onClick.bind(this)} />
          <ScoreButton score={'+3'} onClick={this._onClick.bind(this)} />
          <ScoreButton score={'+6'} onClick={this._onClick.bind(this)} />
          <ScoreButton score={'+9'} onClick={this._onClick.bind(this)} />
          <ScoreButton score={'+12'} onClick={this._onClick.bind(this)} />
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
    marginTop: 30,
    flex: .05,
    justifyContent: 'space-around'
  },
  usersContainer: {
    flex: .15,
    justifyContent: 'space-around'
  },
  buttonsContainer: {
    flex: .50,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 30
  }
});
