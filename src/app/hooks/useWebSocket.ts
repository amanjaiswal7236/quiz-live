import { useEffect, useState } from 'react';

type UseWebSocketReturn = {
    messages: string[];
    sendMessage: (message: string) => void;
};

const useWebSocket = (url: string): UseWebSocketReturn => {
    const [messages, setMessages] = useState<string[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(url);
        setWs(socket);

        socket.onmessage = (event: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            socket.close();
        };
    }, [url]);

    const sendMessage = (message: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        } else {
            console.warn('WebSocket is not open');
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
