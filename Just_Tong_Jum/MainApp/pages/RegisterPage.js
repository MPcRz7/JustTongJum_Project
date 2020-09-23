import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, KeyboardAvoidingViewBase } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import { Base64 } from 'js-base64'
import { sha256 } from 'react-native-sha256';
import md5 from 'md5';
//import { thisExpression, exportDefaultSpecifier } from '@babel/types';

import StaticVariable from '../General/StaticVariable';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ViewBase } from 'react-native';

export default class Register extends Component {
    state = {
        usernameText: "",
        passwordText: "",
        firstnameText: "",
        surnameText: "",
        reconfirmPasswordText: "",
    }
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //     }
    // }

    async componentDidMount() {

    }

    // _convertSHA = (password) => {
    //     sha256(password).then(hash => {
    //         return hash
    //     })
    // }

    _registerSave = async () => {

        //var encode = Base64.encode(this.state.passwordText);
        //this.setState({ encode })
        //var sha256Password = this._convertSHA(this.state.passwordText);
        var md5Password = md5(this.state.passwordText);

        await fetch(StaticVariable.FullAddressPath + 'profile', {
            method: 'POST', //default : GET
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.usernameText,
                password: md5Password,
                firstname: this.state.firstnameText,
                surname: this.state.surnameText
            })
        })
    }

    _alertArray = () => {

    }

    _checkUsername = () => {

    }

    _comparePassword = () => {

    }

    _confirm = async () => {
        if (this.state.usernameText == "" ||
            this.state.passwordText == "" ||
            this.state.reconfirmPasswordText == "" ||
            this.state.firstnameText == "" ||
            this.state.surnameText == "") {
            alert("Please fill all information")
        } else {
            if (!(this.state.passwordText).match(/^[a-zA-Z0-9!@#$%^&*]{6,50}$/)) {
                alert("Wrong type of Password")
            }
            else if (this.state.passwordText != this.state.reconfirmPasswordText) {
                alert("Please reconfirm your password again")
                this.setState({ passwordText: "" })
                this.setState({ reconfirmPasswordText: "" })
            } else {
                await this._registerSave()
                this.props.navigation.navigate('Login')
            }
        }
    }



    render() {
        if (false) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 0.1, backgroundColor: "yellow" }}>
                        <Text>Header</Text>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 0.9, backgroundColor: "red" }} behavior="padding">
                        <ScrollView style={{ flex: 1, backgroundColor: "blue" }}>
                            <View style={{ flex: 1, backgroundColor: "green" }}>
                                <TextInput
                                    placeholder="Username"
                                    onChangeText={(text1) => this.setState({ usernameText: text1 })}
                                    value={this.state.usernameText}
                                    style={styles.TextInputStyle}
                                />
                                <TextInput
                                    placeholder="First name"
                                    onChangeText={(text2) => this.setState({ firstnameText: text2 })}
                                    value={this.state.firstnameText}
                                    style={styles.TextInputStyle}
                                />
                                <TextInput
                                    placeholder="Surname"
                                    onChangeText={(text3) => this.setState({ surnameText: text3 })}
                                    value={this.state.surnameText}
                                    style={styles.TextInputStyle}
                                />
                                <TextInput
                                    placeholder="Password"
                                    onChangeText={(text4) => this.setState({ passwordText: text4 })}
                                    value={this.state.passwordText}
                                    secureTextEntry={true}
                                    style={styles.TextInputStyle}
                                />
                                <TextInput
                                    placeholder="Confirm Password"
                                    onChangeText={(text5) => this.setState({ reconfirmPasswordText: text5 })}
                                    value={this.state.reconfirmPasswordText}
                                    secureTextEntry={true}
                                    style={styles.TextInputStyle}
                                />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#2A8D83" }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#2A8D83', '#000000']} style={styles.ContainerStyle}>
                        <View style={styles.HeaderStyle}>
                            <View style={{ flex: 0.25 }} />
                            <View style={{ flex: 0.75, flexDirection: "row" }}>
                                <TouchableOpacity style={{ flex: 0.2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }} onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../icons/Backward_FFFFFF.png')} />
                                </TouchableOpacity>
                                <View style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 'bold' }}>REGISTER</Text>
                                </View>
                                <View style={{ flex: 0.2 }} />
                            </View>
                        </View>
                        {/* <View style={styles.BodyStyle}> */}
                        {/* <KeyboardAwareScrollView contentContainerStyle={style = { flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}> */}
                            <KeyboardAvoidingView style={styles.BodyStyle} behavior="padding">
                                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: "#1A5851", fontSize: 22, fontWeight: 'bold' }}>Create an account</Text>
                                        </View>
                                        <View style={{ flex: 0.9, justifyContent: "space-evenly", alignItems: "center" }}>
                                            <TextInput
                                                placeholder="Username"
                                                onChangeText={(text1) => this.setState({ usernameText: text1 })}
                                                value={this.state.usernameText}
                                                style={styles.TextInputStyle}
                                            />
                                            <TextInput
                                                placeholder="First name"
                                                onChangeText={(text2) => this.setState({ firstnameText: text2 })}
                                                value={this.state.firstnameText}
                                                style={styles.TextInputStyle}
                                            />
                                            <TextInput
                                                placeholder="Surname"
                                                onChangeText={(text3) => this.setState({ surnameText: text3 })}
                                                value={this.state.surnameText}
                                                style={styles.TextInputStyle}
                                            />
                                            <TextInput
                                                placeholder="Password"
                                                onChangeText={(text4) => this.setState({ passwordText: text4 })}
                                                value={this.state.passwordText}
                                                secureTextEntry={true}
                                                style={styles.TextInputStyle}
                                            />
                                            <TextInput
                                                placeholder="Confirm Password"
                                                onChangeText={(text5) => this.setState({ reconfirmPasswordText: text5 })}
                                                value={this.state.reconfirmPasswordText}
                                                secureTextEntry={true}
                                                style={styles.TextInputStyle}
                                            />
                                        </View>
                                        {/* <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
                                            <Text style={{ textAlign: "center", fontSize: 12, color: "#1A5851" }}>By creating an account you agree to our Terms of Service and Privacy Policy</Text>
                                        </View> */}
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                            <View style={styles.FooterStyle}>
                                <TouchableOpacity style={{ padding: 18, alignSelf: "stretch", backgroundColor: '#FFFFFF', borderRadius: 15, borderColor: "#2A8D83", borderWidth: 3, justifyContent: 'center', alignItems: 'center' }} onPress={this._confirm}>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: "#1A5851" }}>CONTINUE</Text>
                                </TouchableOpacity>
                            </View>
                            {/* </KeyboardAwareScrollView> */}
                        {/* </View> */}
                        
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
        paddingHorizontal: 20,
    },
    HeaderStyle: {
        flex: 0.1,
    },
    BodyStyle: {
        flex: 0.775,
        //flex: 0.825,
        borderRadius: 10,
        backgroundColor: "#FFFFFFE7",
        paddingHorizontal: 25,
        paddingBottom: 10,
        paddingTop: 25,
        marginVertical: 20,
    },
    FooterStyle: {
        flex: 0.125,
        justifyContent: "center"
    },
    TextInputStyle: {
        width: "100%",
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: "#1A5851",
        borderWidth: 1,
        fontSize: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        //marginBottom: 70
    },
    TextTopicStyle: {
        width: '85%',
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