import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box';
//import ModalDropdown from 'react-native-modal-dropdown';
import { VocabListItemSelectMode } from '../components/VocabListItemSelectMode'
import { ModalDropdown } from '../components/ModalDropdown';
import { Header } from '../components/Header';

import StaticVariable from '../General/StaticVariable';
import { SafeAreaView } from 'react-navigation';


export default class SelectMode extends Component {
    state = {
        newVocabText: "",
        GroupVocabArray: [],
        keys: [],
        enableEditing: false,
        currentKey: "",
        checkedSelectAll: false,
        checkedRepeat: true,
        checkedRandom: true,
        checkedInverse: false,
        checkedListVocab: [],
        GroupVocabChecked: [],
        counterTemp: 0,
        refresh: false,

        vocabToPlay: this.props.navigation.state.params.allVocabOfThisGroup,
        groupData: this.props.navigation.state.params.groupData,
        groupLabels: [],
        questionLabelIndex: 0,

        titleNumber: 0,
        subtitleNumber: 0,

        battleButtonEnable: true,

        countSelected: 0
    }
    // constructor(props) {
    //     super(props)
    //     const { navigation } = this.props
    // }

    async UNSAFE_componentWillMount() {
        const groupData = this.state.groupData
        const groupLabels = this.state.groupLabels
        groupLabels[0] = groupData.firstLabel;
        groupLabels[1] = groupData.secondLabel;
        if (groupData.thirdEnable) {
            groupLabels[2] = groupData.thirdLabel
            if (groupData.forthEnable) {
                groupLabels[3] = groupData.forthLabel
            }
        }
        this.setState({ groupLabels })

        this.setState({ titleNumber: groupData.titleNumber })
        this.setState({ subtitleNumber: groupData.subtitleNumber })
    }

    async componentDidMount() {
        this._updateSelectAllAndBattleEnable()
    }
    async componentDidUpdate(prevProps, prevState) {

    }

