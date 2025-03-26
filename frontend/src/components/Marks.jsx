import { useParams , Link} from "react-router-dom"
import UserContext from "../Reducers/UserContext"
import { useContext, } from "react"
import Header from "./Header"


function Marks() {

  const {user} = useContext(UserContext)
  // console.log(123)
  
  const params = useParams()
  const semesternumber = params.sem
  // console.log(semesternumber)
  // console.log(user.user.semester[semesternumber]['subjects'])
  const subjectcode = params.code

  const obj = user?.user?.semester[semesternumber]['subjects'][subjectcode]

  return (
    <>
    
    <Header/>
    
    <span>
    <Link to={`/${params.roll}/${semesternumber}`} className='mt-10 ml-10 btn btn-ghost border-gray-500 '><p>Back</p></Link>
    </span>

    

    <div className="flex items-center justify-center min-h-screen bg-gray-650 p-5">
      <div className="w-full max-w-4xl p-5 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-5 text-center">
          {obj?.name} - Semester {semesternumber}
            </h2>
            
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='p-2 text-left'>Event</th>
                        <th className='pr-12 text-left'>Marks</th>
                        <th className='p-2 text-left'>Out of</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(obj?.marks_grid || {}).length>0 ? (
                        Object.keys(obj?.marks_grid || {}).map((eventname)=>{
                            const marks_obj = obj?.marks_grid[eventname]
                            return (
                                <tr className="border rounded-lg border-gray-500">
                                    <td className='p-2'>{eventname}</td>
                                    <td className='pr-12'>{marks_obj.obtained}</td>
                                    <td className='p-2'>{marks_obj.outof}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr colSpan="4" className="p-4 text-center">
                            <td>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            </div>
        </div>
    </>
  )
}

export default Marks
