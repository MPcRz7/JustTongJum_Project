import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native'
import { ConfirmButton } from '../components/ConfirmButton';

class GroupListItem extends Component {
    //  constructor(props) {
    //      super(props)
    //  }

    render() {
        return (
            <TouchableOpacity style={styles.FlatListStyle} onPress={() => !this.props.enableEditing ? this.props.onSelect('VocabList', this.props.item) : null}>
                <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5 }}>
                    {this.props.enableEditing && <TouchableOpacity style={{ marginRight: 10, padding: 10 }} delayLongPress={10} onLongPress={this.props.drag} >
                        <Image source={require('../icons/Menu_989493_48.png')} style={styles.ImageButtonFlatListStyle} />
                        {/* MOVE */}
                    </TouchableOpacity>}
                    <View style={{ marginRight: 10 }}>
                        <Text style={{ color: '#1A5851', fontSize: 18, fontWeight: 'bold' }}>{this.props.item.groupName}</Text>
                        {/* SELECT */}
                    </View>
                </View>
                <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 5 }}>
                    {!this.props.enableEditing && <View style={{ marginLeft: 5 }} >
                        <Image source={require('../icons/Forward_1A5851.png')} style={styles.ImageButtonFlatListStyle} />
                        {/* SELECT */}
                    </View>}
                    {this.props.enableEditing && <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => this.props.onEdit(this.props.item, this.props.index)} >
                        <Image source={require('../icons/Edit.png')} style={styles.ImageButtonFlatListStyle} />
                        {/* EDIT */}
                    </TouchableOpacity>}
                    {this.props.enableEditing && <ConfirmButton // DELETE
                        buttonStyle={{ marginLeft: 5, flexDirection: "row", alignItems: "center" }}
                        image={require("../icons/Minus_FF0000_64.png")}
                        imageStyle={styles.ImageButtonFlatListStyle}
                        onPress={() => this.props.onDelete(this.props.item, this.props.index)}
                        confirm={true}
                        confirmMessage={'Are you sure to delete?'}
                    />}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    ImageButtonFlatListStyle: {
        //width: 15,
        //height: 15
    },
    FlatListStyle: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#9894934F',
        borderBottomWidth: 3,
        backgroundColor: "#FFFFFF"
    },
    TextInputStyle: {
        textAlign: 'center',
        //width: '100%',
        backgroundColor: '#A1DED8',
        color: "#696969",
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export { GroupListItem }