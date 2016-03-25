import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView
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
          renderRow={(rowData) => <Text style={[baseStyles.title, styles.title, baseStyles.subtitle]}>{rowData}</Text>}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: 30,
    margin: 10
  },
});
