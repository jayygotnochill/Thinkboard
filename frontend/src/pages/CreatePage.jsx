import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'


const CreatePage = () => {
    const navigate=useNavigate()

    const [title, SetTitle] = useState("")
    const [content, SetContent] = useState("")
    const [loading, SetLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            toast.error("All fields are required")
            return;
        }
        SetLoading(true)
        try {
            await api.post("notes",{title,content})
            toast.success("Note created successfully")
            navigate("/")
        } catch (error) {
            toast.error("Failed to create note")
        }
        finally{
            SetLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to={'/'} className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5' />
                        Back to Notes
                    </Link>
                    <div className='card bg-base-100 shadow-lg p-6 border border-base-500'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className="label">
                                        <span className='label-text font-semibold'>Title</span>
                                    </label>
                                    <input type="text" placeholder='Note Title' className='input input-bordered' value={title} onChange={(e) => SetTitle(e.target.value)} />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text font-semibold">Content</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your note here..."
                                        className="textarea textarea-bordered h-32"
                                        value={content}
                                        onChange={(e) => SetContent(e.target.value)}
                                    />
                                </div>
                                <div className="card-actions justify-end">
                                    <button type='submit' className='btn btn-primary' disabled={loading}>
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage