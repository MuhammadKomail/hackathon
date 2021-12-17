let INITIAL_STATE = {
    email: "",
    password: ""
};

let reducer = (state = INITIAL_STATE, action) => {
    if (action.type === "DATAFROMSIGNUP") {
        console.log(action)
        return { ...state };
    }
    else if (action.type === "DATAFROMLOGIN") {
        console.log(action)
        return { ...state };
    }
    else if (action.type === "DATAFROMDASHBOARD") {
        console.log(action)
        return { ...state };
    }
    else {
        return state
    }
}

export default reducer;