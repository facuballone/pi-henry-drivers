import { getByName } from "../../Redux/Actions/actions";
import { useDispatch } from "react-redux";
import styles from "../SearchBar/Search.module.css"

const SearchBar = ()=>{
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        let name = e.target.value
        setTimeout(dispatch(getByName(name)), 1000);
    }

    return (
        <div  >
            <input className={styles.search} type="text" placeholder="Find a driver..." onChange={handleInputChange} />
        </div>
    )
}

export default SearchBar;