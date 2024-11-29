export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        try {
            // Отправляем сообщение в Python через fetch
            const response = await fetch('http://localhost:5000/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to communicate with Python');
            }

            const data = await response.json();
            res.status(200).json(data); // Отправляем ответ обратно в клиент
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
