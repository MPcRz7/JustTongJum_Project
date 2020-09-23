import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { ConfirmButton } from '../components/ConfirmButton';
import { Header } from '../components/Header';

export default class Exercise extends Component {
    state = {
        editVocab: "",
        newFirstText: "",
        newSecondText: "",

        firstLabel: "Mos",
        secondLabel: "MMM",
        indexEditVocab: 0,
        GroupVocabArray: [],
        keys: [],
        currentKey: "",
        GroupVocabChecked: this.props.navigation.state.params.selectedVocab,
        GroupVocabRandom: this.props.navigation.state.params.selectedVocab,
        vocabToPlay: this.props.navigation.state.params.selectedVocab,
        vocabIncorrect: [],
        totalVocabSelected: 0,
        totalFirstCorrect: 0,
        totalFirstIncorrect: 0,

        GroupVocabSkipped: [],
        checkedInverse: false,
        checkedRandom: this.props.navigation.state.params.checkedRandom,
        checkedRepeat: true,

        currentQuestion: 0,
        enableTrans: false,
        enableVocab: false,
        enableJudge: false,
        countCorrect: 0,
        countIncorrect: 0,
        countSkip: 0,

        groupData: this.props.navigation.state.params.groupData,
        groupName: "",
        currentFirstLabel: "1L",
        currentSecondLabel: "2L",
        currentThirdLabel: "3L",
        currentForthLabel: "4L",
        questionLabel: this.props.navigation.state.params.questionLabel,
        showFirst: false,
        showSecond: false,
        showThird: false,
        showForth: false,
        currentState: "",
        currentThirdEnable: true,
        currentForthEnable: true,

    }
    // constructor(props) {
    //     super(props)
    //     this.state = {

    //     }

    // }

    async componentDidMount() {

        const groupData = this.state.groupData
        this.setState({ groupName: groupData.groupName })
        this.setState({ currentFirstLabel: groupData.firstLabel })
        this.setState({ currentSecondLabel: groupData.secondLabel })
        this.setState({ currentThirdLabel: groupData.thirdLabel })
        this.setState({ currentForthLabel: groupData.forthLabel })
        this.setState({ currentThirdEnable: groupData.thirdEnable })
        this.setState({ currentForthEnable: groupData.forthEnable })
        this._showQuestion(this.state.questionLabel)

        this.setState({ totalVocabSelected: this.state.vocabToPlay.length })

        if (this.state.checkedRandom) {
            this._randomVocab()
        }
    }

    _showQuestion(index) {
        if (index == 1) {
            this.setState({ showFirst: true })
        } else if (index == 2) {
            this.setState({ showSecond: true })
        } else if (index == 3) {
            this.setState({ showThird: true })
        } else {
            this.setState({ showForth: true })
        }

    }

    _toggleText(index) {
        if (index == 1) {
            this.setState({ showFirst: !this.state.showFirst })
        } else if (index == 2) {
            this.setState({ showSecond: !this.state.showSecond })
        } else if (index == 3) {
            this.setState({ showThird: !this.state.showThird })
        } else {
            this.setState({ showForth: !this.state.showForth })
        }

    }

    _showAllAns = () => {
        this.setState({ showFirst: true })
        this.setState({ showSecond: true })
        this.setState({ showThird: true })
        this.setState({ showForth: true })
    }

    _hideAllAns = () => {
        this.setState({ showFirst: false })
        this.setState({ showSecond: false })
        this.setState({ showThird: false })
        this.setState({ showForth: false })
    }

    _randomVocab = () => {

        var shuffle = require('shuffle-array')
        const vocabToPlay = [...this.state.vocabToPlay]
        shuffle(vocabToPlay)
        this.setState({ vocabToPlay })
    }

    _randomVocabIncorrect = () => {
        var shuffle = require('shuffle-array')
        const vocabIncorrect = [...this.state.vocabIncorrect]
        shuffle(vocabIncorrect);
        this.setState({ vocabIncorrect })
    }

