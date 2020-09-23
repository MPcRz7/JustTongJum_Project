import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
//import ModalDropdown from 'react-native-modal-dropdown';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
//import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmButton } from '../components/ConfirmButton';
import { ModalDropdown } from '../components/ModalDropdown';
import { Header } from '../components/Header';

import StaticVariable from '../General/StaticVariable';
import { ScrollView } from 'react-native-gesture-handler';

export default class NewVocab extends Component {
    state = {
        currentState: this.props.navigation.state.params.currentState,

        groupId: this.props.navigation.state.params.groupId,

        groupData: this.props.navigation.state.params.groupData,

        totalVocab: 0,

        currentGroupName: this.props.navigation.state.params.groupData.groupName,
        currentIndexGroup: this.props.navigation.state.params.groupData.groupOrder,
        currentFirstLabel: "",
        currentSecondLabel: "",
        currentThirdLabel: "",
        currentForthLabel: "",

        editVocab: [],
        currentFirstText: "",
        currentSecondText: "",
        currentThirdText: "",
        currentForthText: "",

        currentThirdEnable: false,
        currentForthEnable: false,

        editingFirstLabel: "",
        editingSecondLabel: "",
        editingThirdLabel: "",
        editingForthLabel: "",
        editingFirstText: "",
        editingSecondText: "",
        editingThirdText: "",
        editingForthText: "",
        editingThirdEnable: false,
        editingForthEnable: false,

        allCurrentGroupNameList: this.props.navigation.state.params.allCurrentGroupNameList,

        indexEditVocab: 0,
        GroupVocabArray: [],
        keys: [],

        isLoading: true
    }
    // constructor(props) {
    //     super(props)
    //     this.state = {

    //     }

    // }

    async componentDidMount() {

        //API

        this.setState({ currentFirstLabel: this.state.groupData.firstLabel })
        this.setState({ currentSecondLabel: this.state.groupData.secondLabel })
        this.setState({ currentThirdLabel: this.state.groupData.thirdLabel })
        this.setState({ currentForthLabel: this.state.groupData.forthLabel })
        this.setState({ currentThirdEnable: this.state.groupData.thirdEnable })
        this.setState({ currentForthEnable: this.state.groupData.forthEnable })

        this.setState({ editingFirstLabel: this.state.groupData.firstLabel })
        this.setState({ editingSecondLabel: this.state.groupData.secondLabel })
        this.setState({ editingThirdLabel: this.state.groupData.thirdLabel })
        this.setState({ editingForthLabel: this.state.groupData.forthLabel })
        this.setState({ editingThirdEnable: this.state.groupData.thirdEnable })
        this.setState({ editingForthEnable: this.state.groupData.forthEnable })

        if (this.state.currentState == "Create new word") {
            this.setState({ totalVocab: this.props.navigation.state.params.dataLength })
        }

        if (this.state.currentState == "Word's details") {

            const editVocab = this.props.navigation.state.params.editVocab
            this.setState({ editVocab })
            this.setState({ currentFirstText: editVocab.firstText })
            this.setState({ currentSecondText: editVocab.secondText })
            this.setState({ currentThirdText: editVocab.thirdText })
            this.setState({ currentForthText: editVocab.forthText })

            this.setState({ editingFirstText: editVocab.firstText })
            this.setState({ editingSecondText: editVocab.secondText })
            this.setState({ editingThirdText: editVocab.thirdText })
            this.setState({ editingForthText: editVocab.forthText })

        }

        this.setState({ isLoading: false })
    }

    _checknamingRule = async () => {
        if (this.state.editingFirstLabel.length > 10 ||
            this.state.editingSecondLabel.length > 10 ||
            this.state.editingThirdLabel.length > 10 ||
            this.state.editingForthLabel.length > 10
        ) {
            alert("Your Label is too long")
        } else if (this.state.currentFirstText.length > 20 ||
            this.state.currentSecondText.length > 20 ||
            this.state.currentThirdText.length > 20 ||
            this.state.currentForthText.length > 20
        ) {
            alert("Your Text is too long")
        } else {
            if (this.state.currentState == "Create new word") {
                this._saveButton()
            } else if (this.state.currentState == "Edit word") {
                this._saveButtonEditVocab()
            } else {
                alert("something error")
            }
        }
    }

