import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Report extends Component {
    state = {
        totalVocab: this.props.navigation.state.params.totalVocab,
        firstCorrect: this.props.navigation.state.params.firstCorrect,
        firstIncorrect: this.props.navigation.state.params.firstIncorrect,
        totalReasked: this.props.navigation.state.params.totalReasked,
        ReaskedCorrect: this.props.navigation.state.params.ReaskedCorrect,
        ReaskedIncorrect: this.props.navigation.state.params.ReaskedIncorrect,
    }
    render() {
        return (
            <View style={styles.Container}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#2A8D83" }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#2A8D83', '#000000']} style={styles.BodyStyle}>
                    <TouchableOpacity style={styles.ScreenLinkStyle} onPress={() => this.props.navigation.navigate("SelectMode")}>
                        <Text style={{ fontSize: 70, fontWeight: 'bold', marginBottom: 40 }}>FINISHED</Text>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.TextReportStyle}>Total Vocabuary: {this.state.totalVocab}</Text>
                                <Text style={styles.TextReportStyle}>First time correct: {this.state.firstCorrect}</Text>
                                <Text style={styles.TextReportStyle}>First time incorrect: {this.state.firstIncorrect}</Text>
                                <Text style={[styles.TextReportStyle, {marginTop: 20}]}>Total re-asked: {this.state.totalReasked}</Text>
                                <Text style={styles.TextReportStyle}>Re-asked correct: {this.state.ReaskedCorrect}</Text>
                                <Text style={styles.TextReportStyle}>Re-asked incorrect: {this.state.ReaskedIncorrect}</Text>
                            </View>
                    </TouchableOpacity>
                </LinearGradient>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 0, backgroundColor: "#000000" }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    BodyStyle: {
        flex: 1,
        flexDirection: 'column',
    },
    TextReportStyle: {
        fontSize: 20,
        //fontWeight: "bold",
        //color: "#FFFFFF"
    },
    ScreenLinkStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})