    _selectVocab = async (index) => {
        //API
        const vocabToPlay = [...this.state.vocabToPlay]
        // let max = vocabToPlay.length
        // let countSelected = 0

        await fetch(StaticVariable.FullAddressPath + 'vocab/' + vocabToPlay[index]._id, {
            method: 'PUT', //Put
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupVocabId: vocabToPlay[index].groupVocabId,
                firstText: vocabToPlay[index].firstText,
                secondText: vocabToPlay[index].secondText,
                thirdText: vocabToPlay[index].thirdText,
                forthText: vocabToPlay[index].forthText,
                vocabOrder: vocabToPlay[index].vocabOrder,
                check: !vocabToPlay[index].check
            })
        })

        vocabToPlay[index].check = !vocabToPlay[index].check
        this.setState({ vocabToPlay })
        // for (let i = 0; i < max; i++) {
        //     if (vocabToPlay[i].check == true) {
        //         countSelected = countSelected + 1
        //     }
        // }
        // if (countSelected < max) {
        //     this.setState({ checkedSelectAll: false })
        // } else {
        //     this.setState({ checkedSelectAll: true })
        // }

        this._updateSelectAllAndBattleEnable()
    }

    _updateSelectAllAndBattleEnable = () => {
        const vocabToPlay = [...this.state.vocabToPlay]
        let max = vocabToPlay.length
        let countSelected = 0

        for (let i = 0; i < max; i++) {
            if (vocabToPlay[i].check == true) {
                countSelected = countSelected + 1
            }
        }

        if (countSelected < max) {
            this.setState({ checkedSelectAll: false })
        } else {
            this.setState({ checkedSelectAll: true })
        }

        if (countSelected == 0) {
            this.setState({ battleButtonEnable: false })
        } else {
            this.setState({ battleButtonEnable: true })
        }

        this.setState({ countSelected })
    }

    _selectAllVocab = async () => {

        //API
        const vocabToPlay = this.state.vocabToPlay
        const checkedSelectAll = this.state.checkedSelectAll
        let max = vocabToPlay.length
        if (checkedSelectAll) {
            for (let i = 0; i < max; i++) {
                await fetch(StaticVariable.FullAddressPath + 'vocab/' + vocabToPlay[i]._id, {
                    method: 'PUT', //Put
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        groupVocabId: vocabToPlay[i].groupVocabId,
                        firstText: vocabToPlay[i].firstText,
                        secondText: vocabToPlay[i].secondText,
                        thirdText: vocabToPlay[i].thirdText,
                        forthText: vocabToPlay[i].forthText,
                        vocabOrder: vocabToPlay[i].vocabOrder,
                        check: false
                    })
                })
                vocabToPlay[i].check = false
            }
            this.setState({ countSelected: 0 })
        } else {
            for (let i = 0; i < max; i++) {
                await fetch(StaticVariable.FullAddressPath + 'vocab/' + vocabToPlay[i]._id, {
                    method: 'PUT', //Put
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        groupVocabId: vocabToPlay[i].groupVocabId,
                        firstText: vocabToPlay[i].firstText,
                        secondText: vocabToPlay[i].secondText,
                        thirdText: vocabToPlay[i].thirdText,
                        forthText: vocabToPlay[i].forthText,
                        vocabOrder: vocabToPlay[i].vocabOrder,
                        check: true
                    })
                })
                vocabToPlay[i].check = true
            }
            this.setState({ countSelected: max })
        }

        this.setState({ checkedSelectAll: !this.state.checkedSelectAll })
        this.setState({ vocabToPlay })
        this.setState({ battleButtonEnable: this.state.checkedSelectAll })
    }

    _filterArray = () => {
        const GroupVocabArray = this.state.GroupVocabArray
        const GroupVocabChecked = []
        let max = GroupVocabArray[0].Words.length
        let j = 0
        for (let i = 0; i < max; i++) {
            if (GroupVocabArray[0].Words[i].Chk) {
                GroupVocabChecked[j] = GroupVocabArray[0].Words[i]
                j++
            }
        }
        this.setState({ GroupVocabChecked })
    }

    _toggleSetting = () => {
        this.setState({ refresh: !this.state.refresh })
    }

    _start = () => {
        //API
        this.props.navigation.navigate("Exercise", {
            selectedVocab: this.state.vocabToPlay.filter(item => item.check),
            groupData: this.state.groupData,
            questionLabel: parseInt(this.state.questionLabelIndex, 10) + 1,
            checkedRandom: this.state.checkedRandom,
        })
    }

    _dragFlatlist = async ({ data }) => {
        await this.setState({ data: data })
    }

    render() {
        return (
            <View style={styles.ContainerStyle}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#1A5851" }} >
                    {/* <LinearGradient style={styles.HeaderStyle} start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }} colors={['#1A5851', '#000000']}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../icons/Backward_FFFFFF.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 'bold' }}>SELECT MODE TO PLAY</Text>
                            </View>
                            <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} />
                        </View>
                    </LinearGradient> */}
                    <View style={styles.HeaderStyle}>
                        <Header
                            TitleName="SELECT MODE TO PLAY"
                            VisibleBackButton={true}
                            VisibleEditButton={false}
                            EnableEditing={false}
                            VisibleEditLabelButton={false}
                            onGoBack={() => this.props.navigation.goBack()}
                        />
                    </View>
                    <View style={styles.BodyStyle}>
                        <View style={{ flex: 0.075, width: '95%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5 }}>
                                <Text style={{ color: '#1A5851', fontSize: 18, fontWeight: 'bold' }}>Question</Text>
                                <View style={{ borderColor: "#1A5851", borderRadius: 5, borderWidth: 3, marginLeft: 10, width: "60%" }}>
                                    <ModalDropdown options={this.state.groupLabels}
                                        style={{ backgroudColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}
                                        textStyle={{ color: "#1A5851", fontSize: 18, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5, textAlign: "center" }}
                                        disabled={false}
                                        defaultValue={this.state.groupLabels[0]}
                                        defaultIndex={0}
                                        dropdownTextStyle={{ color: "#2A8D83", fontSize: 18, fontWeight: 'bold' }}
                                        onSelect={(index) => { this.setState({ questionLabelIndex: index }) }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.075, width: '95%', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <CheckBox
                                    style={{ margin: 5 }}
                                    checkBoxColor="#1A5851"
                                    isChecked={this.state.checkedSelectAll}
                                    onClick={this._selectAllVocab}
                                />
                                <Text style={{ color: '#1A5851', fontSize: 13, fontWeight: "bold" }}>SELECT ALL</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
                                <CheckBox
                                    style={{ margin: 5 }}
                                    checkBoxColor="#1A5851"
                                    isChecked={this.state.checkedRandom}
                                    onClick={() => this.setState({ checkedRandom: !this.state.checkedRandom })}
                                />
                                <Text style={{ color: '#1A5851', fontSize: 13, fontWeight: "bold" }}>RANDOM ORDER</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Text style={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold' }}>Total cards : {this.state.countSelected}</Text>
                            </View>
                        </View>
                        <View style={styles.FlatListStyle}>
                            <FlatList
                                data={this.state.vocabToPlay}
                                extraData={this.state}
                                keyExtractor={(_, index) => index.toString()} //Not Understand.
                                renderItem={({ item, index }) =>
                                    <VocabListItemSelectMode item={item} index={index} checkedListVocab={this.state.checkedListVocab} titleNumber={this.state.titleNumber} subtitleNumber={this.state.subtitleNumber}
                                        OnChecked={this._selectVocab}
                                    />
                                }
                            />
                        </View>
                    </View>
                    <View style={{ position: 'absolute', right: (Dimensions.get('window').height) * 0.05, bottom: (Dimensions.get('window').height) * 0.05 }}>
                        <TouchableOpacity style={{ opacity: this.state.battleButtonEnable ? 1 : 0.5 }} onPress={this._start} disabled={!this.state.battleButtonEnable}>
                            <Image source={require('../icons/BattleButton.png')} style={styles.ImageButtonFooterStyle} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} />
            </View>
        )
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
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: "#FFFFFF"
    },
    FlatListStyle: {
        flex: 0.85,
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
    ButtonHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextButtonHeaderStyle: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 7,
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