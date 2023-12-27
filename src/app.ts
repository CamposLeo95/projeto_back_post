import express from "express";
import { routes } from "./routes/routes";
import cors from 'cors'

export class App{

    app = express()

    constructor(){
        this.app
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use(routes)
    }
}

export default new App().app