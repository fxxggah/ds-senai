import styles from "./ProjetoCard.module.css"

function ProjetoCard({imagem, nome}) {
    return(
        <div className={styles.card}>

            <img src={imagem} alt={nome} className={styles.imagem}/>

            <div className={styles.corpo}>

                <h3>{nome}</h3>
                <p>Galerias desenvolvidas em React</p>

            </div>

        </div>
        )
    } export default ProjetoCard