import { sendEmail } from './config/mail.js';
import express, { Application, Request, Response } from 'express';
import 'dotenv/config'
import path from 'path';
import {fileURLToPath} from 'url';
import ejs from 'ejs'

const app:Application = express()
const PORT = process.env.PORT || 7000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Set views
app.set("view engine", 'ejs');
app.set("views", path.resolve(__dirname, './views'))


app.get('/', async (req: Request, res: Response) => {
    const html = await ejs.renderFile(__dirname + '/views/emails/welcome.ejs',{name:"Niranjan Kumar"})
    // console.log('html: ', html);
    await sendEmail('dalimew766@downlor.com','Testing SMTP', html);
    res.json({msg: "Email send Successfully"})
    // return res.render('emails/welcome', {name: "Niru"})
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
