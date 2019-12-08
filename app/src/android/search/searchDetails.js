import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    BackHandler,
    Alert
} from 'react-native';

class SearchDetails extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigation) {
                this.props.navigation.pop();
            }
            return true;
        });

        this.state = {
            serverError: false
        };

        this.state = {
            id: appConfig.item.id,
            invoiceID: appConfig.item.invoiceID,
            date: appConfig.item.date,
            project: appConfig.item.project,
            projectID: appConfig.item.projectID,
            department: appConfig.item.department,
            departmentID: appConfig.item.departmentID,
            employee: appConfig.item.employee,
            employeeID: appConfig.item.employeeID,
            product: appConfig.item.product,
            productID: appConfig.item.productID,
            description: appConfig.item.description,

            priceShow: ((+appConfig.item.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
            quantityShow: ((+appConfig.item.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
            totalShow: ((+appConfig.item.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),

            price: appConfig.item.price,
            quantity: appConfig.item.quantity,
            total: appConfig.item.total,
            showProgress: false,
            serverError: false
        };
    }

    deleteItemDialog() {
        Alert.alert(
            'Delete record',
            'Are you sure you want to delete record ' + this.state.invoiceID + '?',
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

        fetch(appConfig.url + 'api/outputs/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                date: this.state.date,
                department: this.state.department,
                departmentID: this.state.departmentID,
                description: this.state.description,
                employee: this.state.employee,
                employeeID: this.state.employeeID,
                invoiceID: this.state.invoiceID,
                price: this.state.price,
                product: this.state.product,
                productID: this.state.productID,
                project: this.state.project,
                projectID: this.state.projectID,
                quantity: this.state.quantity,
                total: this.state.total,
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
                if (responseData) {
                    appConfig.outputs.refresh = true;
                    appConfig.assets.refresh = true;
                    appConfig.projects.refresh = true;
                    appConfig.departments.refresh = true;
                    appConfig.employees.refresh = true;
                    this.props.navigator.pop();
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
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            underlayColor='darkblue'>
                            <Text style={styles.textSmall}>
                                {appConfig.language.back}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='#ddd'>
                            <Text style={styles.textLarge}>
                                {this.state.project}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='#ddd'>
                            <Text style={styles.textSmall}>
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.form}>
                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                ID:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.invoiceID}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.date}:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.date}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.project}:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.project}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.department}:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.department}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.employee}:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.employee}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.resource}:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.product}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.price}:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.priceShow}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.quantity}:
                            </Text>
                            <Text style={styles.itemText}>
                                {this.state.quantityShow}
                            </Text>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                {appConfig.language.description}:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.description}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.itemTextBold}>
                            {appConfig.language.total}: {this.state.totalShow}
                        </Text>

                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                {appConfig.language.back}
                            </Text>
                        </TouchableHighlight>

                        <Text>{this.state.bugANDROID}</Text>
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
        borderTopWidth: 1,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginRight: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    itemBlock: {
        flexDirection: 'row'
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    itemTextBold: {
        fontSize: 18,
        textAlign: 'left',
        margin: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 18,
        textAlign: 'left',
        margin: 5,
        marginLeft: 2,
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
    }
});

export default SearchDetails;
