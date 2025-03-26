import { useContext ,useEffect} from "react"
import UserContext from "../Reducers/UserContext"
import { useParams , useNavigate} from "react-router-dom"
import Header from "./Header"
import Cg from "./Cg"
function Home() {
    const navigate = useNavigate()
    const params = useParams()
    const {user, islogin} = useContext(UserContext)
    useEffect(()=>{
      // console.log(user)
      
      if(!islogin){
        navigate(`/`)
      }
      if(user && user.id && params.roll!==user.user.roll){
        // console.log(user.user.roll)
        navigate(`/${user.user.roll}`)
      }
      
    }, [user, params.roll, islogin, navigate])

    
  return (
    <>
    <Header />
    <Cg user={user.user}/>
    </>
  )
}

export default Home
