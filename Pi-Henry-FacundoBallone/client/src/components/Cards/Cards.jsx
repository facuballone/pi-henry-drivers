/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import styles from "./Cards.module.css"

const Cards = ({drivers})=>{

    const allDrivers = drivers
    return (
        <div className={styles.cardsContainer}>
            {allDrivers?.map((driver)=>(<Card driver={driver} key={driver.id}/>))}
        </div>
    )
}

export default Cards;