/* eslint-disable no-case-declarations */
import {
  GET_BYNAME,
  GET_DRIVERS,
  FILTER_ORIGIN,
  ORDER_DRIVER,
  GET_TEAMS,
  FILTER_TEAM,
} from "../Actions/actionTypes";

const initialState = {
  allDrivers: [],
  allTeams: [],
  filtredDrivers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BYNAME:
      return { ...state, filtredDrivers: action.payload };

    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        filtredDrivers: action.payload.map((driver) => ({ ...driver })),
      };

    case FILTER_ORIGIN:
      const origin = action.payload;
      const drivers = state.allDrivers;
      
      
      const filtered =
        origin === "database"
          ? drivers.filter((driver) => driver.createdinDB === true)
          : drivers.filter((driver) => driver.createdinDB === false);
      return {
        ...state,
        filtredDrivers: origin === "all" ? state.allDrivers : filtered,
      };

    case ORDER_DRIVER:
      const order = action.payload;

      state.filtredDrivers = [];

      if (order === "A-Z") {
        const orderAZ = [...state.allDrivers].sort((a, b) => {
          const nameA = a.forename.toLowerCase();
          const nameB = b.forename.toLowerCase();
          return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
        });
        return { ...state, filtredDrivers: orderAZ };
      } else if (order === "Z-A") {
        const orderZA = [...state.allDrivers].sort((a, b) => {
          const nameA = a.forename.toLowerCase();
          const nameB = b.forename.toLowerCase();
          return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
        });
        return { ...state, filtredDrivers: orderZA };
      
      } else if (order === "dobA") {
        const orderDOBA = [...state.allDrivers].sort((a, b) => {
          const dateA = new Date(a.dob.split("-")[0]);
          const dateB = new Date(b.dob.split("-")[0]);
          return dateA - dateB;
        });
        return { ...state, filtredDrivers: orderDOBA };
      } else if (order === "dobD") {
        const orderDOBD = [...state.allDrivers].sort((a, b) => {
          const dateA = new Date(a.dob.split("-")[0]);
          const dateB = new Date(b.dob.split("-")[0]);
          return dateB - dateA;
        });
        return { ...state, filtredDrivers: orderDOBD };
      } else {
        return state;
      }
    case FILTER_TEAM:
      state.filtredDrivers = [];
      const filtrados = state.allDrivers.filter((driver) => {
        if (driver.teams) {
          return driver.teams.indexOf(action.payload) !== -1;
        }
        return false;
      });
      return { ...state, filtredDrivers: filtrados };
    case GET_TEAMS:
      return { ...state, allTeams: action.payload };
    default:
      return state;
  }
};

export default reducer;
