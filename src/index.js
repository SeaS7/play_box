import dotenv from 'dotenv';
import dbConection from './db/index.js'


dotenv.config({
    path: './.env'
});


dbConection();