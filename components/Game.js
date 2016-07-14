import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableHighlight,
  Alert
} from 'react-native';

import baseStyles from '../baseStyles';
import ScoreButton from './ScoreButton';
import UserList from './UserList';
import FirebaseRef from '../FirebaseRef';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      score: {
        challenger: 0,
        opponent: 0
      }
    };
  }

  componentDidMount() {
    FirebaseRef.database().ref('games').on('child_changed', this._updateGame.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.database().ref('games').off('child_changed');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.state.score);
    if (this.state.score.challenger === 12) {
      this._isCurrentUser(this.props.game.challenger) ? this._showWinnerDialog() : this._showLoserDialog();
    } else if (this.state.score.opponent === 12) {
      this._isCurrentUser(this.props.game.opponent) ? this._showWinnerDialog() : this._showLoserDialog();
    }
  }

  _showLoserDialog() {
    Alert.alert(
      'Perdeu marreco!',
      'Perdeu hein, que tal uma revanche?',
      [
        { text: 'OK', style: 'cancel', onPress: this._openUserList.bind(this) }
      ]
    );
  }

  _showWinnerDialog() {
    Alert.alert(
      'Ganhou marreco!',
      'Tá facil ganhar desse pato hein, que tal desafiar outro?',
      [
        { text: 'OK', style: 'cancel', onPress: this._openUserList.bind(this) }
      ]
    );
  }

  _openUserList() {
    this.props.navigator.replace({
      title: 'UserList',
      component: UserList,
      passProps: { user: this.props.currentUser }
    });
  }

  _updateGame(data) {
    let game = Object.assign(data.val(), { uid: data.key });

    if (game.uid === this.props.game.uid && (game.score.challenger !== this.state.score.challenger || game.score.opponent !== this.state.score.opponent)) {
      this.setState({ score: game.score });
    }
  }

  _addScore(score) {
    var newScore;

    if (this._isCurrentUser(this.props.game.challenger)) {
      newScore = Object.assign(this.state.score, { challenger: this.state.score.challenger + score });
    } else {
      newScore = Object.assign(this.state.score, { opponent: this.state.score.opponent + score });
    }

    if (newScore.challenger > 12 || newScore.opponent > 12) {
      return;
    }

    this.setState({ score: newScore });
    FirebaseRef.database().ref('games/' + this.props.game.uid).update({ score: newScore });
  }

  _isCurrentUser(user) {
    return this.props.currentUser.uid === user.uid;
  }

  render() {
    return(
      <View style={baseStyles.container}>
        <View style={[baseStyles.container, styles.container, styles.scoreContainer]}>
          <Text style={[baseStyles.title, styles.title]}>{this.state.score.challenger}</Text>
          <Text style={baseStyles.title}>x</Text>
          <Text style={[baseStyles.title, styles.title]}>{this.state.score.opponent}</Text>
        </View>
        <View style={[baseStyles.container, styles.container, styles.usersContainer]}>
          <Text style={[baseStyles.title, styles.title]}>{this.props.game.challenger.username}</Text>
          <Text style={[baseStyles.title, styles.title]}>{this.props.game.opponent.username}</Text>
        </View>
        <View style={[baseStyles.container, styles.buttonsContainer]}>
          <ScoreButton score={'+1'} onClick={() => this._addScore(1)} />
          <ScoreButton score={'+3'} onClick={() => this._addScore(3)} />
          <ScoreButton score={'+6'} onClick={() => this._addScore(6)} />
          <ScoreButton score={'+9'} onClick={() => this._addScore(9)} />
          <ScoreButton score={'+12'} onClick={() => this._addScore(12)} />
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
    fontSize: 30,
  }
});
