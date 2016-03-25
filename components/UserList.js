import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight
} from 'react-native';

import baseStyles from '../baseStyles';

export default class UserList extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['leo', 'careca', 'gordo'])
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

  _onClick() {
  }

  _renderRow(rowData, sectionID, rowID) {
    return(
      <View style={styles.row}>
        <Text style={[baseStyles.title, styles.title, baseStyles.subtitle]}>{rowData}</Text>
        <TouchableHighlight style={[baseStyles.button, styles.button]} onPress={this._onClick.bind(this)}  underlayColor='#FFE082'>
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
