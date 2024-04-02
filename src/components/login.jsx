import React, { useState } from "react";
import "./estilos.css"
import Juego from "./juego";



export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [dinero, setDinero] = useState(0);

    const [data, setData] = useState(null)


    const register = async () => {
        try {
            const response = await fetch(`https://blackjack-ggm5.onrender.com/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario: usuario })
            });

            const data = await response.json(); // Convertir la respuesta a formato JSON

            if (response.ok) {
                // Verificar el mensaje devuelto por el servidor
                if (data.message === "Login successful" || data.message === "Login successful") {
                    console.log("Usuario registrado exitosamente", data);
                    setDinero(data.user.puntos);
                    setData(data.user)
                } else {
                    console.error("Error al registrar usuario:", data);

                }
            } else {
                console.error("Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };



    return (
        <>
            {data ? <Juego data={data} /> : <div className="login">
                <div className="containerLogin">
                    <img className="fichasLogin" src={require(`${"../img/"}${"fichasI"}.png`)} alt="" />
                    <div>
                        <h1 className="titulo">Welcome to Blackjack</h1>

                    </div>
                    <img className="fichasLogin" src={require(`${"../img/"}${"fichasD"}.png`)} alt="" />

                </div>

                <input placeholder="Name" className="input" onChange={(e) => setUsuario(e.target.value)} value={usuario}></input>
                <button className="buttonBet" onClick={register}>Enter</button>


            </div>}

        </>
    );
}
