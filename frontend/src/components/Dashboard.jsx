import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
    const [notes, setNote] = useState({ title: "", content: "" });
    const [totalContent, setTotalContent] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/api/notes');
                setTotalContent(response.data);
            } catch (error) {
                console.error(error);
                alert('You are not authenticated');
            }
        };
        fetchNotes();
    }, []);

    async function handleCreateNote(e) {
        e.preventDefault();
        try {
            const response = await api.post('/api/notes', { title: notes.title, content: notes.content });
            setTotalContent([...totalContent, response.data]);
            setNote({ title: "", content: "" });
        } catch (error) {
            console.error(error);
            alert("Error creating note");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-semibold text-white text-center mb-6">Your Notes</h2>
                <div className="flex justify-center mb-6">
                    <form onSubmit={handleCreateNote} className="flex space-x-6 bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
                        <div className="flex-1">
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                                placeholder="Note Title"
                                value={notes.title}
                                required
                                onChange={(e) => setNote({ ...notes, title: e.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                                placeholder="Write your note content here"
                                value={notes.content}
                                required
                                onChange={(e) => setNote({ ...notes, content: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-4 px-8 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none"
                        >
                            Create Note
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    {totalContent.map((note) => (
                        <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-800">{note.title}</h3>
                            <p className="text-gray-600 mt-2">{note.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
