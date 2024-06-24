import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app, auth } from './firebase'; // Import Firebase auth module
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import logo from './polaroid-svgrepo-com.svg'; // Replace with your futuristic logo
import './App.css';

const db = getFirestore(app);
const test = 0

function App() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        date,
        day,
        status,
        userId: user.uid,
      });
      console.log('Document written with ID: ', docRef.id);
      setStatus('Pending'); // Reset status after submission
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">        {!user && (
          <>
            <img src={logo} className={`App-logo ${user ? 'small-logo' : ''}`} alt="logo" />
            <p className="welcome-message">Experience the future of laundry technology</p>
            <button onClick={handleSignIn} className="App-link">
              Sign in with Google
            </button>
          </>
        )}
        {user && (
          <>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign out
            </button>
            <img src={logo} className={`App-logo_ ${user ? 'small-logo' : ''}`} alt="logo" />
            <div className="filling-form">
              <h2>Book For Laundry</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Date:
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Day:
                  <input
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
              <div className="form-status">Status: {status}</div>
            </div>
          </>
        )}
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </header>
      {user && (
        <div className="App-footer">
          <div className="user-info">
            <h2>User Information:</h2>
            <p>Email: {user.email}</p>
            <p>Profile Picture: <img src={user.photoURL} alt="Profile" /></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
