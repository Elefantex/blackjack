import React, { useEffect, useState } from "react"

export default function Apuestas({ data, ganador, onRestart }) {

    const [money, setMoney] = useState(data.puntos)
    const [apostado, setApostado] = useState(0)

    const [chips, setChips] = useState([])

    const [chip1, setChip1] = useState(0)
    const [chip10, setChip10] = useState(0)
    const [chip100, setChip100] = useState(0)
    const [chip500, setChip500] = useState(0)


    const [visibility, setVisibility] = useState(true)

    const [animateChipDown, setAnimateChipDown] = useState(false);

    const [animateChipUp, setAnimateChipUp] = useState(false);


    const sumarDinero = async (usuario, puntos) => {
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario: usuario, puntos: puntos })
            });

            if (response.ok) {
                // Verificar el mensaje devuelto por el servidor
                console.log("correct")

            } else {
                console.error("Error");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }


    const reponer = () => {
        setMoney(2000)
        sumarDinero(data.usuario, 2000)
    }

    useEffect(() => {
        setChip1(Math.trunc(money / 1))
        setChip10(Math.trunc(money / 10))
        setChip100(Math.trunc(money / 100))
        setChip500(Math.trunc(money / 500))

    }, [apostado, reponer])

    const apostar = (valor) => {

        setApostado((prev) => prev + valor)
        let fichas = [...chips]
        fichas.push(valor)
        setChips(fichas)
        setMoney((prev) => prev - valor)



    }
    const quitarApuesta = (valor) => {
        setApostado((prev) => prev - valor)
        let fichas = [...chips]
        fichas.splice(-1)
        setChips(fichas)
        setMoney((prev) => prev + valor)

    }

    const endBets = () => {
    
        setVisibility(false)
        onRestart()
    }
    useEffect(() => {
        if (ganador === "Usuario") {
            setMoney(money + (apostado * 2))
            setApostado(0)

            setVisibility(true)
            let valor = money + (apostado * 2)
            sumarDinero(data.usuario, valor)
            setAnimateChipDown(true);
            setTimeout(() => {
                setAnimateChipDown(false);
                setChips([])
            }, 1500);

        }
        if (ganador === "Banca") {
            setMoney(money)
            setApostado(0)
            setVisibility(true)
            let valor = money
            sumarDinero(data.usuario, valor)
            setAnimateChipUp(true);
            setTimeout(() => {
                setAnimateChipUp(false);
                setChips([])

            }, 1500);

        }
        if (ganador === "Empate") {
            setMoney(money + apostado)
            setApostado(0)
            setChips([])
            setVisibility(true)
            let valor = money + apostado
            sumarDinero(data.usuario, valor)


        }
    }, [ganador])

    return (
        <div className="apuestas">
            <div className={`resultado ${ganador ? 'show' : ''}`}>
                {ganador === "Banca" && ganador !== "Empate" ? <div>You lose </div> : ganador === "Usuario" ? <div>You win </div> : <div></div>}
                {ganador === "Empate" ? <div>Draw</div> : <div></div>}
            </div>
            <div className="apostado">
                <div className="text">
                    Betted: {apostado}
                </div>
                {chips.length > 0 ? <>
                    <img className={`chip ${animateChipDown ? 'animate-down' : ''} ${animateChipUp ? 'animate-up' : ''}`}
                        onClick={() => {
                            if (visibility) {
                                quitarApuesta(chips[chips.length - 1]);
                            }
                        }}

                        src={require(`${"../img/"}${"chip"}${chips[chips.length - 1]}.png`)} alt="" />

                </> : <div className="chip"></div>}
            </div>


            <div className="chips">
                <div className="contenedor">

                    {chip1 === 0 ? <div className="chip">

                    </div> : <>
                        <img onClick={() => {
                            if (visibility) {
                                apostar(1);
                            }
                        }}
                            id="chip-1" className="chip" src={require(`${"../img/"}${"chip1"}.png`)} alt="" />

                    </>}
                    {chip10 === 0 ? <div className="chip">

                    </div> : <>
                        <img onClick={() => {
                            if (visibility) {
                                apostar(10);
                            }
                        }} id="chip-10" className="chip" src={require(`${"../img/"}${"chip10"}.png`)} alt="" />

                    </>}
                    {chip100 === 0 ? <div className="chip">


                    </div> : <>
                        <img onClick={() => {
                            if (visibility) {
                                apostar(100);
                            }
                        }} id="chip-100" className="chip" src={require(`${"../img/"}${"chip100"}.png`)} alt="" />

                    </>}
                    {chip500 === 0 ? <div className="chip">


                    </div> : <>
                        <img onClick={() => {
                            if (visibility) {
                                apostar(500);
                            }
                        }} id="chip-500" className="chip" src={require(`${"../img/"}${"chip500"}.png`)} alt="" />

                    </>}

                </div>

                {visibility && apostado > 0 ? <div className="contenedorBtn">

                    <button className="buttonBet" onClick={() => endBets()}>BET</button>
                </div> : <div className="contenedorBtn"></div>}
                <div className="text">Money: {money}</div>


                <div>
                    {money === 0 && apostado === 0 ? <><button onClick={() => reponer()}>Free chips</button> </> : null}

                </div>


            </div>


        </div>
    )
}