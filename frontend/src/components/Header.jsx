import UserContext from "../Reducers/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
function Header() {
  const {logout, islogin, user} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!islogin) navigate('/')
  }, [islogin, navigate])

  const {
    name,branch,avg_cgpa,roll
  } = user?.user || {}

  const logoutfunc = async () => {
    await logout()
  }

  return (
    <>
      <header className="flex items-center justify-between bg-gray-700 p-5">
        <div className="flex items-center justify-around w-full">
          <div className="font-semibold">Name : {name}</div>
          <div className="font-semibold">Roll no. : {roll}</div>
          <div className="font-semibold">Branch : {branch}</div>
          
          <div className="font-semibold">CGPA : {avg_cgpa}</div>

          <button className="bg-white text-black btn btn-ghost btn-sm normal-case" onClick={logoutfunc}>Logout</button>
          
        </div>
        
      </header>
    </>
  )
}

export default Header
