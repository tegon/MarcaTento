import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView
} from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.title}>Marrecos</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={[styles.title, styles.subtitle]}>{rowData}</Text>}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Trebuchet MS',
    margin: 10
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal'
  }
});
