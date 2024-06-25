import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { app, auth } from './firebase'; // Import Firebase auth module
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import logo from './polaroid-svgrepo-com.svg'; // Replace with your futuristic logo
import './App.css';

const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [bookings, setBookings] = useState([]);

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
      setBookings([]);
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
        status: 'Pending',
        userId: user.uid,
      });
      console.log('Document written with ID: ', docRef.id);
      fetchBookings(); // Fetch bookings after new booking is added
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const fetchBookings = async () => {
    if (user) {
      const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedBookings = [];
      querySnapshot.forEach((doc) => {
        fetchedBookings.push({ id: doc.id, ...doc.data() });
      });
      setBookings(fetchedBookings);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        {!user && (
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
            <img src={logo} className={`App-logo ${user ? 'small-logo' : ''}`} alt="logo" />
            <div className="App-content">
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
              </div>
              <div className="bookings">
                <h2>Your Bookings</h2>
                {bookings.length > 0 ? (
                  <table className="bookings-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>{booking.date}</td>
                          <td>{booking.day}</td>
                          <td>{booking.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No bookings yet.</p>
                )}
              </div>
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
