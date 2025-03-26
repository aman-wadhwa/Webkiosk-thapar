import Spinner from './assets/Spinner.gif'


function Loading() {
  
  return (
    <div className='mt-20'>
        <img width={150} className='text-center' src={Spinner} alt='Loading...'></img>
    </div>
  )
}

export default Loading

