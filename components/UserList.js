import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight,
  Alert
} from 'react-native';

import Game from './Game';
import FirebaseRef from '../FirebaseRef';
import baseStyles from '../baseStyles';
import Button from './Button';

export default class UserList extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
    this.state = {
      users: [],
      dataSource: ds.cloneWithRows([]),
      game: null
    };
  }

  componentDidMount() {
    FirebaseRef.database().ref('users').once('value', this._addUsers.bind(this));
    FirebaseRef.database().ref('users').on('child_added', this._updateUser.bind(this));
    FirebaseRef.database().ref('games').on('child_added', this._addGame.bind(this));
    FirebaseRef.database().ref('games').on('child_changed', this._updateGame.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.database().ref('users').off('value');
    FirebaseRef.database().ref('users').off('child_added');
    FirebaseRef.database().ref('games').off('child_added');
    FirebaseRef.database().ref('games').off('child_changed');
  }

  _addUsers(snapshot) {
    let value = snapshot.val();
    let users = [];

    Object.keys(value).forEach((key) => {
      let user = Object.assign(value[key], { uid: key });
      if (!this._isCurrentUser(user)) {
        users.push(user);
      }
    });

    this.setState({
      users: users,
      dataSource: this.state.dataSource.cloneWithRows(users)
    });
  }

  _updateUser(data) {
    let user = Object.assign(data.val(), { uid: data.key });
    let users = this.state.users;

    if (!this._isCurrentUser(user)) {
      users = users.concat(user);
    }

    this.setState({
      users: users,
      dataSource: this.state.dataSource.cloneWithRows(users)
    })
  }

  _addGame(data) {
    if (!this.state.game || this.state.game === 'rejected') {
      let game = Object.assign(data.val(), { uid: data.key });

      if (game.status === 'pending' && this._isCurrentUser(game.opponent)) {
        this.setState({ game: game });
        this._inviteToGame();
      }
    }
  }

  _updateGame(data) {
    let game = Object.assign(data.val(), { uid: data.key });

    if (this.state.game && game.uid === this.state.game.uid && this._isCurrentUser(game.challenger)) {

      if (game.status === 'accepted') {
        this.setState({ game: game });
        this._openGame();
      } else if (game.status === 'refused') {
        this._refusedGameInvite();
      }
    }
  }

  render() {
    return(
      <View style={[baseStyles.container, styles.container]}>
        <Text style={[baseStyles.title, styles.title]}>Marrecos</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}/>
      </View>
    );
  }

  _refuseGame() {
    FirebaseRef.database().ref('games/' + this.state.game.uid).update({
      status: 'refused'
    }).then(value => {
      this.setState({ game: null });
    });
  }

  _acceptGame() {
    FirebaseRef.database().ref('games/' + this.state.game.uid).update({
      status: 'accepted'
    }).then(value => {
      this.setState({ game: Object.assign(this.state.game, { status: 'accepted' }) });
      this._openGame();
    });
  }

  _openGame() {
    this.props.navigator.replace({
      title: 'Game',
      component: Game,
      passProps: { game: this.state.game, currentUser: this.props.user }
    });
  }

  _onClick(opponent) {
    var game = {
      challenger: this.props.user,
      opponent: opponent,
      status: 'pending'
    };

    FirebaseRef.database().ref('games').push(game).then(value => {
      this.setState({ game: Object.assign(game, { uid: value.key })});

      Alert.alert(
        'Pede seeeis!',
        `Esperando resposta do marreco: ${this.state.game.opponent.username}`
      );
    });
  }

  _isCurrentUser(user) {
    return this.props.user.uid === user.uid;
  }

  _inviteToGame() {
    if (this._isCurrentUser(this.state.game.challenger)) {
      return;
    }

    Alert.alert(
      'Truco ladrão!',
      `${this.state.game.challenger.username} tá te chamando pro truco. Vai correr?`,
      [
        { text: 'Correr', style: 'cancel', onPress: this._refuseGame.bind(this) },
        { text: 'Desce!', onPress: this._acceptGame.bind(this) },
      ]
    );
  }

  _refusedGameInvite() {
    Alert.alert(
      'Foi pro monte!',
      'Lugar de pato é no monte né, correu o marrecão...'
    );
    this.setState({ game: null });
  }

  _renderRow(rowData, sectionID, rowID) {
    return(
      <View style={styles.row}>
        <Text style={[baseStyles.title, styles.title, baseStyles.subtitle]}>{rowData.username}</Text>
        <Button text='Truco nele!' onPress={() => this._onClick(rowData)} buttonStyle={styles.button} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60
  },
  title: {
    fontSize: 30,
    margin: 10
  },
  button: {
    height: 40,
    padding: 10
  }
});
