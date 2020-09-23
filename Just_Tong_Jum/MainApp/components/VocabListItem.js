import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { ConfirmButton } from '../components/ConfirmButton';

class VocabListItem extends Component {
    //  constructor(props) {
    //     super(props)
    //  }

    state = {
        titleText: "",
        subTitleText: ""
    }

    UNSAFE_componentWillMount(){
        if(this.props.titleNumber == 0){
            this.setState({ titleText : this.props.item.firstText })
        }else if(this.props.titleNumber == 1){
            this.setState({ titleText : this.props.item.secondText })
        }else if(this.props.titleNumber == 2){
            this.setState({ titleText : this.props.item.thirdText })
        }else{
            this.setState({ titleText : this.props.item.forthText })
        }

        if(this.props.subtitleNumber == 0){
            this.setState({ subTitleText : this.props.item.firstText })
        }else if(this.props.subtitleNumber == 1){
            this.setState({ subTitleText : this.props.item.secondText })
        }else if(this.props.subtitleNumber == 2){
            this.setState({ subTitleText : this.props.item.thirdText })
        }else{
            this.setState({ subTitleText : this.props.item.forthText })
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.FlatListStyle} onPress={() => this.props.onSelect()}>
                <View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5 }}>
                    {this.props.enableEditing && <TouchableOpacity style={{ marginRight: 10, padding: 10}} delayLongPress={10} onLongPress={this.props.drag} >
                        <Image source={require('../icons/Menu_989493_48.png')} style={styles.ImageButtonFlatListStyle} />
                        {/* MOVE */}
                    </TouchableOpacity>}
                    <View>
                        <Text style={{ color: '#1A5851', fontSize: 18, fontWeight: 'bold' }}>{this.state.titleText}</Text>
                        <Text style={{ color: '#989493', fontSize: 13 }}>{this.state.subTitleText}</Text>
                    </View>                   
                </View>
                <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 5 }}>
                    {!this.props.enableEditing && <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => this.props.onEdit()} >
                        <Image source={require('../icons/Forward_1A5851.png')} style={styles.ImageButtonFlatListStyle} />
                        {/* EDIT */}
                    </TouchableOpacity>}
                    {this.props.enableEditing && <ConfirmButton // DELETE
                        buttonStyle={{marginLeft: 5, flexDirection: 'row', alignItems: 'center'}}
                        image={require("../icons/Minus_FF0000_64.png")}
                        imageStyle={styles.ImageButtonFlatListStyle}
                        onPress={() => this.props.onDelete(this.props.item,this.props.index)}
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
        //height: 15,
    },
    FlatListStyle: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomColor: '#9894934F',
        borderBottomWidth: 1,
    },
})
export { VocabListItem }