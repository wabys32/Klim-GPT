"use client";

import '../app/global.css';
import Image from 'next/image';
import { useState } from 'react';
import { HiArrowUp } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useEffect } from "react";
import { FiList } from "react-icons/fi";
import { FiX } from "react-icons/fi";

// Define the type for the state
interface Message {
    text: string[];
    sender: 'user' | 'bot';
}

export default function Bot() {
    

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

    // Explicitly define the type of the state
    const [messages, setMessages] = useState<Array<Message>>([]);

    const sendMessage = async () => {
        const messageBox = document.getElementById('messageBox') as HTMLInputElement;
        const message = messageBox.value;

        if (!message.trim()) return;

        // Wrap the message in an array to match the updated type
        setMessages((prevMessages) => [...prevMessages, { text: [message], sender: 'user' }]);
        messageBox.value = '';

        try {
            // Send the message to an API
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();

            // Wrap the bot response in an array
            setMessages((prevMessages) => [...prevMessages, { text: [data.response], sender: 'bot' }]);
        } catch (error) {
            console.error(error);
        }
    };

    const [isPanelOpen, setIsPanelOpen] = useState(true); // Управление состоянием панели

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };


    return (
        <div>
            <div id="leftPanel" className={isPanelOpen ? 'open' : 'closed'}>
            <button id="left_panel_button" onClick={togglePanel}>
                {isPanelOpen ? <FiX /> : <FiList />}
            </button>
            <div id="klim_version">
                <select>
                    <option value="0">KlimGPT 2.0</option>
                    <option value="1">KlimGPT 1.0</option>
                </select>
            </div>
            
            {isPanelOpen && (
                <>
                    <button id="left_panel_buton" onClick={() => window.location.reload()}>
                        <Image src="/klim1.jpg" width={30} height={15} alt="Klim" id="NewKlim1" />
                        <p id="p1">New Klim</p>
                        <HiOutlinePencilAlt id="p2" />
                    </button>
                    <button id="left_panel_buton">
                        <Image src="/klim1.jpg" width={30} height={15} alt="Klim" id="NewKlim1" />
                        <p id="p1">Klimoclopedia</p>
                        <HiOutlineDocumentText id="p2" />
                    </button>
                </>
            )}
        </div>

            

            

            <div id="messagesContainer">
            {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.sender}`}>
                    {msg.sender === 'bot' ? (
                        // Используем dangerouslySetInnerHTML для рендеринга HTML
                        <div dangerouslySetInnerHTML={{ __html: msg.text[0] }} />
                    ) : (
                        // Рендерим текст пользователя как обычный текст
                        msg.text
                    )}
                </div>
            ))}
            </div>

            <div id="searchbox-wrap">
                <input id="messageBox" type="text" placeholder="Message KlimGPT..." />
                <button id="sendMessageButton" onClick={sendMessage}>
                    <HiArrowUp id="hiArrowUp" />
                </button>
            </div>
        </div>
    );
}
