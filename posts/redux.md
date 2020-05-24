**Note:** I'm writing this for the purpose of better understanding how Redux works. I've learned most if not all of this from [Stephen Grider's Udemy Course](https://www.udemy.com/course/react-redux/). I highly recommend it.

# What is Redux?

Redux is a state management tool that is mainly used with React applications. You don't **need** Redux to manage state, but as your application grows larger, you want to come up with solutions for centralized state to avoid unecessary complications.

# Redux Flow

You start with an action creator that creates a plain JavaScript object with the properties type and payload. The type property describes the change we want to make within our data and the payload property describes the context. 

That action is then dispatched to a reducer which then updates state.

The dispatch function takes the action and sends the object off across our application.

The reducer takes in the action and some existing data (state). It will process the action and use it to modify the state.