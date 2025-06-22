       
       
       
       
       
       
       
       
       
       
       import React, { useState, useEffect } from 'react';

// ייבוא הפונקציות מ־firebase SDK
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';

// קונפיגורציה של Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBsnIF3Z1mliF5nDa_ynlQRg2JAmbCQANc",
  authDomain: "motorstudents.firebaseapp.com",
  databaseURL: "https://motorstudents-default-rtdb.firebaseio.com",
  projectId: "motorstudents",
  storageBucket: "motorstudents.firebasestorage.app",
  messagingSenderId: "326380959531",
  appId: "1:326380959531:web:3b71e27b029103afc0376e",
  measurementId: "G-E38BT8B9N5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [direction, setDirection] = useState(0);
  const [servoPosition, setServoPosition] = useState(90);

  const sendCommand = (command, value) => {
    set(ref(database, 'move/' + command), value);
  };

  // עדכון על שינויים מ־Firebase
  useEffect(() => {
    const dirRef = ref(database, 'move/test/int');
    const servoRef = ref(database, 'move/grabe');

    const unsubDir = onValue(dirRef, snapshot => {
      const val = snapshot.val();
      if (val !== null) setDirection(val);
    });
    const unsubServo = onValue(servoRef, snapshot => {
      const val = snapshot.val();
      if (val !== null) setServoPosition(val);
    });
    return () => {
      dirRef.off();
      servoRef.off();
    };
  }, []);

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
    sendCommand('test/int', newDirection);
  };

  const handleServoChange = (position) => {
    setServoPosition(position);
    sendCommand('grabe', position);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      {/* שלט מעוצב */}
      <div style={{
        width: '350px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        background: 'linear-gradient(135deg, #2b1065, #871b9e)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
      }}>
        {/* כותרת השלט */}
        <h2 style={{
          marginBottom: '20px',
          fontSize: '24px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }}>שליטה על הרובוט</h2>

        {/* כפתורי שליטה */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => handleDirectionChange(1)}>קדימה</button>
          <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => handleDirectionChange(0)}>עצור</button>
          {/* <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0)'
      }} onClick={() => handleDirectionChange(2)}>קדימה</button> */}
           <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => handleDirectionChange(2)}>אחורה</button>
          <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => handleDirectionChange(3)}>שמאלה</button>
          <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => handleDirectionChange(4)}>ימינה</button>
        </div>

        {/* חלק סרבו */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h3 style={{ marginBottom: '10px' }}>מיקום הסרבו: {servoPosition}°</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => handleServoChange(1)} style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}>פתח</button>
            <button onClick={() => handleServoChange(0)} style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}>סגור</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;