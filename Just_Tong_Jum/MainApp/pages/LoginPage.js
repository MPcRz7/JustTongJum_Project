import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from './SplashScreen';
import md5 from 'md5';
import App from '../';
import MainStack from '../Stacks/MainStack';
//import { createAppContainer } from 'react-navigation';
//import AsyncStorage from '@react-native-community/async-storage';
//import { ConfirmButton } from '../components/ConfirmButton';

import StaticVariable from '../General/StaticVariable';
import { SafeAreaView, createAppContainer } from 'react-navigation';

export default class Login extends Component {
    state = {
        usernameText: "",
        passwordText: "",
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }

    }

    async componentDidMount() {
        //alert(this.state.usernameText)
        const splashTemp = await this.performTimeConsumingTask();
        if (splashTemp !== null) {
            this.setState({ isLoading: false })
        }
    }

    _findIdbyUsername = async () => {
        const listAllProfiles = await fetch(StaticVariable.FullAddressPath + 'profile', {
            method: 'GET', // List
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const listAllProfilesJson = await listAllProfiles.json()
        const profileMatched = await listAllProfilesJson.filter(item => (item.username == this.state.usernameText))
        if (profileMatched == "") {
            return null //Wrong username
        } else {
            return profileMatched[0]._id
        }
    }

    _forgotPassword = () => {
        alert("This function is in developing period")
    }

    _alertArray = () => {

    }

    _checkUsername = () => {

    }

    _login = async () => {
        const id = await this._findIdbyUsername()
        if (id != null) {
            const profile = await fetch(StaticVariable.FullAddressPath + 'profile/' + id, {
                method: 'GET', //default : GET
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const profileJson = await profile.json()
            //var encode = Base64.encode(this.state.passwordText);
            var md5Password = md5(this.state.passwordText);
            if (profileJson.password == md5Password) {
                this.props.navigation.navigate('GroupList', { userId: profileJson._id, username: profileJson.username, firstname: profileJson.firstname, surname: profileJson.surname }) // Login Success
            } else {
                alert("Wrong password.")
            }
        } else {
            alert("Wrong username.")
        }
    }

    _loginFB = async () => {
        this.props.navigation.navigate('GroupList', { userId: "GuestViaFB", username: "guestViaFB@gmail.com", firstname: "FirstnameFB", surname: "SurnameFB" })
    }

    _loginGuest = () => {
        //this.props.navigation.navigate('GroupList', { userId: "Guest", username: "You logged in as guest.", firstname: "Your", surname: "Name" })
        this.props.navigation.navigate('GroupList', { userId: "Guest", username: "You logged in as guest.", firstname: "Your", surname: "Name" });
        //App = createAppContainer(MainStack);
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') }, 2000
            )
        );
    }

    render() {
        if (this.state.isLoading) {
            return <SplashScreen />
        }
        return (
            <View style={styles.ContainerStyle}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#2A8D83" }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#2A8D83', '#000000']} style={styles.BodyStyle}>
                        <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 170, fontWeight: 'bold' }}>J</Text>
                        </View>
                        <View style={{ flex: 0.30, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: "#FFFFFF", borderBottomWidth: 1 }}>
                                <Image source={require('../icons/Username_FFFFFF.png')} style={{ marginRight: 10, marginBottom: 5 }} />
                                <TextInput
                                    placeholder="Username"
                                    placeholderTextColor="#FFFFFF4F"
                                    onChangeText={(text1) => this.setState({ usernameText: text1 })}
                                    value={this.state.usernameText}
                                    style={styles.TextInputStyle}
                                />
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: "#FFFFFF", borderBottomWidth: 1 }}>
                                    <Image source={require('../icons/Password_FFFFFF.png')} style={{ marginRight: 10, marginBottom: 5 }} />
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor="#FFFFFF4F"
                                        onChangeText={(text2) => this.setState({ passwordText: text2 })}
                                        value={this.state.passwordText}
                                        secureTextEntry={true}
                                        style={styles.TextInputStyle}
                                    />
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end' }} onPress={this._forgotPassword}>
                                    <Text style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 'bold' }}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.35, flexDirection: 'column', justifyContent: 'space-between', alignItems: "center" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "90%" }}>
                                <TouchableOpacity style={{ padding: 15, width: '42%', borderColor: '#FFFFFF', borderWidth: 2, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Register')}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' }}>REGISTER</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 15, width: '42%', backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', borderWidth: 2, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} onPress={this._login}>
                                    <Text style={{ color: "#1A5851", fontSize: 13, fontWeight: 'bold' }}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#FFFFFF', height: 1, width: '32%' }} />
                                <View>
                                    <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' }}>  OR CONNECT WITH  </Text>
                                </View>
                                <View style={{ backgroundColor: '#FFFFFF', height: 1, width: '32%' }} />
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', width: "90%" }}>
                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, width: '100%', borderColor: "#FFFFFF", borderWidth: 2, borderRadius: 30 }} onPress={this._loginFB}>
                                    <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                                        <Image source={require('../icons/Facebook_FFFFFF.png')} />
                                    </View>
                                    <View style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' }}>LOGIN WITH FACEBOOK</Text>
                                    </View>
                                    <View style={{ flex: 0.2 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ margin: 10, padding: 5, justifyContent: 'center', alignItems: 'center' }} onPress={this._loginGuest}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' }}>Login as guest</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 0, backgroundColor: "#000000" }} />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    ContainerStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    BodyStyle: {
        flex: 1,
        padding: 20
    },
    TextInputStyle: {
        width: '100%',
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold"
    },
    TextTopicStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 15,
        fontSize: 15
    },
    ButtonLoginStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF7F',
        borderRadius: 10
    },

})