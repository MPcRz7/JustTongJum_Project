//Server

//Problem: cannot type new group name --> using keyboard in Emu will be solve
// ---- change group name to group name that already in list in will double initial text
// ---- third forth enable can be save with API (have update problem because when we back to vocab page DidMount is not execute, so groupData and editVocab aren't update)

//Rest: length of limit typing
// ---- all placeHolderText


//Fixed (not good enough)
// ---- we can use draggable on GroupList but cannot use on VocabList dont know why, Now I understand that it is not about bug when draged, but it is about bug of flatlist is not update when everything have change.
// ---- List in VocabList is not update after Edit the vocab (back button update problem, it about didFocus function maybe)
// ---- about show label function -> we just create pop UI for label --> cannot use because it's not re render.
// ---- flatlist is not update after delete.
// >>>> four problems above are fixed by "Loading" variable that force to render again, but is look not smooth.
// ---- main page is rendered even Loading (fetch data) still not finish ---> fixed by subtitleNumber is not 99 : it is not a good way.

//Current Problem:

// ---- login system : random id for login guest, logout button, change main page to Group Vocab list after login
// ---- Profile picture
// ---- Minna no nihongo


//Next: try to clear problem above.


// Problem that already clear: 
// Cannot save state value when change page --> now i dont understand what problem is
// Use constructor make initial state doesn't work --> now i dont understand what problem is
// FlatList cannot show in create new group name. Need to change to other page before. --> extra data can slove
// Key that is added by Fst and Snd cannot be read.
// Cannot send second value to other page
// DidMount is not update after navigate back from NewVocabPage
//     ==> GroupVocabRandom is set in GroupVocabChecked (try to search about setState) //
//     ==> GroupVocabChecked sent the previous value [Big Problem] //
//     ==> checkBox cannot toggle smoothly (toggle multiple) => change method to send parameter //
//     ==> change button color => backgroundColor //
//     ==> add library (Maybe fix with add LINK -> haven't try yet) //

// Done
//     ==> rename Group name
//     ==> repeat wrong/skip vocab
//     ==> Link from everywhere in screen => use touchableOpacity (maybe have better method)
//     ==> start by select in flatlist in GroupListPage (cannot highlight selected flatlist) //
//     ==> fix inappropiate bugs
//          -- Error start from group that did not have any vocab --> check before start , disable button
//     ==> can be change the word of "Vocab" and "Translate to" //
//     ==> select all checkbox (for loop?)
//     ==> counting correct word only once (Not count again after press previous) => (Try to add next button instead (already answer)) => add already answer in Fst Snd Chk And => Ignore (just delete previous function)
//     ==> add the number of vocabChecked
//     ==> move flatlist elements (Bug in VocabListPage)
//     ==> Views are overlap each other when use keyboard //

// Current Problem

// Rest
//     ==> Login System
//     ==> Lock vertical
//     ==> popup before save or cancel (Rest only before save)
//     ==> fix all warning (Unmount)
//     ==> Market Page
//     ==> adjust all color and visualization
//     ==> delete unuse variable and comment

//Question for 16/6/2019
//   1.  Idea for use popup before save or cancel.
//         create new component about button.
//   2.  How to move flatlist elements
//         react-native-draggable-flatlist
// //3.  How to highlight selected flatList
//         isActive (dont forget to change view to touchable)
// //4.  Ask about setState Method to fix "GroupVocabRandom is set in GroupVocabChecked" problem
//         use ... to use the value instead of pointer
// //5.  Try to fix "GroupVocabChecked sent the previous value [Big Problem]"
//         use filter instead
// // 6.  Idea for Select all function
//         for loop for check all, check -> check number of selected, if full -> check select all.
//   7.  Knowledge about all cycle time in react native (to fix warnning about unMount)
//          Skip  -> maybe redux can slove
// //8.  Ask about warning AsyncStorage
//          React Native Async Storage -> import async
// //9.  Idea for change the word of "Vocab" and "Translate to"
//          restructure => item.words[index].Fst
//           key = {
//                   Fstlabel : Eng
//                   SndLabel : Thai
//                   Words = [
//                                 {
//                                     Fst: AAA,
//                                     Snd: กกก,
//                                     Chk: false, 
//                                 },
//                                 {
//                                     Fst: BBB,
//                                     Snd: ขขข,
//                                     Chk: false, 
//                                 },
//                           ]
//                  }

////10.  upload app to playstore. **** Important ****
//  11.  How to upload app to App store (only how to?).
//---------------- Ask if we have time --------------------------------
//       about LINK from everywhere in screen, This is the only way to link?   Yes
//       about ... in import
//       ... in T's code
//       What is different between constructor and state? --> can reuse by extend
//       Button's color cannot change? --> backgroundColor
//       Ask again about List != null, It's still necessary in this implemenatation --> May be yes
//       about componentDidMount and DidUpdate, other dep use this method or not?
//       Knowledge about extraData and keyExtractor 
//             extraData --> render everychange of ...
//             keyExtractor ==> Unique key in each element in flatlist
//       Ask about sending value to other screen that my method is OK or not?, what is the best method? => my method
//       confirm that for loop can be use in all situation or not?
//             loop for render -> need unique key
//       the different between const let var
//             var -> not recomment

//       Idea about App name
//       comment about UI/UX
//       comment about code and optimization

//       PureComponent render only real change -> may be have some problem with object and array
//       Component render when state and props change -> use this is better.
//-----------------------------------------------------------------------

import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import { Avatar } from 'react-native-elements';

export default class MainScreen extends Component {
    componentDidMount() {
        //this._listVocab()
    }
    // _listVocab = async () => {
    //     const result = await fetch('http://10.0.2.2:3000/vocab', {
    //         method: 'POST', //default : GET
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: 2,
    //             name: 'Dog',
    //             meaning: 'dogs'
    //         })
    //     })
    //     const resultJson = await result.json()
    //     alert(JSON.stringify(resultJson))
    // }
    render() {
        return (
            <View style={styles.Container}>
                <LinearGradient start={{x:0.2, y:0}} end ={{x:0.8, y:1}} colors={['#2A8D83', '#000000']} style={{flex: 1}}>
                    <TouchableOpacity style={styles.ScreenLinkStyle} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ fontSize: 50, fontWeight: 'bold', marginBottom: 20 }}>Vocab App</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
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