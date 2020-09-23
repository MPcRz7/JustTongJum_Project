import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native'
//import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { ConfirmButton } from './ConfirmButton';
import { ModalDropdown } from './ModalDropdown';

class PopupWithDropdown extends Component {
    //  constructor(props) {
    //      super(props)
    //  }

    state = {
        titleNumber: this.props.titleNumber,
        subtitleNumber: this.props.subtitleNumber,
        groupData: this.props.groupData,
        groupLabels: [],
    }

    UNSAFE_componentWillMount() {
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
    }
    

    render() {
        return (
            <View style={styles.PopupStyle}>
                <View style={{ flex: 0.25, justifyContent: "center", alignItems: "center", margin: 2 }}>
                    <Text style={{ color: '#1A5851', fontSize: 22, fontWeight: 'bold' }}>Label Setting</Text>
                </View>
                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2 }}>
                    <Text style={{ color: '#1A5851', fontSize: 18, fontWeight: 'bold' }}>Title Label:</Text>
                    <View style={{ borderColor: "#1A5851", borderRadius: 10, borderWidth: 3, width: "50%" }}>
                        <ModalDropdown options={this.state.groupLabels}
                            style={{ }}
                            textStyle={{ color: "#1A5851", fontSize: 15, fontWeight: 'bold', marginVertical: 5, textAlign: "center" }}
                            disabled={false}
                            animated={true}
                            defaultValue={this.state.groupLabels[this.state.titleNumber]}
                            defaultIndex={this.state.titleNumber}
                            dropdownStyle={{ borderColor: "#1A5851", borderWidth: 3, borderRadius: 10, width: "38%" }}
                            dropdownTextStyle={{ color: "#2A8D83", fontSize: 15, fontWeight: 'bold' }}
                            dropdownTextHighlightStyle={{ color: "purple" }}
                            onSelect={(value) => this.setState({ titleNumber: Number(value) })} />
                    </View>
                </View>
                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2 }}>
                    <Text style={{ color: '#1A5851', fontSize: 18, fontWeight: 'bold' }}>Subtitle Label:</Text>
                    <View style={{ borderColor: "#1A5851", borderRadius: 10, borderWidth: 3, width: "50%" }}>
                        <ModalDropdown options={this.state.groupLabels}
                            style={{  }}
                            textStyle={{ color: "#1A5851", fontSize: 15, fontWeight: 'bold', marginVertical: 5, textAlign: "center" }}
                            disabled={false}
                            animated={true}
                            defaultValue={this.state.groupLabels[this.state.subtitleNumber]}
                            defaultIndex={this.state.subtitleNumber}
                            dropdownStyle={{ borderColor: "#1A5851", borderWidth: 3, borderRadius: 10, width: "38%" }}
                            dropdownTextStyle={{ color: "#2A8D83", fontSize: 15, fontWeight: 'bold' }}
                            dropdownTextHighlightStyle={{ color: "purple" }}
                            //adjustFrame={ style => { style.width = Dimensions.get('window').width; style.left = 0; return style; } }
                            onSelect={(value) => this.setState({ subtitleNumber: Number(value) })} />
                    </View>
                </View>
                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', margin: 2 }}>
                    <LinearGradient style={{ borderRadius: 5, width: '35%', padding: 3 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                        <TouchableOpacity style={{ backgroundColor: "#FFFFFF" }} onPress={() => this.props.onCancel()}>
                            <Text style={{ color: '#1A5851', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 }}>CANCEL</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient style={{ borderRadius: 5, width: '35%', padding: 3 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#2A8D83', '#000000']}>
                        <TouchableOpacity onPress={() => this.props.onOK(this.state.titleNumber, this.state.subtitleNumber)}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 }}>SAVE</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: "#2A8D83",
        alignItems: "center",
        width: "30%",
        borderRadius: 12,
        paddingTop: 7,
        paddingBottom: 7,
    },
    PopupStyle: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        height: "50%",
        width: "90%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
    },
})
export { PopupWithDropdown }