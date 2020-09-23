import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, requireNativeComponent } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DialogInput from 'react-native-dialog-input';
//import AsyncStorage from '@react-native-community/async-storage';
import DraggableFlatList from 'react-native-draggable-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import { GroupListItem } from '../components/GroupListItem';
import { ConfirmButton } from '../components/ConfirmButton';

import MinnaVocabContent from '../etc/minnaVocabContent.json';
import MinnaVocab26 from '../etc/minnaVocab26.json';
import MinnaVocab27 from '../etc/minnaVocab27.json';
import MinnaVocab28 from '../etc/minnaVocab28.json';
import MinnaVocab29 from '../etc/minnaVocab29.json';
import MinnaVocab30 from '../etc/minnaVocab30.json';
import MinnaVocab31 from '../etc/minnaVocab31.json';

import StaticVariable from '../General/StaticVariable';

export default class GroupList extends Component {
    state = {
        newGroupText: "",
        editGroupText: "",
        indexEditGroup: 0,
        data: [], //GroupNameArray --> data : for draggable flatlist
        //keys: [],
        enableEditing: false,
        isDialogVisible: false,
        isDialogEditName: false,
        keyToStart: "",
        disableStart: true,

        userId: this.props.navigation.state.params.userId,
        username: this.props.navigation.state.params.username,
        firstname: this.props.navigation.state.params.firstname,
        surname: this.props.navigation.state.params.surname,

        allGroupOfThisUser: [],

        totalCards: 60,
        dataEditing: [],




    }
    // constructor(props) {
    //     super(props)
    //     this.state = {

    //     };
    // }

    async componentDidMount() {

        this._getAllGroupOfThisUser()
    }

    async componentDidUpdate() {

    }

    _getAllGroupOfThisUser = async () => {
        const listAllGroupVocabs = await fetch(StaticVariable.FullAddressPath + 'groupVocabs', {
            method: 'GET', // List
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const listAllGroupVocabsJson = await listAllGroupVocabs.json()
        const allGroupOfThisUser = await listAllGroupVocabsJson.filter(item => (item.userId == this.state.userId)).sort((a, b) => a.groupOrder - b.groupOrder)
        this.setState({ allGroupOfThisUser })
        //alert(JSON.stringify(allGroupOfThisUser))
        let max = allGroupOfThisUser.length
        const data_temp = []
        for (let i = 0; i < max; i++) {
            data_temp[i] = allGroupOfThisUser[i].groupName
        }
        this.setState({ data: data_temp })
    }

    _checknamingRule = async (inputText) => {

        //API
        const GroupName = inputText
        const data = this.state.data
        const historyData = data.filter(item => (item == GroupName))
        if (GroupName == ""){
            alert("Group name must not empty")
        }else if (historyData != "") {
            if (this.state.isDialogEditName) {
                if (GroupName == this.state.editGroupText) {
                    this.setState({ isDialogEditName: false })
                } else {
                    alert("You already have this group name")
                }
            } else {
                alert("You already have this group name")
            }
        } else if (GroupName.length > 15) {
            alert("Group name is not more 15 characters")
        } else if (GroupName.match("_")) {
            alert("Underscore(_) is not allow for Group name")
        } else {
            if (this.state.isDialogVisible) {
                this._saveButton(inputText)
            } else if (this.state.isDialogEditName) {
                this._editGroupNameSave(inputText)
            } else {
                alert("something error")
            }
        }
    }


    _saveButton = async (inputText) => {

        //API
        const GroupName = inputText
        const data = this.state.data
        await data.push(GroupName)
        await this.setState({ data })
        await this.setState({ allGroupOfThisUser: data })
        await fetch(StaticVariable.FullAddressPath + 'groupVocabs', {
            method: 'POST', //POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.userId,
                groupName: GroupName,
                firstLabel: "ENG",
                secondLabel: "THAI",
                thirdEnable: false,
                forthEnable: false,
                thirdLabel: "Example",
                forthLabel: "Remark",
                groupOrder: data.length - 1,
                titleNumber: 0,
                subtitleNumber: 1
            })
        })
        this.setState({ isDialogVisible: false })
        this._getAllGroupOfThisUser();
    }

