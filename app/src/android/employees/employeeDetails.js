import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Alert,
    BackHandler
} from 'react-native';

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        this.state = {
            serverError: false
        };

        this.state = {
            id: appConfig.item.id,
            name: appConfig.item.name,
            address: appConfig.item.address,
            phone: appConfig.item.phone,
            departmentID: appConfig.item.departmentID,
            department: appConfig.item.department,
            departmentShow: 'Department: ' + appConfig.item.department,
            description: appConfig.item.description,
            sumShow: ((+appConfig.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
            sum: appConfig.item.sum,
            showProgress: false
        };
    }

    updateItem() {
        if (this.state.name === '' ||
            this.state.address === '' ||
            this.state.phone === '' ||
            this.state.sum === '' ||
            this.state.departmentID === '' ||
            this.state.department === '' ||
            this.state.description === '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true,
        });

        fetch(appConfig.url + 'api/employees/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                address: this.state.address,
                phone: this.state.phone,
                department: this.state.department,
                departmentID: this.state.departmentID,
                description: this.state.description,
                sum: this.state.sum,
                authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    appConfig.employees.refresh = true;
                    this.props.navigation.pop();
                } else {
                    this.setState({
                        badCredentials: true
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    deleteItemDialog() {
        Alert.alert(
            appConfig.language.delrec,
            appConfig.language.conform + this.state.name + '?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {
                    text: 'OK', onPress: () => {
                        this.deleteItem();
                    }
                },
            ]
        );
    }

    deleteItem() {
        this.setState({
            showProgress: true,
            bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/employees/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.text) {
                    appConfig.employees.refresh = true;
                    this.props.navigation.pop();
                } else {
                    this.setState({
                        badCredentials: true
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });

    }

    goBack() {
        this.props.navigation.pop();
    }

    render() {
        let errorCtrl, validCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="darkblue"
                    animating={true}
                />
            </View>;
        }

        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'darkblue',
                    borderWidth: 0,
                    borderColor: 'whitesmoke',
                    borderTopWidth: 1,
                }}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            underlayColor='darkblue'>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                margin: 14,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                {appConfig.language.back}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='#ddd'>
                            <Text style={{
                                fontSize: 20,
                                textAlign: 'center',
                                margin: 10,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                {this.state.name}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.deleteItemDialog()}
                            underlayColor='darkblue'>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                margin: 14,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                {appConfig.language.delete}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView keyboardShouldPersistTaps={true}>
                    {errorCtrl}
                    {loader}

                    <View style={{
                        flex: 1,
                        padding: 10,
                        paddingBottom: 0,
                        justifyContent: 'flex-start',
                        backgroundColor: 'white'
                    }}>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            multiline={true}
                            editable={false}
                            style={styles.loginInputBold}
                            value={this.state.name}
                            placeholderTextColor='gray'
                            placeholder="Name">
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            multiline={true}
                            editable={false}
                            style={styles.loginInputBold}
                            value={this.state.department}
                            placeholderTextColor='gray'
                            placeholder="Department">
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                address: text,
                                invalidValue: false
                            })}
                            style={styles.loginInput}
                            value={this.state.address}
                            placeholderTextColor='gray'
                            placeholder={appConfig.language.address}>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                phone: text,
                                invalidValue: false
                            })}
                            style={styles.loginInput}
                            value={this.state.phone}
                            placeholderTextColor='gray'
                            placeholder={appConfig.language.phone}>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                description: text,
                                invalidValue: false
                            })}
                            style={styles.loginInput1}
                            value={this.state.description}
                            placeholderTextColor='gray'
                            placeholder={appConfig.language.description}>
                        </TextInput>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10
                        }}>
                            <Text style={styles.itemTextBold}>
                                Total: {this.state.sumShow}
                            </Text>
                        </View>

                        {validCtrl}

                        <TouchableHighlight
                            onPress={() => this.updateItem()}

                            style={styles.button}>
                            <Text style={styles.buttonText}>{appConfig.language.submit}</Text>
                        </TouchableHighlight>

                        {errorCtrl}

                        <ActivityIndicator
                            animating={this.state.showProgress}
                            size="large"
                            style={styles.loader}
                        />

                        <Text>{this.state.bugANDROID}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemTextBold: {
        fontSize: 20,
        textAlign: 'left',
        margin: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 20,
        textAlign: 'left',
        margin: 5,
        marginLeft: 2,
        color: 'black'
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'darkblue',
        borderRadius: 5,
        color: 'black'
    },
    loginInputBold: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'darkblue',
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    loginInput1: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'darkblue',
        borderRadius: 5,
        color: 'black'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    }
});

export default EmployeeDetails;
