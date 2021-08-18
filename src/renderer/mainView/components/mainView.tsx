import React, { useState } from 'react';

import styles from '../styles/mainView.module.css';

const MainView = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await window.ipcApi.handleMessage(input);
    setMessage(result);
  };

  return (
    <div className={styles.height100}>
      {message && <p>{message}</p>}

      <form className={styles.height100} onSubmit={handleSubmit}>
        <input
          className={`${styles.height100} ${styles.width100} ${styles.font}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MainView;
