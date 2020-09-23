import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native'

class ConfirmButton extends PureComponent {
    //  constructor(props) {
    //      super(props)
    //  }
    render() {
        return (
            <ConfirmButtonFunction
                onPress={this.props.onPress}
                confirm={this.props.confirm}
                confirmMessage={this.props.confirmMessage}
                confirmDetail={this.props.confirmDetail}
                buttonStyle={this.props.buttonStyle}
            >
                <Image source={this.props.image}
                    style={this.props.imageStyle}
                />
                <Text style={this.props.textStyle}>
                    {this.props.text}
                </Text>
            </ConfirmButtonFunction>
        )
    }
}

const ConfirmButtonFunction = ({ confirm, children, onPress, confirmMessage = 'Confirm', confirmDetail = 'Press OK if you want to confirm', buttonStyle }) => {
    _onPress = () => {
        if (confirm) {
            Alert.alert(
                confirmMessage,
                confirmDetail,
                [
                    { text: 'Cancel' },
                    { text: 'OK', onPress }
                ]
            )
        } else {
            onPress()
        }
    }
    return (
        <TouchableOpacity style={buttonStyle} onPress={_onPress} >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ImageButtonFlatListStyle: {
        width: 30,
        height: 30,
    },
    FlatListStyle: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
    }
})

export { ConfirmButton }