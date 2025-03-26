import { useParams , Link, useNavigate} from "react-router-dom"
import UserContext from "../Reducers/UserContext"
import { useContext, useEffect, } from "react"
import Header from "./Header"

function Semester() {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    
    const params = useParams()
    const semesternumber = params.sem
    
    const obj = user?.user?.semester?.[semesternumber]

    useEffect(()=>{
        if(!user?.user) navigate('/')
    }, [user, navigate])
    


  return (
    <>
    
    <Header/>
    
    <span>
    <Link to={`/${params.roll}`} className='mt-10 ml-10 btn btn-ghost border-gray-500 '><p>Back</p></Link>
    </span>

    

    <div className="flex items-center justify-center min-h-screen bg-gray-650 p-5">
      <div className="w-full max-w-4xl p-5 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-5 text-center">Semester {semesternumber} : SGPA ({obj?.sgpa})
            </h2>
            
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='p-2 text-left'>Subject</th>
                        <th className='pr-12 text-left'>Marks</th>
                        <th className='p-2 text-left'>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(obj?.subjects || {}).length>0 ? (
                        Object.keys(obj?.subjects || {}).map((subcode)=>{
                            const subject = obj?.subjects[subcode]
                            return (
                                <tr className="border rounded-lg border-gray-500">
                                    
                                    <td className='p-2'><Link to={`/${user.user.roll}/${semesternumber}/${subcode}`} className="btn btn-ghost rounded-none">{subject.name}</Link></td>
                                    
                                    <td className='pr-12'>{subject.marks}</td>
                                    <td className='p-2'>{subject.grade}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr colSpan="4" className="p-4 text-center">
                            <td>No subjects available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            </div>
        </div>
    </>
  )
}

export default Semester
