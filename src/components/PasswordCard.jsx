import React, { useState } from 'react'
import { Copy, Eye, EyeOff, Edit, Trash2, Check } from 'lucide-react'

export default function PasswordCard({ password, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password.password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">{password.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{password.username}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              title="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
            Password
          </label>
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password.password}
              readOnly
              className="flex-1 bg-transparent outline-none text-slate-900 font-mono"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-slate-400 hover:text-slate-600"
              title={showPassword ? 'Hide' : 'Show'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button
              onClick={handleCopyPassword}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              title="Copy password"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Notes */}
        {password.notes && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
              Notes
            </label>
            <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-200">
              {password.notes}
            </p>
          </div>
        )}

        {/* Created Date */}
        <div className="text-xs text-slate-400">
          Created {password.createdAt ? new Date(password.createdAt.toDate()).toLocaleDateString() : 'N/A'}
        </div>
      </div>
    </div>
  )
}
