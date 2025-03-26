import { createContext ,useReducer, useEffect} from "react";
import UserReducer from "./UserReducer";

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const initialState = {
        roll : "",
        pass : "",
        user : {},
        islogin : false,
        loading: false,
      }
    
      const [state, dispatch] = useReducer(UserReducer, initialState)

      useEffect(()=>{
        
        const fetchuserdata = async () => {
          try {
            const response = await fetch("http://localhost:3001/user");
            const data = await response.json();
            if(data.length>0){
              dispatch({'type':"LOGIN_SUCCESS", 'payload':data[0]})
            }
          }
          catch(error){
            
          }
        }

        fetchuserdata()
      }, [])
    

    const submitDetails = async () => {
      await logout()
      dispatch({'type':'SET_LOADING'})
      const response = await fetch ('http://localhost:5000/login',{
        method: 'POST',
        headers : {'Content-Type' :'application/json'},
        body : JSON.stringify({roll:state.roll, pass:state.pass}),
      })
      const data = await response.json()
      if(data["user"]["success"]===true){
        await postjsondata(data)
      }
      else{
        dispatch({'type':'SETFALSE'})
      }
      
      
    }


    const logout = async () =>{
      
      if(state.user && state.user.id){
        await fetch(`http://localhost:3001/user/${state.user.id}`, {
          method:"DELETE",
        })
        dispatch({'type':'LOGOUT'})
      }
    }

    const postjsondata = async (data) => {
      let response = await fetch('http://localhost:3001/user', {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
      })
      let data3 = await response.json()
      dispatch({'type':'LOGIN_SUCCESS', payload:data3})
      
    }

    // const setalert

    return <UserContext.Provider value={{
      ...state,
      dispatch,
      submitDetails,
      logout
    }}>
      {children}

    </UserContext.Provider>
}

export default UserContext