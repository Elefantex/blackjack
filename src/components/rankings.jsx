import React, { useState, useEffect } from "react";
import './Ranking.css'; // Archivo CSS para estilos


export default function Ranking() {


    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)

    const sortByPoints = (arr) => {
        return arr.slice().sort((a, b) => b.puntos - a.puntos);
    };
    const register = async () => {
        try {
            const response = await fetch("https://blackjack-ggm5.onrender.com/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            });

            const data = await response.json(); // Convertir la respuesta a formato JSON

            if (response.ok) {
                setData(sortByPoints(data));

                // Verificar el mensaje devuelto por el servidor

            } else {
                console.error("Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    useEffect(() => {
        register()

    }, [open])
 
    return (
        <>
            <img className="trophy"
                src={require(`${"../img/"}${"trophy"}.png`)} alt=""
                onClick={() => setOpen(!open)}
            />
            {open ? <div className="ranking" onClick={() => setOpen(!open)}>
                <div className="ranking-container">
                    <h1>Top 10 score</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.usuario}</td>
                                    <td>{user.puntos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></div> : null}

        </>
    )
}