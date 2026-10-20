import style from "./Cabecalho.module.css"

function Cabecalho(){
    return(
        <header className={style.header}>
            <img className={style.logo} src="/favicon.svg" alt="logo" />
            <h1>Vitrine de projetos</h1>
        </header>
    )
} export default Cabecalho  