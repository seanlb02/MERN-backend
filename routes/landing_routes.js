import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
        res.send(<div>Welcome to the Serene backend API</div>);
    })

export default router;