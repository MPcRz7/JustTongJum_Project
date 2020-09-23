import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
//import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
//import {Icon} from 'native-base';
import { VocabListItem } from '../components/VocabListItem'
import { PopupWithDropdown } from '../components/PopupWithDropdown';
import { Header } from '../components/Header';

import StaticVariable from '../General/StaticVariable';


export default class VocabList extends Component {

    state = {
        newVocabText: "",
        GroupVocabArray: [],
        keys: [],
        enableEditing: false,
        data: [], //Test for flatlist
        news: [], //Test for debug

        allCurrentGroupNameList: this.props.navigation.state.params.allCurrentGroupNameList,
        groupData: [],
        groupId: this.props.navigation.state.params.GroupIdSelected,
        groupName: "",
        allVocabOfThisGroup: [],

        titleNumber: 99,
        subtitleNumber: 99,

        isDialogVisible: false,

        totalCards: 0,

        isLoading: true,

    }
    // constructor(props) {
    //     super(props)
    //     const { navigation } = this.props
    // }


    UNSAFE_componentWillMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.setState({ isLoading: true })
            //this.componentDidMount()
            this._getGroupSelected()
            this._getAllVocabOfThisGroup()
            //alert("WillMountFocus")          
            //this._updateAllVocabToDataVariable()
            //this.setState({totalCards: this.state.totalCards + 1})
        });

    }

    async componentWillUnmount() {
        //alert("WillUnMount");
    }

    async componentDidMount() {
        //this._isMounted = true;
        //this._getGroupSelected()
        //this._getAllVocabOfThisGroup()
        //this._updateAllVocabToDataVariable()

        // const GroupSelected = await fetch('http://10.0.2.2:3000/groupVocabs/' + this.state.groupId, {
        //     method: 'GET', // Get
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        // const GroupSelectedJson = await GroupSelected.json()
        // this.setState({ groupData: GroupSelectedJson })
        // this.setState({ groupName: GroupSelectedJson.groupName })
        // this.setState({ titleNumber: GroupSelectedJson.titleNumber })
        // this.setState({ subtitleNumber: GroupSelectedJson.subtitleNumber })

        // const listAllVocabOfThisGroup = await fetch('http://10.0.2.2:3000/vocab', {
        //     methof: 'GET', // List
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const listAllVocabOfThisGroupJson = await listAllVocabOfThisGroup.json()
        // const allVocabOfThisGroup = await listAllVocabOfThisGroupJson.filter(item => item.groupVocabId == this.state.groupId)
        // this.setState({ allVocabOfThisGroup })

        // let max = this.state.allVocabOfThisGroup.length
        // const data_temp = []
        // for (let i = 0; i < max; i++) {
        //     data_temp[i] = this.state.allVocabOfThisGroup[i]
        // }
        // this.setState({ data: data_temp })
    }

    _getGroupSelected = async () => {
        const GroupSelected = await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + this.state.groupId, {
            method: 'GET', // Get
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const GroupSelectedJson = await GroupSelected.json()
        this.setState({ groupData: GroupSelectedJson })
        this.setState({ groupName: GroupSelectedJson.groupName })
        this.setState({ titleNumber: GroupSelectedJson.titleNumber })
        this.setState({ subtitleNumber: GroupSelectedJson.subtitleNumber })
    }

    _getAllVocabOfThisGroup = async () => {
        const listAllVocabOfThisGroup = await fetch(StaticVariable.FullAddressPath + 'vocab', {
            methof: 'GET', // List
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const listAllVocabOfThisGroupJson = await listAllVocabOfThisGroup.json()
        const allVocabOfThisGroup = await listAllVocabOfThisGroupJson.filter(item => item.groupVocabId == this.state.groupId).sort((a, b) => a.vocabOrder - b.vocabOrder)
        this.setState({ allVocabOfThisGroup })
        this.setState({ isLoading: false })
    }

    _updateAllVocabToDataVariable = async () => {
        let max = this.state.allVocabOfThisGroup.length
        const data_temp = []
        for (let i = 0; i < max; i++) {
            data_temp[i] = this.state.allVocabOfThisGroup[i]
        }
        await this.setState({ data: data_temp })
    }

    _toggleSetting = () => {
        this.setState({ enableEditing: !this.state.enableEditing })
    }

    _deleteData = async (item, index) => {
        this.setState({ isLoading: true })
        const vocabDeletingId = item._id
        const olddata = this.state.allVocabOfThisGroup
        const allVocabOfThisGroup = olddata.slice(0, index).concat(olddata.slice(index + 1, olddata.length))
        this.setState({ allVocabOfThisGroup })
        await fetch(StaticVariable.FullAddressPath + 'vocab/' + vocabDeletingId, {
            method: 'DELETE', // Delete
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.setState({ isLoading: false })
    }

    _startExercise = () => {

        if (this.state.allVocabOfThisGroup.length > 0) {
            this.props.navigation.navigate("SelectMode", { allVocabOfThisGroup: this.state.allVocabOfThisGroup, groupData: this.state.groupData })
        } else {
            alert("Please add vocabuary at lease 1")
        }
    }

    _compareFirst = async (label) => {
        await this.setState({ subtitleNumber: label })
    }

    _setShowLabel = async (titleNumber, subtitleNumber) => {
        this.setState({ isLoading: true })
        await this.setState({ titleNumber })
        await this.setState({ subtitleNumber })

        await fetch(StaticVariable.FullAddressPath + 'groupVocabs/' + this.state.groupId, {
            method: 'PUT', //Put
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.groupData.userId,
                groupName: this.state.groupData.groupName,
                firstLabel: this.state.groupData.firstLabel,
                secondLabel: this.state.groupData.secondLabel,
                thirdEnable: this.state.groupData.thirdEnable,
                forthEnable: this.state.groupData.forthEnable,
                thirdLabel: this.state.groupData.thirdLabel,
                forthLabel: this.state.groupData.forthLabel,
                groupOrder: this.state.groupData.groupOrder,
                titleNumber: this.state.titleNumber,
                subtitleNumber: this.state.subtitleNumber
            })
        })
        this._togglePopup()
        this.setState({ isLoading: false })
    }

    _togglePopup = () => {
        this.setState({ isDialogVisible: !this.state.isDialogVisible })
    }

    _onDragBegin = (index) => {
        this.setState({ totalCards: index })
    }

    _dragFlatlist = async ({ data, to, from, row }) => {
        //await this.setState({ isLoading: true })
        await this.setState({ allVocabOfThisGroup: data })
        let start = from <= to ? from : to
        let end = from <= to ? to : from

        await this.setState({ isLoading: true })
        for (let i = start; i <= end; i++) {
            await fetch(StaticVariable.FullAddressPath + 'vocab/' + data[i]._id, {
                method: 'PUT', //Put
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupVocabId: data[i].groupVocabId,
                    firstText: data[i].firstText,
                    secondText: data[i].secondText,
                    thirdText: data[i].thirdText,
                    forthText: data[i].forthText,
                    vocabOrder: i,
                    check: data[i].check,
                })
            })
        }

        this.setState({ data: data })
        await this.setState({ isLoading: false })
        // this._getGroupSelected()
        // this._getAllVocabOfThisGroup()
    }

    render() {
        if (this.state.isLoading == true || this.state.subtitleNumber == 99) {
            return (
                <View style={styles.ContainerStyle}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A5851" }}>
                        <View style={styles.HeaderStyle}>
                            <Header
                                TitleName=""
                                EnableEditing={false}
                                VisibleBackButton={true}
                                VisibleEditButton={true}
                                VisibleEditLabelButton={false}
                                onGoBack={() => this.props.navigation.goBack()}
                                onToggleSetting={this._toggleSetting}
                            />
                        </View>
                        <View style={styles.BodyStyle} />
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} />
                </View>
            )
        } else {
            return (
                <View style={styles.ContainerStyle}>
                    {/* <MenuProvider> */}
                    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A5851" }}>
                        {/* <LinearGradient style={styles.HeaderStyle} start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }} colors={['#1A5851', '#000000']}>
                            <View style={{ flex: 0 }} />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5, alignItems: 'center' }}>
                                    {!this.state.enableEditing && <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={() => this.props.navigation.goBack()}>
                                        <Image source={require('../icons/Backward_FFFFFF.png')} />
                                    </TouchableOpacity>}
                                    {this.state.enableEditing && <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={this._toggleSetting}>
                                        <Image source={require('../icons/No_FFFFFF.png')} />
                                    </TouchableOpacity>}
                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 'bold' }}>{this.state.groupName}</Text>
                                </View>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    {!this.state.enableEditing && <TouchableOpacity style={[styles.ButtonHeaderStyle, { margin: 10 }]} onPress={this._toggleSetting}>
                                        <Image source={require('../icons/More_FFFFFF.png')} />
                                    </TouchableOpacity>}
                                    {this.state.enableEditing && <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={this._toggleSetting}>
                                        <Image source={require('../icons/Yes_FFFFFF.png')} />
                                    </TouchableOpacity>}
                                </View>
                            </View>
                        </LinearGradient> */}
                        <View style={styles.HeaderStyle}>
                            <Header
                                TitleName={this.state.groupName}
                                EnableEditing={this.state.enableEditing}
                                VisibleBackButton={true}
                                VisibleEditButton={true}
                                VisibleEditLabelButton={false}
                                onGoBack={() => this.props.navigation.goBack()}
                                onToggleSetting={this._toggleSetting}
                            />
                        </View>
                        <View style={styles.BodyStyle}>
                            <View style={{ flex: 0.1, width: '90%', flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold' }}>Total cards : {this.state.allVocabOfThisGroup.length}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    {!this.state.enableEditing && <TouchableOpacity style={{ padding: 5, backgroundColor: "#0BA81B", borderRadius: 4, flexDirection: 'row', justifyContent: "center", alignItems: "center" }} onPress={() => this.props.navigation.navigate("NewVocab", { currentState: "Create new word", groupData: this.state.groupData, allCurrentGroupNameList: this.state.allCurrentGroupNameList, groupId: this.state.groupId, dataLength: this.state.allVocabOfThisGroup.length })}>
                                        <Image source={require('../icons/Add_FFFFFF.png')} style={{ margin: 5 }} />
                                        <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 'bold', margin: 5 }}>Add new word</Text>
                                    </TouchableOpacity>}
                                    {this.state.enableEditing && <TouchableOpacity style={{ padding: 5, backgroundColor: "#C2C2C2", borderRadius: 4, flexDirection: 'row', justifyContent: "center", alignItems: "center" }} onPress={this._togglePopup}>
                                        <Image source={require('../icons/Setting_1A5851.png')} style={{ margin: 5 }} />
                                        <Text style={{ color: "#1A5851", fontSize: 13, fontWeight: 'bold', margin: 5 }}>Label Setting</Text>
                                    </TouchableOpacity>}
                                </View>
                            </View>
                            <View style={styles.FlatListStyle}>
                                <DraggableFlatList
                                    data={this.state.allVocabOfThisGroup}
                                    //data={this.state.data}
                                    extraData={this.state}
                                    keyExtractor={(_, index) => index.toString()} //Not Understand.
                                    scrollPercent={5}
                                    onDragBegin={(index) => this._onDragBegin(index)}
                                    onDragEnd={({ data, to, from, row }) => this._dragFlatlist({ data, to, from, row })}
                                    ListEmptyComponent={() =>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text>There is no word in list</Text>
                                        </View>}
                                    renderItem={({ item, index, drag }) =>
                                        <VocabListItem item={item} index={index} drag={drag} enableEditing={this.state.enableEditing} titleNumber={this.state.titleNumber} subtitleNumber={this.state.subtitleNumber}
                                            onSelect={() => this.props.navigation.navigate("NewVocab", { currentState: "Word's details", groupData: this.state.groupData, allCurrentGroupNameList: this.state.allCurrentGroupNameList, groupId: this.state.groupId, editVocab: item, indexEditVocab: index })}
                                            onEdit={() => this.props.navigation.navigate("NewVocab", { currentState: "Word's details", groupData: this.state.groupData, allCurrentGroupNameList: this.state.allCurrentGroupNameList, groupId: this.state.groupId, editVocab: item, indexEditVocab: index })}
                                            onDelete={this._deleteData}
                                        />
                                    }
                                />
                            </View>
                        </View>
                        <View style={{ position: 'absolute', right: (Dimensions.get('window').height) * 0.05, bottom: (Dimensions.get('window').height) * 0.05, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ margin: 0 }} onPress={this._startExercise}>
                                <Image source={require('../icons/PlayButton.png')} style={styles.ImageButtonFooterStyle} />
                            </TouchableOpacity>
                        </View>
                        {this.state.isDialogVisible && <TouchableOpacity onPress={this._togglePopup} style={{ position: "absolute", height: "100%", width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#DFEBEAF0" }}>
                            <PopupWithDropdown titleNumber={this.state.titleNumber} subtitleNumber={this.state.subtitleNumber} groupData={this.state.groupData}
                                onCancel={this._togglePopup}
                                onOK={this._setShowLabel}
                            />
                        </TouchableOpacity>}
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} />
                    {/* </MenuProvider> */}
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
        //flex: 0.25,
        //flexDirection: 'column',
        //backgroundColor: '#2A8D83',
        //padding: 7
    },
    BodyStyle: {
        flex: 0.925,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    FlatListStyle: {
        flex: 0.9,
        padding: 5,
        width: '100%',
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
    ButtonHeaderRightStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ButtonHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    TextButtonHeaderLeftStyle: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 7,
    },
    TextButtonHeaderRightStyle: {
        fontWeight: 'bold',
        color: 'white',
    },
    TextButtonFooterStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5,
    },
    ImageButtonFooterStyle: {
        //width: 60,
        //height: 60
    }

})