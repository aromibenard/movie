
import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    const intervalId = setInterval(updateClock, 1000);
    // Initial call to set the time immediately
    updateClock(); 

     // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.clock}>{time}</h1>
    </div>
  );
}

const styles = {
  container: {
    display: 'inline',
    alignItems: 'center',
    height: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  clock: {
    fontSize: '1em',
  },
};
