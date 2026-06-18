import React from 'react'
import { auth } from '../firebase'
import { LogOut, Lock } from 'lucide-react'

export default function Navbar({ onLogout }) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Vault</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              {auth.currentUser?.email}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
