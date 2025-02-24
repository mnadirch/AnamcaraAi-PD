import React, { useState } from 'react';
import chatStyles from './chat.module.css';
import avatar from '../../../../assets/images/headimages/Ellipse 90.png';
import arrow from '../../../../assets/images/dashboard/arrow-right-s-line.svg';
import useWindowSize from '../../../../pages/main/useWindowSIze';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const Chat: React.FC = () => {
    const { width } = useWindowSize();

    const [inputValue, setInputValue] = useState('');
    // Initialize messages with a welcome bot message
    const [messages, setMessages] = useState<Message[]>([
        { text: 'Hello! Ask me something about the world atmosphere.', sender: 'bot' },
    ]);
    const qaPairs: { question: string; answer: string }[] = [
        {
            question: "What gases are in Earth's air?",
            answer: "Earth's air is mostly nitrogen (78%) and oxygen (21%), with small amounts of other gases.",
        },
        {
            question: "How do greenhouse gases work?",
            answer: "They trap heat in our air, keeping the planet warm, but too many can cause global warming.",
        },
        {
            question: "What causes climate change?",
            answer: "Climate change is mostly caused by burning fossil fuels, cutting down trees, and pollution from factories.",
        },
        {
            question: "How can we make the air better?",
            answer: "We can use clean energy, save energy, and protect nature to improve our atmosphere.",
        },
    ];

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            // Add user's question to the messages list
            const userMsg: Message = { text: inputValue.trim(), sender: 'user' };
            setMessages(prev => [...prev, userMsg]);

            // Determine if the question matches one of our predefined Q&A pairs
            const matchedPair = qaPairs.find(pair =>
                pair.question.toLowerCase() === inputValue.trim().toLowerCase()
            );

            const botAnswer = matchedPair
                ? matchedPair.answer
                : "I'm sorry, I can only answer questions related to the world atmosphere. Please ask one of the following:\n\n• What is the composition of the Earth's atmosphere?\n• How do greenhouse gases affect the world atmosphere?\n• What are the main causes of climate change?\n• What measures can be taken to improve the world atmosphere?";

            setInputValue('');

            // Simulate a bot response after a short delay
            setTimeout(() => {
                const botMsg: Message = { text: botAnswer, sender: 'bot' };
                setMessages(prev => [...prev, botMsg]);
            }, 1000);
        }
    };

    const messageTime = () => {
        const now = new Date();
        let hours = now.getHours(); // Get hours as a number
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12; // Correctly convert to 12-hour format AFTER determining AM/PM
        const formattedHours = hours.toString().padStart(2, '0'); // Add leading zero if needed

        return `${formattedHours}:${minutes} ${amOrPm}`;
    };
    return (
        <>
            {width !== null && width > 1023 ? (
                <div className={chatStyles.chatContainer}>
                    <div className={chatStyles.inputArea}>
                        {/* Avatar */}
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className={chatStyles.chatAvatar}
                        />
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className={chatStyles.chatInput}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSend();
                            }}
                        />
                        <button
                            className={chatStyles.sendButton}
                            onClick={handleSend}
                        >
                            <img
                                src={arrow}
                                alt="Send arrow"
                                className={chatStyles.sendIcon}
                            />
                        </button>
                    </div>

                    <div className={chatStyles.chatMessages}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`${chatStyles.chatBubble} ${msg.sender === 'user' ? chatStyles.userMessage : ''
                                    }`}
                            >
                                <span className={chatStyles.chatText}>{msg.text}</span>
                                <span className={chatStyles.chatTime}>{messageTime()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={chatStyles.chatContainer}> <div className={chatStyles.chatMessages}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${chatStyles.chatBubble} ${msg.sender === 'user' ? chatStyles.userMessage : ''
                                }`}
                        >
                            <span className={chatStyles.chatText}>{msg.text}</span>
                            <span className={chatStyles.chatTime}>{messageTime()}</span>
                        </div>
                    ))}
                </div>
                
                    <div className={chatStyles.inputArea}>
                        {/* Avatar */}
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className={chatStyles.chatAvatar}
                        />
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className={chatStyles.chatInput}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSend();
                            }}
                        />
                        <button
                            className={chatStyles.sendButton}
                            onClick={handleSend}
                        >
                            <img
                                src={arrow}
                                alt="Send arrow"
                                className={chatStyles.sendIcon}
                            />
                        </button>
                    </div>


                </div>
            )}

        </>

    )
}
export default Chat;
