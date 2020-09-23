import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#2A8D83" }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#2A8D83', '#000000']} style={{ flex: 1 }}>
                        <View style={styles.ScreenLinkStyle}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Just Tong Jum</Text>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 0, backgroundColor: "#000000" }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ScreenLinkStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})