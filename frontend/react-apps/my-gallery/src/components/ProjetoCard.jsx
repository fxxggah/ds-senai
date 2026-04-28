import style from "./ProjetoCard.module.css"
import logoReact from "../assets/react.svg"

function ProjetoCard(){
    return(
            <header className={style.outroHeader}>
                <img className={style.logo} src={logoReact} alt="logo" />
                <h1>Projeto Card</h1>
            </header>
        )
    } export default ProjetoCard    