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
import baseStyles from '../baseStyles';
import FirebaseRef from '../FirebaseRef';

export default class UserList extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      game: null
    };
  }

  componentDidMount() {
    this.ref = FirebaseRef.listenTo('users', {
      context: this,
      asArray: true,
      then(data) {
        let users = data.filter((user) => user.name !== this.props.user.name);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(users)
        });
      }
    });
  }

  componentWillUnmount(){
    FirebaseRef.removeBinding(this.ref);
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

  }

  _acceptGame() {
    this.props.navigator.push({
      title: 'Game',
      component: Game
    });
  }

  _onClick(sectionID, rowID) {
    let opponent = this.state.dataSource._dataBlob[sectionID][rowID];
    FirebaseRef.push('games', {
      data: {
        challenger: this.props.user,
        opponent: opponent,
        status: 'pending'
      },
      then(data) {
        console.log('push', data)
      }
    });
  }

  _isCurrentUser(user) {
    return this.props.user.name === user.name;
  }

  _inviteToGame() {
    if (this._isCurrentUser(this.state.game.opponent)) {
      return;
    }

    Alert.alert(
      'Truco ladrão!',
      `${this.state.game.opponent} tá te chamando pro truco. Vai correr?`,
      [
        { text: 'Correr', style: 'cancel', onPress: this._refuseGame.bind(this) },
        { text: 'Desce!', onPress: this._acceptGame.bind(this) },
      ]
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return(
      <View style={styles.row}>
        <Text style={[baseStyles.title, styles.title, baseStyles.subtitle]}>{rowData.name}</Text>
        <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={() => this._onClick(sectionID, rowID)}  underlayColor='#FFE082'>
          <Text style={baseStyles.buttonText}>Truco nele!</Text>
        </TouchableHighlight>
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
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    margin: 10
  },
  button: {
    height: 30
  }
});
