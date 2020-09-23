import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
//import { CheckBox } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

class VocabListItemSelectMode extends Component {
    //  constructor(props) {
    //      super(props)
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
            <View style={styles.FlatListStyle}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <CheckBox
                        style={{ margin: 5 }}
                        checkBoxColor="#1A5851"
                        isChecked={this.props.item.check}
                        onClick={() => this.props.OnChecked(this.props.index)}
                    />
                    <View>
                        <Text style={{ color: '#1A5851', fontSize: 18, fontWeight: 'bold' }}>{this.state.titleText}</Text>
                        <Text style={{ color: '#989493', fontSize: 13 }}>{this.state.subTitleText}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    FlatListStyle: {
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomColor: '#9894934F',
        borderBottomWidth: 1,
    }
})
export { VocabListItemSelectMode }