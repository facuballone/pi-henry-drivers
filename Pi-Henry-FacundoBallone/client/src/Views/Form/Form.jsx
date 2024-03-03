/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { addDriver, getTeams } from "../../Redux/Actions/actions";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import {
  validateDescription,
  validateDob,
  validateForename,
  validateImage,
  validateNationality,
  validateSurname,
} from "./validations";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeams());
  }, []);
  const teams = useSelector((state) => state.allTeams);

  const [selectedTeams, setSelectedTeams] = useState("");
  const [showTeams, setShowTeams] = useState("");
  const [driver, setDriver] = useState({
    forename: "",
    surname: "",
    dob: "",
    nationality: "",
    description: "",
    teams: "",
    image: "",
    createdinDB: true,
  });
  const [error, setError] = useState({
    forename: validateForename(driver.forename),
    surname: validateSurname(driver.surname),
    dob: validateDob(driver.dob),
    nationality: validateNationality(driver.nationality),
    description: validateDescription(driver.description),
    teams: null,
    image: validateImage(driver.image),
  });
  const [formValid, setFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDriver({ ...driver, [name]: value });

    let errorMessage = "";

    if (name === "forename") {
      errorMessage = validateForename(value);
    } else if (name === "surname") {
      errorMessage = validateSurname(value);
    } else if (name === "dob") {
      errorMessage = validateDob(value);
    } else if (name === "description") {
      errorMessage = validateDescription(value);
    } else if (name === "nationality") {
      errorMessage = validateNationality(value);
    } else if (name === "image") {
      errorMessage = validateImage(value);
    }

    setError({ ...error, [name]: errorMessage });
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //evitar que se recargue la pagina 
    dispatch(addDriver(driver));
    setDriver({
      forename: "",
      surname: "",
      dob: "",
      nationality: "",
      description: "",
      teams: "",
      image: "",
      createdinDB: true,
    });
    setSuccess(true);
  };

  const handleTeamSelection = (e) => {
    const options = e.target.options;
    let teamsSelected = "";

    for (let i = 0; i < options.length; i++) {
      if (
        options[i].selected &&
        !selectedTeams.split(",").includes(options[i].value)
      ) {
        const newTeam = options[i].value + ", ";
        teamsSelected = selectedTeams.concat(newTeam);
        setSelectedTeams(teamsSelected);
        setDriver({ ...driver, teams: selectedTeams });
        setError({ ...error, teams: "" });
        let selectedTeamsRef = teamsSelected;
        selectedTeamsRef = selectedTeamsRef.split(",");
        selectedTeamsRef.pop();
        selectedTeamsRef = selectedTeamsRef.join(",");
        setShowTeams(selectedTeamsRef);
      }
    }
    validateForm();
  };

  const validateForm = () => {
    if (
      error.surname === "" &&
      error.forename === "" &&
      error.description === "" &&
      error.dob === "" &&
      error.nationality === "" &&
      error.image === ""
    ) {
      setFormValid(true);
    } else {
      setFormValid(false)
    }
  };


  return (
    <div key="">
      <div>
        <NavBar />
      </div>
      <form key={"add-driver-form"} onSubmit={handleSubmit}>
        <div className={styles["form-container"]}>
          <div>
            <div >
              <input
                key={"driver-forename"}
                type="text"
                name="forename"
                value={driver.forename}
                onChange={handleChange}
                placeholder="Name"
                className={error.forename ? "error" : ""}
              />
              {error.forename && <div className={`error ${styles["texto-pequeño"]}`}>{error.forename}</div>}
              <input
                key={"driver-surname"}
                type="text"
                name="surname"
                value={driver.surname}
                onChange={handleChange}
                placeholder="Surname"
              />
              {error.surname && <div className={`error ${styles["texto-pequeño"]}`}>{error.surname}</div>}
              <input
                key={"driver-dob"}
                type="text"
                name="dob"
                value={driver.dob}
                onChange={handleChange}
                placeholder="Date of birth (YYYY-MM-DD)"
              />
              {error.dob && <div className={`error ${styles["texto-pequeño"]}`}>{error.dob}</div>}
            </div>
            <div >
              <input
                key={"driver-description"}
                type="text"
                name="description"
                value={driver.description}
                onChange={handleChange}
                placeholder="Description"
              />
              {error.description && (
                <div className={`error ${styles["texto-pequeño"]}`}>{error.description}</div>
              )}
              <input
                key={"driver-nationality"}
                type="text"
                name="nationality"
                value={driver.nationality}
                onChange={handleChange}
                placeholder="Nationality"
              />
              {error.nationality && (<div className={`error ${styles["texto-pequeño"]}`}>{error.nationality}</div>)}
              <input
                key={"driver-img"}
                type="text"
                name="image"
                value={driver.image}
                onChange={handleChange}
                placeholder="URL image"
              />
              {error.image && <div className={`error ${styles["texto-pequeño"]}`}>{error.image}</div>}
            </div>
            <select
              value={"defaultValue"}
              name="teams"
              id="teams"
              onChange={handleTeamSelection}
            >
              <option value="defaultValue" disabled>
                Choose your teams
              </option>
              {teams.map((team, index) => (
                <option key={team + index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <div className={styles.teamselected}>
              {showTeams.length > 0 ? (
                <div>{showTeams}</div>
              ) : (
                <div>Your teams</div>
              )}
            </div>
          </div>
          <div>
            <button type="submit" disabled={!formValid}>
              Add driver
            </button>
          </div>
        </div>
      </form>
      {success && (
        <div className={styles.modalContainer}>
          <dialog open={success} className={styles.successBtn}>
            <p>Driver created successfully!!</p>
            <button onClick={() => navigate("/home")}>Return to home</button>
          </dialog>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  drivers: state.drivers,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps)(Form);
