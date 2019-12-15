'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

import ListView from 'deprecated-react-native-listview';

class Other extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([
                {name: appConfig.language.reports, id: 1},
                {name: appConfig.language.projects, id: 2},
                {name: appConfig.language.departments, id: 3},
                {name: appConfig.language.employees, id: 4},
                {name: appConfig.language.resources, id: 5},
                {name: appConfig.language.users, id: 6},
                {name: appConfig.language.audit, id: 7},
                {name: appConfig.language.config, id: 8},
                {name: appConfig.language.logout, id: 9}
            ]),
            showProgress: true,
            resultsCount: 9,
            recordsCount: 25,
            positionY: 0
        };
    }

    showDetails(rowData) {
        console.log(appConfig)
        switch (rowData.id) {
            case 1:
                this.props.navigation.navigate('Search');
                break;

            case 2:
                this.props.navigation.navigate('Projects');
                break;

            case 3:
                this.props.navigation.navigate('Departments');
                break;

            case 4:
                this.props.navigation.navigate('Employees');
                break;

            case 5:
                this.props.navigation.navigate('Resources');
                break;

            case 6:
                this.props.navigation.navigate('Users');
                break;

            case 7:
                this.props.navigation.navigate('Audit');
                break;

            case 8:
                this.props.navigation.navigate('Config');
                break;

            case 9:
                appConfig.onLogOut();
                break;
        }
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textLarge}>
                                    {appConfig.language.other}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <ScrollView>
                    <ListView
                        enableEmptySections={true}
                        style={{marginTop: 0, marginBottom: 0}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View style={{marginBottom: 0}}>
                    <Text style={styles.countFooter}>
                        {appConfig.language.records} {this.state.resultsCount}
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderTopWidth: 1,
        borderColor: 'white'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 13,
        paddingRight: 10,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default Other;
