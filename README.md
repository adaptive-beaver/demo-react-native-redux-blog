# React Native Redux Boilerplate

Boilerplate for a React Native iOS and Android app using Redux

**Demo** <br/>
<a href="https://appetize.io/app/rhbrxh0z4d49tn9t9uermgty40?device=iphone5s&scale=75&orientation=portrait&osVersion=9.3" target="_blank">View Demo</a>

**Other Branch** <br/>
<a href="https://github.com/MosesEsan/mesan-react-native-redux-boilerplate/tree/crud-operations" target="_blank">React Native Redux with CRUD operations</a>


### Tutorial
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
### Step 1: Create React Native Project

Open terminal and run
```bash
react-native init ProjectName
```

<a name="step2"></a>
### Step 2: Install Dependencies

In your project root, run
```bash
npm install --save react-redux
npm install --save redux
npm install --save redux-thunk
```

<a name="step3"></a>
### Step 3: Create Folder Structure

In your project root create an <b>app</b> folder. In the app folder create an <b>actions</b> folder , a <b>reducers</b> folder and a <b>components</b> folder.


<a name="step4"></a>
### Step 4: Create Your First Action

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
### Step 5: Create Your First Reducer

Reducers are the ones in charge of updating the state of the app. Redux will automatically pass the current state of the app and the action occurred.
It’s up to the reducer to realize if it needs to modify the state or not based on the action.type.
<br>

Available on my <a href="http://mosesesan.com/blog/2017/06/18/react-native-redux-boilerplate" target="_blank">blog</a>.

<a name="step6"></a>
### Step 6: Create Your Component

In your components folder create a js file <b>home.js</b>

Available on my <a href="http://mosesesan.com/blog/2017/06/18/react-native-redux-boilerplate" target="_blank">blog</a>.

<a name="step7"></a>
### Step 7: Create Your Store

In the app folder, create a js file <b>store.js</b>

Available on my <a href="http://mosesesan.com/blog/2017/06/18/react-native-redux-boilerplate" target="_blank">blog</a>.

<a name="step8"></a>
### Step 8: Link It All Together

Redux needs to inject a store holding the app state into the app.
To do so, it requires a ‘Provider’ wrapping the whole app.

Available on my <a href="http://mosesesan.com/blog/2017/06/18/react-native-redux-boilerplate" target="_blank">blog</a>.

<a name="step9"></a>
### Step 9: Update Your Main files

Available on my <a href="http://mosesesan.com/blog/2017/06/18/react-native-redux-boilerplate" target="_blank">blog</a>.
