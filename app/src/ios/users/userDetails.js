'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

class UserDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: appConfig.users.item.id,
            name: appConfig.users.item.name,
            pass: appConfig.users.item.pass,
            description: appConfig.users.item.description,
            showProgress: false
        };
    }

    updateItem() {
        if (this.state.name === undefined || this.state.pass === '' ||
            this.state.description === undefined || this.state.description === '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/users/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                pass: this.state.pass,
                description: this.state.description,
                authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.pass) {
                    this.props.navigation.navigate('Users', {refresh: true});
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
                }
            ]
        )
    }

    deleteItem() {
        this.setState({
            showProgress: true,
            bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/users/delete', {
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
                if (responseData.text) {
                    this.props.navigation.navigate('Users', {refresh: true});
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

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let errorCtrl, validCtrl;

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

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            underlayColor='darkblue'>
                            <View>
                                <Text style={styles.textSmall}>
                                    {appConfig.language.back}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableWithoutFeedback underlayColor='#ddd'>
                            <View>
                                <Text style={styles.textLarge}>
                                    {this.state.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.deleteItemDialog()}
                            underlayColor='darkblue'>
                            <View>
                                <Text style={styles.textSmall}>
                                    {appConfig.language.delete}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.inputBlock}>

                        <TextInput
                            onChangeText={(text) => this.setState({
                                name: text,
                                invalidValue: false
                            })}
                            style={styles.formInputBold}
                            value={this.state.name}
                            placeholder={appConfig.language.login}>
                        </TextInput>

                        <TextInput
                            onChangeText={(text) => this.setState({
                                pass: text,
                                invalidValue: false
                            })}
                            style={styles.loginInput}
                            value={this.state.pass}
                            placeholder={appConfig.language.pass}>
                        </TextInput>

                        <TextInput
                            multiline={true}
                            onChangeText={(text) => this.setState({
                                description: text,
                                invalidValue: false
                            })}
                            style={styles.formInputArea}
                            value={this.state.description}
                            placeholder={appConfig.language.description}>
                        </TextInput>

                        {validCtrl}

                        <TouchableHighlight
                            onPress={() => this.updateItem()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                {appConfig.language.submit}
                            </Text>
                        </TouchableHighlight>

                        {errorCtrl}

                        <ActivityIndicator
                            animating={this.state.showProgress}
                            size="large"
                            color="darkblue"
                            style={styles.loader}
                        />
                    </View>
                </ScrollView>
            </View>
        );
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
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    formInputBold: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    formInputArea: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    inputBlock: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start'
    },
    button: {
        height: 50,
        backgroundColor: 'darkblue',
        alignSelf: 'stretch',
        marginTop: 20,
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
        paddingTop: 15,
        textAlign: 'center'
    }
});

export default UserDetails;
