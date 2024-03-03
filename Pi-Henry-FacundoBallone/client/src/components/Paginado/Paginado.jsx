/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ allDrivers, driverPerPage, paginado, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDrivers.length / driverPerPage); i++) {
    pageNumbers.push(i);
  }
  const pagesToShow = 3;

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(
    Math.ceil(allDrivers.length / driverPerPage),
    startPage + pagesToShow - 1
  );


  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div>
      {currentPage > 1 && (
        <button
          onClick={() => paginado(currentPage - 1)}
          className={styles["paginado-button"]}
        >
          {"< Anterior"}
        </button>
      )}

      {visiblePageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginado(number)}
          className={`${styles["paginado-button"]} ${
            number === currentPage ? styles["current-page"] : ""
          }`}
        >
          {number}
        </button>
      ))}

      {currentPage < pageNumbers.length && (
        <button
          onClick={() => paginado(currentPage + 1)}
          className={styles["paginado-button"]}
        >
          {"Siguiente >"}
        </button>
      )}
    </div>
  );
};

export default Paginado;
