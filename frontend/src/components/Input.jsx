import { useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import UserContext from "../Reducers/UserContext"
import { useContext } from "react"
import Loading from "./Loading"
function Input() {
  const navigate = useNavigate()
  const {roll, pass, dispatch, submitDetails, islogin, user, loading} = useContext(UserContext)

  const [showpass, setshowpass] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    submitDetails()
  }

  useEffect(()=>{
    if(user && user.id && islogin) navigate(`/${user.user.roll}`)
  }, [islogin, navigate, user])

  
  
    
  return (
    <>
    <header className="flex bg-gray-700 p-5 items-center justify-center text-3xl">Welcome</header>

    <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <form onSubmit={handleSubmit}  className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
    <div className="mb-8">
      <label className="block text-gray-300 text-sm font-semibold mb-1 mb-3">Roll No : </label>
      <input type="text" value={roll} onChange={(evt) => dispatch({ type: "SET_ROLL", payload: evt.target.value })} name="roll" placeholder="Enter Roll Number" className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-semibold mb-1">Password: </label>
      <div className="relative">
      <input type={showpass ? "text" : "password"} value={pass} onChange={(evt) => dispatch({ type: "SET_PASS", payload: evt.target.value })}   name="pass" placeholder="Password" className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <button type="button" onClick={()=>setshowpass(!showpass)} className="absolute right-3 top-2 text-gray-400 hover:text-white ">Show</button>
      </div>
      
    </div>

    <button type="submit" className="mt-10 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200" >Submit</button>
    {loading && (
      <div className="flex justify-center mt-4">
        <Loading />
      </div>
    )}
  </form>
</div>
</>

  )
}

export default Input
