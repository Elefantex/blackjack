import React, { useState, useEffect } from "react";
import './Rules.css';


export default function Rules() {


    const [open, setOpen] = useState(false)



    return (
        <>
            <img className="question"
                src={require(`${"../img/"}${"question"}.png`)} alt=""
                onClick={() => setOpen(!open)}
            />
            {open ?
                <div className="ranking" onClick={() => setOpen(!open)}>
                    <div className="blackjack-rules">
                        <h2>Reglas del Blackjack</h2>
                        <ul>
                            <li>El objetivo del juego es obtener una mano con un valor lo más cercano posible a 21 sin pasarse.</li>
                            <li>Las cartas numéricas suman su valor nominal, las cartas con figuras (J, Q, K) suman 10 y el As puede valer 1 u 11, dependiendo de lo que sea más conveniente para el jugador.</li>
                            <li>Si la suma de las cartas de una mano es mayor a 21, se pierde automáticamente.</li>
                            <li>El crupier (dealer) también juega y debe seguir reglas específicas, generalmente debe pedir carta (hit) hasta alcanzar al menos 17.</li>
                            <li>Si un jugador obtiene exactamente 21 con sus dos primeras cartas (un As y una carta con valor 10), tiene un "blackjack" y generalmente gana automáticamente a menos que el crupier también tenga un blackjack.</li>
                                                     
                        </ul>
                    </div>
                </div> : null}

        </>
    )
}