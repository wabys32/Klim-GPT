export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        try {
            // Replace localhost with the deployed Python server URL
            const response = await fetch('https://klim-gpt-server.vercel.app/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to communicate with the Python server');
            }

            const data = await response.json();
            res.status(200).json(data); // Send the bot's response back to the client
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
