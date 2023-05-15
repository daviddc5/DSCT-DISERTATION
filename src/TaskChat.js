import React, { useState } from 'react';
import TagMessages from './TagMessages';

function TaskChat({ task }) {
  // In TaskChat component
  console.log(task);
  const lowerCaseTask = typeof task === 'string' ? task.toLowerCase().trim() : '';

  const [messages, setMessages] = useState(TagMessages[lowerCaseTask] || []);

  const [newMessage, setNewMessage] = useState('');

  function handleNewMessageChange(event) {
    setNewMessage(event.target.value);
  }

  function handleSendMessage(event) {
    event.preventDefault();
    const newMessageObj = {
      sender: 'user1',
      message: newMessage,
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  }

  return (
    <div className="task-chat">
      <h2>Task Chat: {task}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user1' ? 'sent' : 'received'}`}>
            <span className="sender">{message.sender}</span>
            <span className="message">{message.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="form-group">
          <input type="text" value={newMessage} onChange={handleNewMessageChange} />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default TaskChat;
