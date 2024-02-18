import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(express.json());

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

