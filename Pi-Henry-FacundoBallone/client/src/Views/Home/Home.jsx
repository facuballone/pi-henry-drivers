// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers, getTeams } from "../../Redux/Actions/actions";
import Loading from "../../assets/Loading.gif"
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import Paginado from "../../components/Paginado/Paginado";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const filtredDrivers = useSelector((state) => state.filtredDrivers);
  const driverPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastDriver = currentPage * driverPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driverPerPage;
  const currentDrivers = filtredDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getAllDrivers());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  window.scrollTo(0, 0);
  return (
    <div className={styles.homeContainer}>
      <div>
        <NavBar setCurrentPage={setCurrentPage}/>
      </div>
      <div>
        { currentDrivers.length ? <Cards drivers={currentDrivers} /> : <img src={Loading} /> }
      </div>
      <div>
        <Paginado
          allDrivers={filtredDrivers}
          driverPerPage={driverPerPage}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