    _addNewWord = () => {
        this.setState({ currentState: "Word's details" })
    }

    _cancelButton = () => {
        //await this.setState({ isLoading: true })
        this._resetAllEditingToCurrent()
        this.setState({ currentState: "Word's details" })
        //this.setState({ isLoading: false })
    }

    _setAllCurrentToEdited = () => {
        this.setState({ currentFirstLabel: this.state.editingFirstLabel })
        this.setState({ currentSecondLabel: this.state.editingSecondLabel })
        this.setState({ currentThirdLabel: this.state.editingThirdLabel })
        this.setState({ currentForthLabel: this.state.editingForthLabel })

        this.setState({ currentThirdEnable: this.state.editingThirdEnable })
        this.setState({ currentForthEnable: this.state.editingForthEnable })

        this.setState({ currentFirstText: this.state.editingFirstText })
        this.setState({ currentSecondText: this.state.editingSecondText })
        this.setState({ currentThirdText: this.state.editingThirdText })
        this.setState({ currentForthText: this.state.editingForthText })
    }

    _resetAllEditingToCurrent = () => {
        this.setState({ editingFirstLabel: this.state.currentFirstLabel })
        this.setState({ editingSecondLabel: this.state.currentSecondLabel })
        this.setState({ editingThirdLabel: this.state.currentThirdLabel })
        this.setState({ editingForthLabel: this.state.currentForthLabel })

        this.setState({ editingThirdEnable: this.state.currentThirdEnable })
        this.setState({ editingForthEnable: this.state.currentForthEnable })

        this.setState({ editingFirstText: this.state.currentFirstText })
        this.setState({ editingSecondText: this.state.currentSecondText })
        this.setState({ editingThirdText: this.state.currentThirdText })
        this.setState({ editingForthText: this.state.currentForthText })
    }

    _setAllTextEditingToEmpty = () => {
        this.setState({ editingFirstText: "" })
        this.setState({ editingSecondText: "" })
        this.setState({ editingThirdText: "" })
        this.setState({ editingForthText: "" })
    }

    _editVocab = async () => {
        // await this.setState({ isLoading: true })
        this.setState({ currentState: "Edit word" })
        // this.setState({ isLoading: false })
    }

