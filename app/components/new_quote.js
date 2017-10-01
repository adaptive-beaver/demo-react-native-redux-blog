/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 6/29/2017
 * Project: React Native Redux Quotes App with CRUD operations
 */

'use strict';

import React, {Component} from 'react';
var {StyleSheet, View, PixelRatio, Platform, Dimensions, Text,
    LayoutAnimation, Keyboard, TextInput, TouchableOpacity} = require('react-native');

import {connect} from 'react-redux';
import {addQuote, updateQuote} from '../actions'
import { Actions } from 'react-native-router-flux';

var TEXT_SIZE = (PixelRatio.get() <= 2) ? 17 : 19;
var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

var {width: windowWidth, height: windowHeight} = Dimensions.get('window');
var HEIGHT = windowHeight - NAVBAR_HEIGHT;

class NewQuote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: (props.edit) ? props.quote.author : "",
            quote: (props.edit) ? props.quote.quote : ""
        };
    }

    componentWillMount() {
        Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
        Keyboard.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
        Keyboard.removeListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                    <TextInput
                        onChangeText={(text) => this.setState({author: text})}
                        placeholder={"Author"}
                        autoFocus={true}
                        style={[styles.title]}
                        value={this.state.author}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({quote: text})}
                        placeholder={"Enter Quote"}
                        style={[styles.quote]}
                        value={this.state.quote}
                    />
                </View>
                <TouchableOpacity style={[styles.saveBtn]}
                                  disabled={(this.state.author.length > 0 && this.state.quote.length > 0) ? false : true}
                                  onPress={this.addQuote.bind(this)}>
                    <Text style={[styles.navText,
                        {
                            fontWeight: "500",
                            color: (this.state.author.length > 0 && this.state.quote.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                        }]}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    addQuote() {
        if (this.props.edit){
            var quote = this.props.quote;
            quote['author'] = this.state.author;
            quote['quote'] = this.state.quote;
            this.props.updateQuote(quote);
        }else{
            var quote = {"id": this.generateID(),"author": this.state.author, "quote": this.state.quote};
            this.props.addQuote(quote);
        }
        Actions.pop();
    }

    generateID() {
        var d = new Date().getTime();
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        return id;
    }

    _keyboardWillShow(e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        let newHeight = HEIGHT - e.endCoordinates.height;
        this.setState({height: newHeight})
    }

    _keyboardWillHide(e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({height: HEIGHT})
    }
};

function mapStateToProps(state, props) {
    return {}
}


//Connect everything
export default connect(mapStateToProps, {addQuote, updateQuote})(NewQuote);

var styles = StyleSheet.create({
    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },
    quote: {
        fontSize: TEXT_SIZE,
        lineHeight: 38,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },
    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
});