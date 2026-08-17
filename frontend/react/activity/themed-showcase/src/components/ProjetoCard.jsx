import styles from "./ProjetoCard.module.css"

function ProjetoCard({imagem, nome}) {
    return(
        <div className={styles.card}>

            <img src={imagem} alt={nome} className={styles.imagem}/>

            <div className={styles.corpo}>

                <h3>{nome}</h3>
                <p>Campeoẽs das ultimas 6 Copas do mundo</p>

            </div>

        </div>
        )
    } export default ProjetoCard