    _alertArray = () => {
        alert(this.state.countCorrect)
    }

    _quit = () => {
        this.props.navigation.navigate("Report", {
            totalVocab: this.state.totalVocabSelected,
            firstCorrect: this.state.totalFirstCorrect,
            firstIncorrect: this.state.totalFirstIncorrect,
            totalReasked: this.state.vocabToPlay.length - this.state.totalVocabSelected,
            ReaskedCorrect: this.state.countCorrect - this.state.totalFirstCorrect,
            ReaskedIncorrect: this.state.countIncorrect - this.state.totalFirstIncorrect,
        })
    }

    _nextQuestion = async () => {

        const currentQuestion = this.state.currentQuestion
        if (currentQuestion >= 0 && currentQuestion < this.state.totalVocabSelected) {
            this.setState({ totalFirstCorrect: this.state.countCorrect })
            this.setState({ totalFirstIncorrect: this.state.countIncorrect })
        }
        if (currentQuestion >= 0 && currentQuestion + 1 < this.state.vocabToPlay.length) {
            this._hideAllAns()
            this._showQuestion(this.state.questionLabel)
            this.setState({ currentQuestion: this.state.currentQuestion + 1 })
        } else if (this.state.vocabIncorrect.length > 0) {
            this._randomVocabIncorrect()
            const oldvocabToPlay = this.state.vocabToPlay
            const vocabToPlay = oldvocabToPlay.concat(this.state.vocabIncorrect)
            await this.setState({ vocabToPlay })
            await this.setState({ vocabIncorrect: [] })
            this._nextQuestion()
        } else {
            this._quit()
        }
    }

    _answerCorrect = async () => {
        await this.setState({ countCorrect: this.state.countCorrect + 1 })
        this._nextQuestion()
    }

    _answerIncorrect = async () => {
        const vocabIncorrect = this.state.vocabIncorrect
        vocabIncorrect.push(this.state.vocabToPlay[this.state.currentQuestion])
        this.setState({ vocabIncorrect })

        await this.setState({ countIncorrect: this.state.countIncorrect + 1 })
        this._nextQuestion()
    }

