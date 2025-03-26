const userReducer = (state, action) => {
    switch(action.type){
        case 'SET_ROLL':
            return {
                ...state,
                roll : action.payload
            }
        case 'SET_PASS':
            return {
                ...state,
                pass : action.payload
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                islogin:true,
                loading:false
            }
        case 'LOGOUT':
            return {
                ...state,
                user : {},
                islogin:false,
                loading:false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading:true
            }
        case 'SETFALSE':
            return {
                ...state,
                loading:false,
                islogin:false
            }

        default:
            return state
    }
}
export default userReducer