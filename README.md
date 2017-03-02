# React Native Redux Boilerplate
Boilerplate for a React Native iOS and Android app using Redux

<ul>
  <li><a href="#step1">Step 1: Create React Native Project</a></li>
  <li><a href="#step2">Step 2: Install Dependencies</a></li>
  <li><a href="#step3">Step 3: Create Folder Structure</a></li>
  <li><a href="#step4">Step 4: Create Your First Action</a></li>
  <li><a href="#step5">Step 5: Create Your First Reducer</a></li>
  <li><a href="#step6">Step 6: Create Your Component</a></li>
  <li><a href="#step7">Step 7: Create Your Store</a></li>
  <li><a href="#step8">Step 8: Link It All Together</a></li>
  <li><a href="#step9">Step 9: Update Your Main Files</a></li>
</ul>

<a name="step1"></a>
#Step 1: Create React Native Project

Open terminal and run
```bash
react-native init ProjectName
```

<a name="step2"></a>
#Step 2: Install Dependencies

In your project root, run
```bash
npm install --save react-redux
npm install —save redux
npm install —save redux-thunk
```

<a name="step3"></a>
#Step 3: Create Folder Structure

In your project root create an <b>app</b> folder. In the app folder create an <b>actions</b> folder , a <b>reducers</b> folder and a <b>components</b> folder.


<a name="step4"></a>
#Step 4: Create Your First Action

The action is a basic function called from the component whenever we want the whole state of the app to be changed.
Our action creator is a simple function returning an object (the action itself)with a type attribute expressing what happened with the app.
<br>
In your actions folder create a js file <b>index.js</b>

```javascript
export const DATA_AVAILABLE = 'DATA_AVAILABLE';

import Data from '../../instructions.json';

export function getData(){
    return (dispatch) => {

        //Make API Call
        //For this example, I will be retrieving data from a json file
        //Get the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            var data  = Data.instructions;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);

    };
}

```

<a name="step5"></a>
#Step 5: Create Your First Reducer

Reducers are the ones in charge of updating the state of the app. Redux will automatically pass the current state of the app and the action occurred.
It’s up to the reducer to realize if it needs to modify the state or not based on the action.type.
<br>
In your reducers folder create a js file <b>index.js</b>

```javascript
import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;
```

<a name="step6"></a>
#Step 6: Create Your Component

In your components folder create a js file <b>home.js</b>

```javascript
'use strict';

import React, { Component } from 'react';
var {
    StyleSheet,
    ListView,
    View,
    Text,
    ActivityIndicator
} = require('react-native');

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions'; //Import your actions

class Home extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds
        };
    }

    componentDidMount() {
        this.props.getData(); //call our action
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{height: 80}]}
                        size="small"
                    />
                </View>
            );
        } else {
            return (
                <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                    <ListView enableEmptySections={true}
                              dataSource={this.state.ds.cloneWithRows(this.props.data)}
                              renderRow={this.renderRow.bind(this)}/>
                </View>
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>
                    {(parseInt(rowID) + 1)}{". "}{rowData.title}
                </Text>
                <Text style={styles.description}>
                    {rowData.description}
                </Text>
            </View>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

var styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        // height: 50,
        padding: 10
    },

    title:{
        fontSize: 15,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        fontSize: 14,
    }
});
```


<a name="step7"></a>
#Step 7: Create Your Store

In the app folder, create a js file <b>store.js</b>

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index'; //Import the reducer

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(thunk));


//Redux
// Redux is a state container for JavaScript apps, often called a Redux store.
//It stores the whole state of the app in an immutable object tree.

```

<a name="step8"></a>
#Step 8: Link It All Together

Redux needs to inject a store holding the app state into the app.
To do so, it requires a ‘Provider’ wrapping the whole app.

In the app folder, create a js file <b>setup.js</b>


<a name="step9"></a>
#Step 9: Update Your Main files

Update <b>index.ios.js</b> and <b>index.android.js</b>

```javascript

import { AppRegistry } from 'react-native';
import setup from './app/setup';

AppRegistry.registerComponent('ProjectName', () => setup());

```