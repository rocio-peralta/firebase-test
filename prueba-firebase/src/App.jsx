import Auth from './components/Auth'
import { db } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [movieList, setMovieList] = useState([])

  // New Movie States

  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const[isNewMovieOscar, setIsNewMovieOscar] = useState(false)
  const[newTitle, setNewTitle] = useState('')

  const moviesCollectionRef = collection(db, 'movies')

  const getmovieList = async () => {
  try {
     const data = await getDocs(moviesCollectionRef)
     const filterDAta = data.docs.map(doc => ({...doc.data(), id: doc.id}))
      setMovieList(filterDAta)
  } catch (error) {
    console.log(error)
  }
  }

  const deleteMovie = async (id) => {
  
    await deleteDoc(doc(moviesCollectionRef, id))
    getmovieList()
  }

  const updateMovie = async (id) => {
  
    await updateDoc((doc(moviesCollectionRef, id)), {title: newTitle})
    getmovieList()
  }
  useEffect(() => {
    getmovieList()
  }, [])

   const onSubmitMovie = async () => {
     try {
       await addDoc(moviesCollectionRef, {title: newMovieTitle, releaseDate: newReleaseDate, oscar: isNewMovieOscar})
      getmovieList()
      } catch (error) {
      console.log(error)
     }
   }
  return (
    <>
      <Auth/>

     <div>
      <input placeholder='Movie' onChange={(e)=> setNewMovieTitle(e.target.value)}/>
      <input placeholder='Release date..' type='number' onChange={(e)=> setNewReleaseDate(Number(e.target.value))}/>
      <input type='checkbox' checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
      <label>Recieved an Oscar</label>
      <button onClick={onSubmitMovie}>Add Movie</button>
     </div>




      <div>
        {movieList.map((movie, index) => (
          <div key={index}>
            <h1 style={{color: movie.oscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date:{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input placeholder='New Title' onChange={(e)=> setNewTitle(e.target.value)}/>
            <button onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
