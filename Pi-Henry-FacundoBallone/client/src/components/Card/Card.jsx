import {Link} from "react-router-dom";
import styles from "./Card.module.css"

const Card = ({driver})=>{
    

    return(
        <div key={driver.id} className={styles["card-container"]}>
            <Link className={styles.linkContainer} to={`/detail/${driver.id}`}>
                <div  className={styles.infoContainer}> 
                <h2 className={styles["card-title"]}>{`${driver.forename}`}</h2>
                <h2 className={styles["card-title"]}>{`${driver.surname}`}</h2>
                <h3 className={styles["card-content"]}>{`${driver.teams}`}</h3>
                </div>
                <div className={styles.imgContainer}>
                <img src={driver.image} alt="Driver" className={styles["card-image"]} />
                </div>
            </Link>
        </div>
    )
}

export default Card;