import { useEffect, useState } from 'react'
import { storage } from '../config/firebase'

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'

function Store() {
  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])

  const uploadFiled = async () => {
    if (!file) return
    const filesFolderRef = ref(storage, `projectFile/${file.name}`)
    try {
      await uploadBytes(filesFolderRef, file)
      alert('File Uploaded')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const listRef = ref(storage, 'projectFile')
    listAll(listRef).then((res) => {
      res.items
        .forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setImageList((prev) => [...prev, url])
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }, [])

  return (
    <>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFiled}> Upload</button>
      </div>
      <div>
        {imageList.map((url) => {
          return (
            <img
              key={url}
              src={url}
              alt="img"
              style={{ width: '100px', height: '100px' }}
            />
          )
        })}
      </div>
    </>
  )
}

export default Store