    render() {
        return (
            <View style={styles.ContainerStyle}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#1A5851" }}>
                    {/* <LinearGradient style={styles.HeaderStyle} start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }} colors={['#1A5851', '#000000']}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5, alignItems: 'center' }} />
                            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 'bold' }}>{this.state.groupName}</Text>
                            </View>
                            <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} />
                        </View>
                    </LinearGradient> */}
                    <View style={styles.HeaderStyle}>
                        <Header
                            TitleName={this.state.groupName}
                            VisibleBackButton={false}
                            VisibleEditButton={false}
                            EnableEditing={false}
                            VisibleEditLabelButton={false}
                        />
                    </View>
                    <View style={styles.BodyStyle}>
                        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={this._quit} style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={require('../icons/Export_1A5851.png')} />
                                <Text style={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>QUIT</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
                                <Text style={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold' }}>{this.state.currentQuestion + 1} / {this.state.totalVocabSelected}</Text>
                                {this.state.countIncorrect > 0 && <Text style={{ color: '#FF0000', fontSize: 15, fontWeight: 'bold' }}>+{this.state.countIncorrect}</Text>}
                            </View>
                        </View>
                        <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                            <View style={styles.PlainTextTopicStyle}>
                                <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentFirstLabel}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.PlainTextStyle}>
                                <TouchableOpacity onPress={() => this._toggleText(1)} style={{ flex: 1 }}>
                                    {this.state.showFirst &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.vocabToPlay[this.state.currentQuestion].firstText != "" ? this.state.vocabToPlay[this.state.currentQuestion].firstText : "-"}</Text>
                                        </LinearGradient>}
                                    {!this.state.showFirst &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#000000', '#2A8D83']}>
                                            <Image source={require('../icons/Eye_FFFFFF_96.png')} style={styles.ImageShowStyle} />
                                        </LinearGradient>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                            <View style={styles.PlainTextTopicStyle}>
                                <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentSecondLabel}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.PlainTextStyle} >
                                <TouchableOpacity onPress={() => this._toggleText(2)} style={{ flex: 1 }}>
                                    {this.state.showSecond &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.vocabToPlay[this.state.currentQuestion].secondText != "" ? this.state.vocabToPlay[this.state.currentQuestion].secondText : "-"}</Text>
                                        </LinearGradient>}
                                    {!this.state.showSecond &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#000000', '#2A8D83']}>
                                            <Image source={require('../icons/Eye_FFFFFF_96.png')} style={styles.ImageShowStyle} />
                                        </LinearGradient>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.currentThirdEnable && <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                            <View style={styles.PlainTextTopicStyle}>
                                <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentThirdLabel}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.PlainTextStyle} >
                                <TouchableOpacity onPress={() => this._toggleText(3)} style={{ flex: 1 }}>
                                    {this.state.showThird &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.vocabToPlay[this.state.currentQuestion].thirdText != "" ? this.state.vocabToPlay[this.state.currentQuestion].thirdText : "-"}</Text>
                                        </LinearGradient>}
                                    {!this.state.showThird &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#000000', '#2A8D83']}>
                                            <Image source={require('../icons/Eye_FFFFFF_96.png')} style={styles.ImageShowStyle} />
                                        </LinearGradient>}
                                </TouchableOpacity>
                            </View>
                        </View>}
                        {this.state.currentForthEnable && <View style={{ flex: 0.4, flexDirection: 'column', marginVertical: 5 }}>
                            <View style={styles.PlainTextTopicStyle}>
                                <LinearGradient style={{ borderRadius: 5 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginHorizontal: 30, marginVertical: 5 }}>{this.state.currentForthLabel}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.PlainTextStyle} >
                                <TouchableOpacity onPress={() => this._toggleText(4)} style={{ flex: 1 }}>
                                    {this.state.showForth &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{this.state.vocabToPlay[this.state.currentQuestion].forthText != "" ? this.state.vocabToPlay[this.state.currentQuestion].forthText : "-"}</Text>
                                        </LinearGradient>}
                                    {!this.state.showForth &&
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#000000', '#2A8D83']}>
                                            <Image source={require('../icons/Eye_FFFFFF_96.png')} style={styles.ImageShowStyle} />
                                        </LinearGradient>}
                                </TouchableOpacity>
                            </View>
                        </View>}
                        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                            {this.state.showFirst && this.state.showSecond && (this.state.showThird || !this.state.currentThirdEnable) && (this.state.showForth || !this.state.currentForthEnable) &&
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: "40%" }} onPress={this._answerIncorrect}>
                                        {/* <Image source={require('../icons/WrongButton.png')} style={styles.ImageButtonFooterStyle} /> */}
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#FF0000', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>Wrong</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: "40%" }} onPress={this._answerCorrect}>
                                        {/* <Image source={require('../icons/CorrectButton.png')} style={styles.ImageButtonFooterStyle} /> */}
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#00FF00', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>Correct</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}
                            {!(this.state.showFirst && this.state.showSecond && (this.state.showThird || !this.state.currentThirdEnable) && (this.state.showForth || !this.state.currentForthEnable)) &&
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: "50%" }} onPress={this._showAllAns}>
                                        {/* <Image source={require('../icons/SeeAllButton.png')} style={styles.ImageButtonFooterStyle} /> */}
                                        <LinearGradient style={{ borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#00FF00', '#000000']}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>Check</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}
                        </View>

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
        borderColor: "#2A8D83",
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: '#EAEAEA',
        color: "#696969",
        fontSize: 15,
        fontWeight: 'bold'
    },
    TextInputStyle: {
        flex: 1,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#EAEAEA',
        color: "#696969",
        borderRadius: 5,
        fontSize: 18,
        fontWeight: 'bold'
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
    },
    ImageShowStyle: {
        width: 30,
        height: 30
    }

})