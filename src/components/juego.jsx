import React, { useEffect, useState } from "react";
import "../App.css"
import Apuestas from "./apuetas";
import Ranking from "./rankings";
import Rules from "./rules";

function Juego({ data }) {

    const valorCarta = (value) => {
        let valor;
        switch (value) {
            case 1:
                valor = 1;
                break;
            case 11:
            case 12:
            case 13:
                valor = 10;
                break;
            default:
                valor = value;
                break;
        }
        return valor;
    };
    const [cartasDealer, setCartasDealer] = useState([])
    const [cartasUser, setCartasUser] = useState([])

    const [stand, setStand] = useState(false)
    const [repartir, setRepartir] = useState(false)

    const [valorCartasDealer, setValorCartasDealer] = useState(0);
    const [valorCartasUser, setValorCartasUser] = useState(0);


    const [letrasAleatorias, setLetrasAleatorias] = useState([]);

    const [visibility, setVisibility] = useState(false)

    const [visibilityCard, setVisibilityCard] = useState(false)


    const [finUser, setFinUser] = useState(false)


    const [apuesta, setApuesta] = useState(false)

    const start = async () => {
        setFinUser(false);
        setValorCartasDealer(0);
        setValorCartasUser(0);

        const dealer = [];
        const user = [];

        for (let index = 0; index < 2; index++) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    let valor = Math.floor((Math.random() * 13) + 1);
                    dealer.push(valorCarta(valor));

                    setCartasDealer([...dealer]);

                    resolve();
                }, index * 500); // Retraso de 0.25 segundos entre cada carta
            });
        }
        await new Promise((resolve) => {
            setTimeout(resolve, 850);
        });
        for (let index = 0; index < 2; index++) {
            await new Promise((resolve) => {
                setTimeout(() => {

                    let valor2 = Math.floor((Math.random() * 13) + 1);
                    user.push(valorCarta(valor2));
                    setCartasUser([...user]);
                    resolve();
                }, index * 500); // Retraso de 0.25 segundos entre cada carta
            });
        }
    };


    useEffect(() => {
        let total = 0;
        let asCount = 0;
        for (let index = 0; index < cartasDealer.length; index++) {
            let valor = cartasDealer[index];
            if (valor === 1) {
                asCount++;
            }
            if (valor > 10) {
                total += valorCarta(10);
            } else {
                total += valorCarta(valor);
            }
        }
        for (let i = 0; i < asCount; i++) {
            if (total + 10 <= 21) {
                total += 10;
            }
        }
        setValorCartasDealer(total);
    }, [cartasDealer]);
    useEffect(() => {
        let total = 0;
        let asCount = 0;
        for (let index = 0; index < cartasUser.length; index++) {
            let valor = cartasUser[index];
            if (valor === 1) {
                asCount++;
            }
            if (valor > 10) {
                total += valorCarta(10);
            } else {
                total += valorCarta(valor);

            }
        }
        // Determinar el valor del As
        for (let i = 0; i < asCount; i++) {
            if (total + 10 <= 21) {
                total += 10;
            }
        }
        setValorCartasUser(total);
        if ((total || cartasUser) > 21) {
            setFinUser(true)

            setRepartir(true)
            setStand(true)
            console.log("mas 21")
        }
    }, [cartasUser]);
    /*
      useEffect(() => {
        if (stand && valorCartasDealer < 17 && !finUser) {
          const timeoutId = setTimeout(() => {
            repartirDealer();
          }, 500); // 500 milisegundos (medio segundo)
          console.log(valorCartasDealer)
          // Limpia el timeout si el componente se desmonta o el estado cambia antes del tiempo de espera
          return () => {
            clearTimeout(timeoutId);
            console.log("HOLA", valorCartasDealer);
          }
        }
        console.log(valorCartasDealer)
    
      }, [stand, valorCartasDealer, finUser]);
    */


    const repIn = () => {
        if (!stand) {
            setVisibility(true)

            setStand(true);
            setRepartir(true)

        }
    };


    const repartirDealer = () => {
        const dealer = [...cartasDealer];
        let total = valorCartasDealer;

        // Comprobar si hay un As que pueda ser contado como 11 sin pasarse de 21
        let tieneAs = false;
        for (let i = 0; i < dealer.length; i++) {
            if (dealer[i] === 1 && total + 11 <= 21) {
                tieneAs = true;
                break;
            }
        }

        // Si la suma actual es menor que 17 o tiene un As utilizable, extraer otra carta
        if (total < 17 || tieneAs) {
            let valor = Math.floor((Math.random() * 13) + 1);
            dealer.push(valorCarta(valor));
            total += valorCarta(valor);
        }

        setCartasDealer(dealer);

    };


    const repartirUser = () => {
        const user = [...cartasUser]
        let valor2 = Math.floor((Math.random() * 13) + 1)
        user.push(valorCarta(valor2))
        setCartasUser(user)

    }


    const restart = () => {
        setVisibility(false)
        setFinUser(true)

        setCartasDealer([])
        setCartasUser([])
        setValorCartasUser(0)
        setValorCartasDealer(0)
        setGanador(null)
        setApuesta(true)

        setVisibilityCard(true)
        start()
        setStand(false)

        setRepartir(false)

    }

    useEffect(() => {
        const letras = ['C', 'D', 'H', 'S'];
        const nuevasLetrasAleatorias = Array.from({ length: 52 }, () => letras[Math.floor(Math.random() * letras.length)]);
        setLetrasAleatorias(nuevasLetrasAleatorias);
    }, []);

    const [ganador, setGanador] = useState(null)

    useEffect(() => {
        // Lógica para verificar si el usuario se pasa de 21
        if (valorCartasUser > 21) {
            setFinUser(true);
            setRepartir(true);
            setStand(true);
            console.log("El usuario se pasó de 21");
            setGanador("Banca")
            setApuesta(false)
        }
    }, [valorCartasUser]);
    useEffect(() => {
        // Lógica para que el repartidor saque cartas hasta alcanzar al menos 17 puntos
        if (stand && valorCartasDealer < 17 && !finUser) {
            const timeoutId = setTimeout(() => {
                repartirDealer();
            }, 500); // 500 milisegundos (medio segundo)

            return () => {
                clearTimeout(timeoutId);
            };
        }

        // Lógica para determinar quién gana al final del juego
        if (stand && valorCartasDealer >= 17 && !finUser) {
            if (valorCartasDealer > 21 || valorCartasUser > valorCartasDealer) {
                console.log("¡El usuario gana!");
                setGanador("Usuario")

            } else if (valorCartasUser === valorCartasDealer) {
                console.log("¡Empate!");
                setGanador("Empate")

            }
            else if (valorCartasDealer === valorCartasUser) {
                const tieneBlackjackBanca = (cartasDealer.includes(1) && (cartasDealer.includes(10) || cartasDealer.includes(11) || cartasDealer.includes(12) || cartasDealer.includes(13))) && cartasDealer.length === 2;
                const tieneBlackjackUsuario = (cartasUser.includes(1) && (cartasDealer.includes(10) || cartasUser.includes(11) || cartasUser.includes(12) || cartasUser.includes(13))) && cartasUser.length === 2;

                if (tieneBlackjackBanca && !tieneBlackjackUsuario) {
                    console.log("¡El repartidor gana!");

                    setGanador("Banca")
                } else if (!tieneBlackjackBanca && tieneBlackjackUsuario) {
                    console.log("¡El usuario gana!");

                    setGanador("Usuario")
                } else if (tieneBlackjackBanca && tieneBlackjackUsuario) {
                    console.log("¡Empate!");
                    setGanador("Empate")
                } else if (!tieneBlackjackBanca && !tieneBlackjackUsuario) {
                    console.log("¡Empate!");
                    setGanador("Empate")

                }
            }
            else {
                console.log("¡El repartidor gana!");
                setGanador("Banca")

            }
            setApuesta(false)

        }
    }, [stand, valorCartasDealer, finUser, valorCartasUser]);


    console.log(ganador)
    return (
        <div className="App" >


            <div className="container">
                <div className="prueba">
                    <div className="containerDealer">
                        <div>
                            <Ranking />


                        </div>
                        <img className="dealer" src={ganador === "Usuario" ? require(`${"../img/"}${"dealerAngry"}.png`) : require(`${"../img/"}${"dealer"}.png`)} alt="" />

                        <div >
                            <Rules />
                        </div>

                    </div>

                    <div className="table">


                        <div className="cartas">
                            {visibility && visibilityCard ? <div style={{ height: "20px" }} className="valor text">

                                Dealer:{valorCartasDealer}
                            </div> : <div style={{ height: "20px" }} className="valor text"></div>}
                            <div>



                                {
                                    cartasDealer.map((item, index) => {
                                        if ((index === 0 && !visibility)) {
                                            return (
                                                <img className="carta" src={require(`${"../img/"}${"back"}.png`)} alt="" />

                                            )
                                        }
                                        if (visibilityCard) {
                                            return (
                                                <img className="carta" src={require(`${"../img/"}${item}${letrasAleatorias[index]}.png`)} alt="" />
                                            )
                                        } else {

                                        }

                                        return (
                                            <img className="carta" src={require(`${"../img/"}${"back"}.png`)} alt="" />)
                                    })
                                }
                            </div>
                        </div>


                        <div className="cartas">
                            <div>

                                {
                                    cartasUser.map((item, index) => {
                                        if (visibilityCard) {
                                            return (
                                                <img className="carta" src={require(`${"../img/"}${item}${letrasAleatorias[index]}.png`)} alt="" />
                                            )
                                        } else {
                                            return (
                                                <img className="carta" src={require(`${"../img/"}${"back"}.png`)} alt="" />

                                            )
                                        }

                                    })
                                }
                            </div>
                            <div>
                                {visibilityCard && cartasUser.length > 0 ? <div style={{ height: "20px" }} className="valor text">

                                    Score:{valorCartasUser}
                                </div> : <div style={{ height: "20px" }}></div>}
                            </div>
                        </div>



                    </div>
                </div>
                <div className="containerRight">
                    <div className={`resultado ${ganador ? 'show' : ''}`}>
                        {ganador === "Banca" && ganador !== "Empate" ? <div>You lose </div> : ganador === "Usuario" ? <div>You win </div> : <div></div>}
                        {ganador === "Empate" ? <div>Draw</div> : <div></div>}
                    </div>
                    {visibilityCard ? <div className="containerButton">
                        <button className={repartir ? "button disabled text" : "button "} disabled={repartir ? true : false} onClick={() => repartirUser()}> Hit </button>
                        <button className={stand ? "button disabled text" : "button "} disabled={stand ? true : false} onClick={() => repIn()}> Stand </button>

                    </div> : <div className="containerButton noMobile"></div>}
                </div>





            </div>
            <div style={{ zIndex: 2 }}>
                <Apuestas data={data} ganador={ganador} onRestart={restart} />

            </div>


        </div >
    );
}

export default Juego;
