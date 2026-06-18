# Password Vault

A secure, modern password manager web application built with React, Tailwind CSS, and Firebase.

## Features

✅ **User Authentication**
- Email and password registration
- Secure login
- Protected dashboard routes

✅ **Password Management**
- Add, edit, and delete passwords
- One-click password copy
- Show/hide password toggle
- Search by website or username
- Optional notes for each entry

✅ **Modern UI/UX**
- Clean, responsive design
- Mobile-first approach
- Dark mode support
- Smooth animations
- Floating action button on mobile

✅ **Security**
- Firebase Authentication
- Firestore with user-based access control
- User data isolation

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Firebase project (create at [firebase.google.com](https://firebase.google.com))

### Installation

1. Clone the repository
```bash
git clone https://github.com/BenatAsban/password-vault.git
cd password-vault
```

2. Install dependencies
```bash
npm install
```

3. Create a Firebase project and get your credentials

4. Create a `.env` file from the example
```bash
cp .env.example .env
```

5. Add your Firebase credentials to `.env`
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

6. Set up Firestore security rules in your Firebase Console:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /vaults/{document} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

7. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── PasswordCard.jsx
│   └── AddPasswordModal.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── firebase.js
├── App.jsx
├── index.css
└── main.jsx
```

## Pages

- **`/login`** - User login page
- **`/register`** - User registration page
- **`/dashboard`** - Password manager dashboard (protected)

## Database Structure

Firestore collection: `vaults`

Document structure:
```json
{
  "userId": "firebase-user-id",
  "title": "Instagram",
  "username": "benat",
  "password": "user-password",
  "notes": "Personal account",
  "createdAt": "timestamp"
}
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

Deploy the `dist` folder to:
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect GitHub
- **Firebase Hosting**: Use `firebase deploy`

## Security Notes

⚠️ **Important**: 
- Never commit `.env` files with real credentials
- Always use environment variables for sensitive data
- The Firestore rules ensure users can only access their own data
- Passwords are stored encrypted in Firestore

## License

MIT License - feel free to use this project for personal or educational purposes.

## Support

For issues or questions, please open an issue on GitHub.
