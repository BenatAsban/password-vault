import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AddPasswordModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    notes: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        username: initialData.username,
        password: initialData.password,
        notes: initialData.notes || ''
      })
    } else {
      setFormData({
        title: '',
        username: '',
        password: '',
        notes: ''
      })
    }
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.username && formData.password) {
      onSubmit(formData)
      setFormData({
        title: '',
        username: '',
        password: '',
        notes: ''
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 bg-white border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {initialData ? 'Edit Password' : 'Add Password'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Website / App Name *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Gmail, Instagram"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username / Email *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g., john@example.com"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes..."
              rows="3"
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {initialData ? 'Update' : 'Add'} Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