    _saveButton = async () => {

        await fetch(StaticVariable.FullAddressPath + 'vocab/', {
            method: 'POST', //Post
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupVocabId: this.state.groupId, //change to dropdown later
                firstText: this.state.editingFirstText,
                secondText: this.state.editingSecondText,
                thirdText: this.state.editingThirdText,
                forthText: this.state.editingForthText,
                vocabOrder: this.state.totalVocab, //depend on save before or after data update
                check: true
            })
        })

        await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + this.state.groupData._id, {
            method: 'PUT', //Put
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.groupData.userId,
                groupName: this.state.groupData.groupName,
                firstLabel: this.state.editingFirstLabel,
                secondLabel: this.state.editingSecondLabel,
                thirdEnable: this.state.editingThirdEnable,
                forthEnable: this.state.editingForthEnable,
                thirdLabel: this.state.editingThirdLabel,
                forthLabel: this.state.editingForthLabel,
                groupOrder: this.state.groupData.groupOrder,
                titleNumber: this.state.groupData.titleNumber,
                subtitleNumber: this.state.groupData.subtitleNumber
            })
        })

        this._setAllCurrentToEdited()
        this.setState({ totalVocab: this.state.totalVocab + 1 })
        this._setAllTextEditingToEmpty()
        alert("Add new vocab successfully");
    }

    _saveButtonEditVocab = async () => {
        //await this.setState({ isLoading: true })

        //API
        await fetch(StaticVariable.FullAddressPath + 'vocab/' + this.state.editVocab._id, {
            method: 'PUT', //Put
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupVocabId: this.state.editVocab.groupVocabId,
                firstText: this.state.editingFirstText,
                secondText: this.state.editingSecondText,
                thirdText: this.state.editingThirdText,
                forthText: this.state.editingForthText,
                vocabOrder: this.state.editVocab.vocabOrder,
                check: this.state.editVocab.check
            })
        })

        if (this.state.currentFirstLabel != this.state.editingFirstLabel ||
            this.state.currentSecondLabel != this.state.editingSecondLabel ||
            this.state.currentThirdEnable != this.state.editingThirdEnable ||
            this.state.currentForthEnable != this.state.editingForthEnable ||
            this.state.currentThirdLabel != this.state.editingThirdLabel ||
            this.state.currentForthLabel != this.state.editingForthLabel
        ) {
            await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + this.state.groupData._id, {
                method: 'PUT', //Put
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.state.groupData.userId,
                    groupName: this.state.groupData.groupName,
                    firstLabel: this.state.editingFirstLabel,
                    secondLabel: this.state.editingSecondLabel,
                    thirdEnable: this.state.editingThirdEnable,
                    forthEnable: this.state.editingForthEnable,
                    thirdLabel: this.state.editingThirdLabel,
                    forthLabel: this.state.editingForthLabel,
                    groupOrder: this.state.groupData.groupOrder,
                    titleNumber: this.state.groupData.titleNumber,
                    subtitleNumber: this.state.groupData.subtitleNumber
                })
            })
        }

        this._setAllCurrentToEdited()
        this.setState({ currentState: "Word's details" })

        //this.setState({ isLoading : false })
    }

    _checkInformationChanged = () => {
        if (this.state.currentFirstLabel != this.state.editingFirstLabel ||
            this.state.currentSecondLabel != this.state.editingSecondLabel ||
            this.state.currentThirdEnable != this.state.editingThirdEnable ||
            this.state.currentForthEnable != this.state.editingForthEnable ||
            this.state.currentThirdLabel != this.state.editingThirdLabel ||
            this.state.currentForthLabel != this.state.editingForthLabel ||
            this.state.currentFirstText != this.state.editingFirstText ||
            this.state.currentSecondText != this.state.editingSecondText ||
            this.state.currentThirdText != this.state.editingThirdText ||
            this.state.currentForthText != this.state.editingForthText
        ) {
            return true
        } else {
            return false
        }
    }

    _twoLabels = () => {
        this.setState({ editingThirdEnable: false })
        this.setState({ editingForthEnable: false })
    }

    _threeLabels = () => {
        this.setState({ editingThirdEnable: true })
        this.setState({ editingForthEnable: false })
    }

    _fourLabels = () => {
        this.setState({ editingThirdEnable: true })
        this.setState({ editingForthEnable: true })
    }

    _alertArray = () => {
        alert(this.state.GroupVocabArray)
    }

    _refreshRender = () => {
        this.forceUpdate();
    }

    render() {
        if (this.state.isLoading == true) {
            return (
                <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text>Loading...</Text>
                </SafeAreaView>)
        } else {
            return (
                <View style={styles.ContainerStyle}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A5851" }}>
                        <MenuProvider>
                        {/* <LinearGradient style={styles.HeaderStyle} start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }} colors={['#1A5851', '#000000']}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5, alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={() => this.props.navigation.goBack()}>
                                        <Image source={require('../icons/Backward_FFFFFF.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 'bold' }}>{this.state.currentState}</Text>
                                </View>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    {this.state.currentState != "Word's details" && <Menu>
                                        <MenuTrigger>
                                            <Image source={require('../icons/More_FFFFFF.png')} style={[styles.ButtonHeaderStyle, { margin: 10 }]} />
                                        </MenuTrigger>
                                        <MenuOptions>
                                            <MenuOption onSelect={this._twoLabels}>
                                                <Text style={{ color: "#696969" }}>2 Labels</Text>
                                            </MenuOption>
                                            <MenuOption onSelect={this._threeLabels} >
                                                <Text style={{ color: "#696969" }}>3 Labels</Text>
                                            </MenuOption>
                                            <MenuOption onSelect={this._fourLabels} >
                                                <Text style={{ color: "#696969" }}>4 Labels</Text>
                                            </MenuOption>
                                        </MenuOptions>
                                    </Menu>}
                                </View>
                            </View>
                        </LinearGradient> */}
                        <View style={styles.HeaderStyle}>
                            <Header
                                TitleName={this.state.currentState}
                                VisibleBackButton={true}
                                VisibleEditButton={false}
                                EnableEditing={false}
                                VisibleEditLabelButton={true}
                                onGoBack={() => this.props.navigation.goBack()}
                                onTwoLabels={this._twoLabels}
                                onThreeLabels={this._threeLabels}
                                onFourLabels={this._fourLabels}
                            />
                        </View>
                        <ScrollView style={ styles.BodyStyle} contentContainerStyle={{ flex: 1 }}>
                        <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" keyboardVerticalOffset="40">
                            {/* <ScrollView style={{ flex:1 }} contentContainerStyle={{ flex: 1 }}> */}
                            <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15 }}>Deck name</Text>
                                <View style={{ borderColor: "#1A5851", borderRadius: 5, borderWidth: 3, width: "60%" }}>
                                    <ModalDropdown options={this.state.allCurrentGroupNameList}
                                        style={this.state.currentState == "Create new word" ? { backgroundColor: '#EAEAEA' } : { backgroudColor: "" }}
                                        textStyle={{ color: this.state.currentState == "Create new word" ? "#696969" : "#1A5851", fontSize: 15, fontWeight: 'bold', marginVertical: 5, textAlign: "center" }}
                                        disabled={this.state.currentState != "Create new word"}
                                        defaultValue={this.state.currentGroupName}
                                        defaultIndex={this.state.currentIndexGroup}
                                        dropdownStyle={{ borderColor: "#1A5851", borderWidth: 3, borderRadius: 10, width: "56%" }}
                                        dropdownTextStyle={{ color: "#2A8D83", fontSize: 15, fontWeight: 'bold' }}
                                        dropdownTextHighlightStyle={{ color: "purple" }}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                                <View style={styles.PlainTextTopicStyle}>
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentFirstLabel}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type Language"
                                        onChangeText={(text1) => this.setState({ editingFirstLabel: text1 })}
                                        value={this.state.editingFirstLabel}
                                        style={styles.TextInputTopicStyle}
                                    />}
                                </View>
                                <View style={styles.PlainTextStyle} >
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 'bold' }}>{this.state.currentFirstText}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" &&
                                        <TextInput
                                            placeholder="Type what you want to remember"
                                            onChangeText={(text1) => this.setState({ editingFirstText: text1 })}
                                            value={this.state.editingFirstText}
                                            style={styles.TextInputStyle}
                                        />}
                                </View>
                            </View>
                            <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                                <View style={styles.PlainTextTopicStyle}>
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentSecondLabel}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type Language"
                                        onChangeText={(text2) => this.setState({ editingSecondLabel: text2 })}
                                        value={this.state.editingSecondLabel}
                                        style={styles.TextInputTopicStyle}
                                    />}
                                </View>
                                <View style={styles.PlainTextStyle} >
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.currentSecondText}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type what you want to remember"
                                        onChangeText={(text2) => this.setState({ editingSecondText: text2 })}
                                        value={this.state.editingSecondText}
                                        style={styles.TextInputStyle}
                                    />}
                                </View>
                            </View>
                            {this.state.editingThirdEnable && <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                                <View style={styles.PlainTextTopicStyle}>
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentThirdLabel}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type Language"
                                        onChangeText={(text3) => this.setState({ editingThirdLabel: text3 })}
                                        value={this.state.editingThirdLabel}
                                        style={styles.TextInputTopicStyle}
                                    />}
                                </View>
                                <View style={styles.PlainTextStyle} >
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.currentThirdText}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type what you want to remember"
                                        onChangeText={(text3) => this.setState({ editingThirdText: text3 })}
                                        value={this.state.editingThirdText}
                                        style={styles.TextInputStyle}
                                    />}
                                </View>
                            </View>}
                            {this.state.editingForthEnable && <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                                <View style={styles.PlainTextTopicStyle}>
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentForthLabel}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type Language"
                                        onChangeText={(text4) => this.setState({ editingForthLabel: text4 })}
                                        value={this.state.editingForthLabel}
                                        style={styles.TextInputTopicStyle}
                                    />}
                                </View>
                                <View style={styles.PlainTextStyle} >
                                    {this.state.currentState == "Word's details" &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.currentForthText}</Text>
                                        </LinearGradient>}
                                    {this.state.currentState != "Word's details" && <TextInput
                                        placeholder="Type what you want to remember"
                                        onChangeText={(text4) => this.setState({ editingForthText: text4 })}
                                        value={this.state.editingForthText}
                                        style={styles.TextInputStyle}
                                    />}
                                </View>
                            </View>}
                            <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 5 }}>
                                {this.state.currentState == "Create new word" &&
                                    <LinearGradient style={{ borderRadius: 5, width: '30%', padding: 3 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                        <TouchableOpacity onPress={this._saveButton}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 }}>SAVE</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>}
                                {this.state.currentState == "Word's details" && <TouchableOpacity style={{ borderColor: "#0BA81B", borderWidth: 2, borderRadius: 5, backgroundColor: "#0BA81B", width: '30%' }} onPress={this._editVocab}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 }}>EDIT</Text>
                                </TouchableOpacity>}
                                {this.state.currentState == "Edit word" &&
                                    <LinearGradient style={{ borderRadius: 5, width: '30%', padding: 3 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                        <ConfirmButton
                                            confirm={this._checkInformationChanged()}
                                            confirmMessage={'Are you sure to cancel?'}
                                            confirmDetail={'If you cancel, you will lost all changed!!!'}
                                            buttonStyle={{ backgroundColor: "#FFFFFF" }}
                                            onPress={this._cancelButton}
                                            text="CANCEL"
                                            textStyle={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 }}
                                        />
                                    </LinearGradient>}
                                {this.state.currentState == "Edit word" &&
                                    <LinearGradient style={{ borderRadius: 5, width: '30%', padding: 3 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                        <TouchableOpacity onPress={this._saveButtonEditVocab}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 }}>SAVE</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>}
                            </View>
                            {/* </ScrollView> */}
                        </KeyboardAvoidingView>
                        </ScrollView>
                        </MenuProvider>
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} />
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    ContainerStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    HeaderStyle: {
        flex: 0.075,
        //flexDirection: 'column',
        //backgroundColor: '#2A8D83',
        //padding: 7
    },
    BodyStyle: {
        flex: 0.925,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: "#FFFFFF"
    },
    FooterStyle: {
        flex: 0.075,
        backgroundColor: '#00C5CD',
        padding: 0.5,
    },
    ButtonHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ButtonFooterStyle: {
        padding: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00868B'
    },
    TextButtonHeaderStyle: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 7,
    },
    PlainTextTopicStyle: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    PlainTextStyle: {
        flex: 1,
        width: '100%',
    },
    TextInputTopicStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 3,
        borderRadius: 5,
        backgroundColor: '#A1DED8',
        color: "#696969",
        fontSize: 15,
        fontWeight: 'bold'
    },
    TextInputStyle: {
        flex: 1,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#A1DED8',
        color: "#696969",
        borderRadius: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    TextButtonFooterStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5,
    },
    ImageButtonFooterStyle: {
        width: 30,
        height: 30
    }

})