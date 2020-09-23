import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

class Header extends Component {
    state = {
        //enableEditing: this.props.EnableEditing,
        //visibleBackButton: this.props.VisibleBackButton,
        //visibleEditButton: this.props.VisibleEditButton,
        //visibleEditLabelButton: this.props.VisibleEditLabelButton,
        //titleName: this.props.TitleName
    }

    _toggleSetting = () => {
        this.setState({ enableEditing: !this.state.enableEditing })

        this.props.onToggleSetting()
    }

    render() {
        return (
            <LinearGradient style={styles.HeaderStyle} start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }} colors={['#1A5851', '#000000']}>
                {/* <View style={{ flex: 0 }} /> */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5, alignItems: 'center' }}>
                        {this.props.VisibleBackButton && !this.props.EnableEditing &&
                            <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={() => this.props.onGoBack()}>
                                <Image source={require('../icons/Backward_FFFFFF.png')} />
                            </TouchableOpacity>}
                        {this.props.VisibleEditButton && this.props.EnableEditing &&
                            <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={this._toggleSetting}>
                                <Image source={require('../icons/No_FFFFFF.png')} />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 'bold' }}>{this.props.TitleName}</Text>
                    </View>
                    <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        {this.props.VisibleEditButton && !this.props.EnableEditing &&
                            <TouchableOpacity style={[styles.ButtonHeaderStyle, { margin: 10 }]} onPress={this._toggleSetting}>
                                <Image source={require('../icons/More_FFFFFF.png')} />
                            </TouchableOpacity>}
                        {this.props.VisibleEditButton && this.props.EnableEditing &&
                            <TouchableOpacity style={styles.ButtonHeaderStyle} onPress={this._toggleSetting}>
                                <Image source={require('../icons/Yes_FFFFFF.png')} />
                            </TouchableOpacity>}
                        {this.props.VisibleEditLabelButton && this.props.TitleName != "Word's details" &&
                            // <MenuProvider style={[styles.ButtonHeaderStyle, { margin: 10, flexDirection: "row", justifyContent: "flex-end" }]}>
                                <Menu style={[styles.ButtonHeaderStyle, { margin: 10, flexDirection: "row", justifyContent: "flex-end" }]}>
                                    <MenuTrigger>
                                        <Image source={require('../icons/More_FFFFFF.png')} />
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption onSelect={() => this.props.onTwoLabels()}>
                                            <Text style={{ color: "#696969" }}>2 Labels</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => this.props.onThreeLabels()} >
                                            <Text style={{ color: "#696969" }}>3 Labels</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => this.props.onFourLabels()} >
                                            <Text style={{ color: "#696969" }}>4 Labels</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            // </MenuProvider>
                            }
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    HeaderStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#2A8D83',
        padding: 7
    },
    ButtonHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})

export { Header }

