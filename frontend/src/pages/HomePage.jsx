import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [Loading, SetLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("error fetching notes")
        if (error.response.status == 429) {
          setIsRateLimited(true)
        }
        else {
          toast.error("Something went wrong")
        }
      }
      finally {
        SetLoading(false)
      }
    }
    fetchNotes();
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}


      <div className='max-w-7xl mx-auto p-4'>
        {Loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

        {notes.length === 0 && !isRateLimited && !Loading && (
          <NotesNotFound />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default HomePage