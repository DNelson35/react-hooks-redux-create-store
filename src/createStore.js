function createStore(reducer){
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState(){
    return state
  }

  return { 
    dispatch,
    getState,
  }
}

//  we have access to the state because these functions are used by dispatch and dispatch is defined in the same scope as the state variable. 
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { count: state.count + 1 };

    default:
      return state;
  }
}

function render() {
  let container = document.getElementById("container");
  container.textContent = store.getState().count;
}

// here we set the variable store so we can now gain access to the return value of the functions defined in the createStore function
let store = createStore(reducer)

store.dispatch({ type: "@@INIT" });
let button = document.getElementById("button");

button.addEventListener("click", function () {
  store.dispatch({ type: "counter/increment" });
});

// over all this reminds me of OOP essentially to get this to work se go through some steps inside the createStore function

// 1. we initialize a variable but we dont have a setter or getter to use them so we have to create them

// 2. we difine the dispatch method witch makes it able to access the state variable in the functions scope. this will allow the functions called by dispatch to have access to the state variable.

// 3. we create a getter function to get the value of the state after dispatch is ran

// 4. diffrent form OOP we need to return the functions that we defined to gain access to the return values or the side effects. so when i call dispatch it will call render wich will be a side effect of calling dispatch. and when we call get state we will get the value returned form withing the funciton.

// 
