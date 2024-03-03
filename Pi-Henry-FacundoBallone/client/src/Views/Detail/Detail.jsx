import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Detail.module.css";
import { useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();

  const allDrivers = useSelector((state) => state.allDrivers);

  const [driver, setDriver] = useState({});

  useEffect(() => {
    let formattedData = {};
    const fetchData = async () => {
      try {
        let response;
        response = await axios.get(`http://localhost:3001/drivers/${id}`);
        response = response.data;
        if (!response) {
          response = allDrivers.find((driver) => driver.id === id);
        }
        const data = response;

        if (!data) {
          setDriver(null);
        } else {
          if (data.createdinDB) {
            formattedData = {
              ...data,
              image: data.image,
              dob: data.dob.split("T")[0],
            };
          } else {
            formattedData = {
              ...data,
              image: data.image.url,
            };
          }

          setDriver(formattedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const formatTeams = (teams) => {
    if (typeof teams === "string") {
      return teams;
    } else if (Array.isArray(teams)) {
      return teams.map((team) => team.name).join(", ");
    } else {
      return "";
    }
  };

  let foreName;
  let surName;
  if (driver.name) {
    const { forename, surname } = driver.name;
    foreName = forename;
    surName = surname;
  } else {
    foreName = driver.forename;
    surName = driver.surname; 
    //en caso de que driver name no exista se les asigna el valor
  }

  
  return (
    <div className={styles.error}>
      <NavBar />
      {!driver.id ? (
        <div className={styles.error}>
          <p>The driver was not found</p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.info}>
            <h3>ID: {driver.id}</h3>
            <h3>Nationality: {driver.nationality}</h3>
            <h3>Date of birth: {driver.dob}</h3>
            <h3>Teams: {formatTeams(driver.teams)}</h3>
            <h3>{driver.description}</h3>
          </div>
          <div className={styles.dni}>
            <img src={driver.image} className={styles.img} />
            <h2>
              {foreName} {surName}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
