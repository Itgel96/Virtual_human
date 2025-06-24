import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Chat.module.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className={styles.container}>
        <h1>Persona Chatbot</h1>
        <div className={styles.messageList}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
              <div className={styles.messageText}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className={styles.loading}>Loading...</div>}
        </div>
        <div className={styles.inputContainer}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
            rows={3}
          />
          <button onClick={sendMessage} className={styles.button}>Send</button>
        </div>
      </div>
    </div>
  );
}