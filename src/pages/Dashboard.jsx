import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PasswordCard from '../components/PasswordCard'
import AddPasswordModal from '../components/AddPasswordModal'
import { Plus } from 'lucide-react'

export default function Dashboard() {
  const [passwords, setPasswords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPassword, setEditingPassword] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.currentUser) return

    const q = query(
      collection(db, 'vaults'),
      where('userId', '==', auth.currentUser.uid)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPasswords(data)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleAddPassword = async (passwordData) => {
    try {
      await addDoc(collection(db, 'vaults'), {
        ...passwordData,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding password:', error)
    }
  }

  const handleUpdatePassword = async (id, passwordData) => {
    try {
      await updateDoc(doc(db, 'vaults', id), passwordData)
      setEditingPassword(null)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error updating password:', error)
    }
  }

  const handleDeletePassword = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        await deleteDoc(doc(db, 'vaults', id))
      } catch (error) {
        console.error('Error deleting password:', error)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const filteredPasswords = passwords.filter(pwd =>
    pwd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pwd.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Add Button */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by website or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 input-field max-w-md"
          />
          <button
            onClick={() => {
              setEditingPassword(null)
              setIsModalOpen(true)
            }}
            className="hidden sm:flex btn-primary gap-2 items-center"
          >
            <Plus size={20} />
            Add Password
          </button>
        </div>

        {/* Floating Action Button on Mobile */}
        <button
          onClick={() => {
            setEditingPassword(null)
            setIsModalOpen(true)
          }}
          className="sm:hidden fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center z-40"
        >
          <Plus size={28} />
        </button>

        {/* Passwords Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredPasswords.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg mb-4">No passwords saved yet</p>
            <button
              onClick={() => {
                setEditingPassword(null)
                setIsModalOpen(true)
              }}
              className="btn-primary"
            >
              Add your first password
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPasswords.map(password => (
              <PasswordCard
                key={password.id}
                password={password}
                onEdit={() => {
                  setEditingPassword(password)
                  setIsModalOpen(true)
                }}
                onDelete={() => handleDeletePassword(password.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <AddPasswordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPassword(null)
        }}
        onSubmit={(data) => {
          if (editingPassword) {
            handleUpdatePassword(editingPassword.id, data)
          } else {
            handleAddPassword(data)
          }
        }}
        initialData={editingPassword}
      />
    </div>
  )
}
