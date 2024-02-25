import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

type Movi = {
    id: number;
    Name: string;
    Male: string;
    Study: string;
    Year:  number;
}

let Movies: Movi[] = [{
    id: 1,
    Name: 'El chico y La Garza',
    Male: 'Hayao Miyazaki https',
    Study: 'Studio Ghibli',
    Year: 2023 
}];

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use((req, res, next) => {
    //     if (ic.caller().isAnonymous()) {
    //         res.status(401);
    //         res.send();
    //     } else {
    //         next();
    //     }
    // });

    // GET
    app.get('/Movies', (req, res) =>{
        res.json(Movies);
    });

   //POST
    app.post('/Movies', (req, res) => {
        const id = req.body.id;
        const Movi = Movies.find((Movi) => Movi.id === id);

        if(!Movi){
            Movies = [...Movies, req.body]
        res.send("ok");
        }else{
            res.status(404).send("el id ya existe");
            return;
        }
        
    });

    //PUT
     app.put("/Movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const Movi = Movies.find((Movi) => Movi.id === id);

    if(!Movi){
        res.status(404).send("Valio");
        return;
    }
    const updateBook = { ...Movi, ...req.body };
    Movies = Movies.map((b) => b.id === updateBook.id ? updateBook : b);

    res.send("ok");
    });

    //DELETE
    app.delete("/Movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Movies = Movies.filter((Movi) => Movi.id !== id);
    res.send("ok");
    });
    return app.listen();
    });
