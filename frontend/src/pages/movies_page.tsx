import { AuthButton, useRestActor } from "@bundly/ic-react";
import { useEffect, useState } from "react";
import "../app/movies.css";

interface Movi {
    id: number;
    Name: string;
    Male: string;
    Study: string;
    Year: number;
}

export default function Movies() {

    const backend = useRestActor("backend");
    const [movies, setMovies] = useState<Movi[]>([]);

    useEffect(() => {
        loadMovies();
    }, []);

    async function loadMovies() {
        try {
            const res = await backend.get("/Movies");
            const data = res.data as Movi[];

            setMovies(data)
        } catch (error) {
            console.error({ error });
        }
    }

    async function updateMovie(id: number/*, updatedMovie: Partial<Movi>*/) {
        try {
            await backend.put(`/Movies/:${id}`/*, updatedMovie*/);
        } catch (error) {
            console.error({ error });

        }
    }

    async function deleteMovie(id: number) {
        try {
            await backend.delete(`/Movies/:${id}`)
            setMovies((prevMovies) =>
                prevMovies.filter(movie => movie.id !== id)
            );
        } catch (error) {

        }
    }

    return (
        <body>
            <div className="card">
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <h2>{movie.Name}</h2>
                        <p>Director: {movie.Male}</p>
                        <p>Studio: {movie.Study}</p>
                        <p>Year: {movie.Year}</p>
                        <button onClick={() => deleteMovie(movie.id)}>DELETE</button>
                        {/* <button onClick={() => updateMovie(movie.id)}>UPDATE</button> */}
                    </div>

                ))}
            </div>
        </body>
    )
};