    _editGroupNameSave = async (text) => {

        //API   //Have to edit again when we finish the vocab API part.
        const GroupName = text
        //const allInfoOfEditingGroup = await this.state.allGroupOfThisUser.filter(item => (item.groupName == this.state.editGroupText))
        const allInfoOfEditingGroup = this.state.dataEditing
        if (allInfoOfEditingGroup != "") {
            const data = this.state.data
            data[this.state.indexEditGroup] = GroupName
            await this.setState({ data })
            await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + allInfoOfEditingGroup._id, {
                method: 'PUT', //Put
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: allInfoOfEditingGroup.userId,
                    groupName: GroupName,
                    firstLabel: allInfoOfEditingGroup.firstLabel,
                    secondLabel: allInfoOfEditingGroup.secondLabel,
                    thirdEnable: allInfoOfEditingGroup.thirdEnable,
                    forthEnable: allInfoOfEditingGroup.forthEnable,
                    thirdLabel: allInfoOfEditingGroup.thirdLabel,
                    forthLabel: allInfoOfEditingGroup.forthLabel,
                    groupOrder: allInfoOfEditingGroup.groupOrder,
                    titleNumber: allInfoOfEditingGroup.titleNumber,
                    subtitleNumber: allInfoOfEditingGroup.subtitleNumber
                })
            })
            this.setState({ isDialogEditName: false })
            this._getAllGroupOfThisUser();
        } else {
            alert("Something Error")
        }
    }

    _toggleSetting = () => {
        this.setState({ enableEditing: !this.state.enableEditing })
    }

    _saveEdited = () => {
        this._toggleSetting();
    }

    _cancelEdited = () => {
        this._toggleSetting();
    }

    _alertArray = () => {
        alert(this.state.data)
    }

    _refreshRender = () => {
        this.forceUpdate();
    }

    _seeVocab = async (page, item) => {
        this.props.navigation.navigate(page, { GroupIdSelected: item._id, allCurrentGroupNameList: this.state.data })
    }

    _selectGroupName = async (key) => {
    }

    _startExercise = () => {
        if (this.state.keyToStart !== "") {
            this.props.navigation.navigate("SelectMode", { currentKey: this.state.keyToStart })
        } else {
            alert("Select group to start")
        }
    }

    _deleteGroup = async (item, index) => {
        //API
        //const GroupName = text
        //const allInfoOfDeletingGroup = await this.state.allGroupOfThisUser.filter(item => (item.groupName == GroupName))
        const allInfoOfDeletingGroup = item
        if (allInfoOfDeletingGroup != "") {
            const olddata = this.state.data
            const data = olddata.slice(0, index).concat(olddata.slice(index + 1, olddata.length))
            this.setState({ data })
            this.setState({ allGroupOfThisUser: data })
            await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + allInfoOfDeletingGroup._id, {
                method: 'DELETE', // Delete
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            //Delete all vocab in this group
            this.componentDidMount();
        } else {
            alert("Something Error")
        }

        //AsyncStorage
        // await AsyncStorage.removeItem('Keys_' + text)
        // const olddata = this.state.data
        // const data = olddata.slice(0, index).concat(olddata.slice(index + 1, olddata.length))
        // this.setState({ data })
        // await AsyncStorage.setItem('Keys_GroupNameArray', JSON.stringify(data))
    }

    _editGroupName = async (item, index) => {
        this.setState({ dataEditing: item })
        this.setState({ editGroupText: item.groupName })
        this.setState({ indexEditGroup: index })
        this.setState({ isDialogEditName: true })

    }

    //Need to fix
    _dragFlatlist = async ({ data, to, from, row }) => {
        await this.setState({ allGroupOfThisUser: data })
        //alert( "Data: " + JSON.stringify(this.state.allGroupOfThisUser) + " To: " + to +" From: " + from);

        let start = from <= to ? from : to
        let end = from <= to ? to : from

        for (let i = start; i <= end; i++) {
            await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + data[i]._id, {
                method: 'PUT', //Put
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: data[i].userId,
                    groupName: data[i].groupName,
                    firstLabel: data[i].firstLabel,
                    secondLabel: data[i].secondLabel,
                    thirdEnable: data[i].thirdEnable,
                    forthEnable: data[i].forthEnable,
                    thirdLabel: data[i].thirdLabel,
                    forthLabel: data[i].forthLabel,
                    groupOrder: i,
                    titleNumber: data[i].titleNumber,
                    subtitleNumber: data[i].subtitleNumber
                })
            })
        }

        await this.setState({ data: data })
    }

    _updateOrderList = async () => {

    }

    _onDragBegin = (index) => {
        this.setState({ totalCards: index })
    }

    _minnaFullAdded = async () => {
        await AsyncStorage.setItem('Keys_Minna26', JSON.stringify(MinnaVocab26))
        await AsyncStorage.setItem('Keys_Minna27', JSON.stringify(MinnaVocab27))
        await AsyncStorage.setItem('Keys_Minna28', JSON.stringify(MinnaVocab28))
        await AsyncStorage.setItem('Keys_Minna29', JSON.stringify(MinnaVocab29))
        await AsyncStorage.setItem('Keys_Minna30', JSON.stringify(MinnaVocab30))
        await AsyncStorage.setItem('Keys_Minna31', JSON.stringify(MinnaVocab31))

        await AsyncStorage.setItem('Keys_GroupNameArray', JSON.stringify(MinnaVocabContent))


        alert("Special Add All")
        this.props.navigation.navigate("MainScreen")
    }

    render() {
        return (
            <View style={styles.ContainerStyle}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#2A8D83' }}>
                    <LinearGradient style={styles.HeaderStyle} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#2A8D83', '#000000']}>
                        <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <ConfirmButton // Minna
                                buttonStyle={{ marginLeft: 0 }}                                
                                image={require("../icons/ProfileIcon.png")}
                                imageStyle={{ width: 70, height: 70 }}
                                onPress={this._minnaFullAdded}
                                confirm={true}
                                confirmMessage={'Are you sure to add Minna Vocab?'}
                            /> */}
                            <Image source={require("../icons/ProfileIcon.png")} style={{ width: 70, height: 70 }} />
                        </View>
                        <View style={{ flex: 0.23, flexDirection: 'column', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: 'bold', margin: 3 }}>{this.state.firstname}</Text>
                                <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: 'bold', margin: 3 }}>{this.state.surname}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 'bold', margin: 3 }}>{this.state.username}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.37, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: 'bold', margin: 5 }}>{this.state.data.length}</Text>
                                <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 'bold', margin: 5 }}>TOTAL DECKS</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: 'bold', margin: 5 }}>{this.state.totalCards}</Text>
                            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 'bold', margin: 5 }}>TOTAL CARDS</Text>
                        </View> */}
                        </View>
                    </LinearGradient>
                    <View style={styles.BodyStyle}>
                        <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* {this.state.enableEditing && <TouchableOpacity onPress={this._cancelEdited}>
                                <Image source={require('../icons/No_1A5851.png')} style={{ margin: 5 }} />
                            </TouchableOpacity>} */}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {!this.state.enableEditing && <TouchableOpacity style={{ padding: 5, backgroundColor: "#0BA81B", borderRadius: 4, flexDirection: 'row', justifyContent: "center", alignItems: "center" }} onPress={() => this.setState({ isDialogVisible: true })}>
                                    <Image source={require('../icons/Add_FFFFFF.png')} style={{ margin: 5 }} />
                                    <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 'bold', margin: 5 }}>Add new deck</Text>
                                </TouchableOpacity>}
                                {!this.state.enableEditing && <TouchableOpacity style={{ padding: 5 }} onPress={this._toggleSetting}>
                                    <Image source={require('../icons/More_1A5851.png')} style={{ margin: 5 }} />
                                </TouchableOpacity>}
                                {this.state.enableEditing && <TouchableOpacity onPress={this._saveEdited}>
                                    <Image source={require('../icons/Yes_1A5851.png')} style={{ margin: 5 }} />
                                </TouchableOpacity>}
                            </View>
                        </View>

                        <View style={styles.FlatListStyle}>
                            <DraggableFlatList
                                style={{ backgroundColor: "#FFFFFF", flexGrow: 0 }}
                                data={this.state.allGroupOfThisUser}
                                extraData={this.state} //{this.state.data ==> Bug}
                                keyExtractor={(_, index) => index.toString()} //Not Understand.
                                //scrollPercent={5} //Not Understand
                                onDragBegin={(index) => this._onDragBegin(index)}
                                onDragEnd={({ data, to, from, row }) => this._dragFlatlist({ data, to, from, row })}
                                ListEmptyComponent={() =>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text>There is no deck in list</Text>
                                    </View>}
                                renderItem={({ item, index, drag }) =>
                                    <GroupListItem item={item} index={index} drag={drag} enableEditing={this.state.enableEditing}
                                        onSelect={this._seeVocab}
                                        onEdit={this._editGroupName}
                                        onDelete={this._deleteGroup}
                                    />
                                }
                            />
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <DialogInput
                            isDialogVisible={this.state.isDialogVisible}
                            title={"Create new deck"}
                            message={"Ex. Basic English"}
                            hintInput={"DECK NAME"}
                            submitInput={(inputText) => this._checknamingRule(inputText)}
                            closeDialog={() => this.setState({ isDialogVisible: false })}
                        />
                        <DialogInput
                            isDialogVisible={this.state.isDialogEditName}
                            title={"Edit deck name"}
                            initValueTextInput={this.state.editGroupText}
                            hintInput={"Type your new deck name"}
                            submitInput={(inputText) => this._checknamingRule(inputText || this.state.editGroupText)}
                            closeDialog={() => this.setState({ isDialogEditName: false })}
                        />
                    </View>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#FFFFFF' }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ContainerStyle: {
        flex: 1,
        backgroundColor: 'red',
    },
    HeaderStyle: {
        flex: 0.45, //0.075
        flexDirection: 'column',
        alignItems: 'center',
        padding: 7,
    },
    BodyStyle: {
        flex: 0.55,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: "#FFFFFF"
    },
    FooterStyle: {
        backgroundColor: '#00C5CD',
        padding: 0.5,
    },
    FlatListStyle: {
        flex: 0.9,
        marginTop: 5,
        padding: 10,
        width: '100%',
    },
    ButtonHeaderStyle: {
        padding: 7,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00868B',
    },
    ButtonFooterStyle: {
        padding: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    TextButtonHeaderStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    TextButtonFooterStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5,
    },

})