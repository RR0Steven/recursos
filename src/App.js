import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://89.116.25.43:3500/api/empleados/listar"
      );
      console.log("API Response:", response.data);
      setEmployees(response.data.result || []);
    } catch (error) {
      console.error("Error al obtener el listado de los empleados:", error);
    }
  };

  const changePage = (selected) => {
    setPageNumber(selected);
  };

  const renderEmployees = employees
    .slice(pageNumber * employeesPerPage, (pageNumber + 1) * employeesPerPage)
    .map((employee, index) => (
      <tr key={employee.id}>
        <td className="text-center">{index + 1 + pageNumber * employeesPerPage}</td>
        <td className="text-center">{employee.identificacion}</td>
        <td className="text-center">{employee.nombres}</td>
        <td className="text-center">{employee.fecha_nacimiento}</td>
        <td className="text-center">
          <div className={`progress bg-primary`}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${employee.tiempo_contrato + 3}%` }}
              aria-valuenow={employee.valor_contrato}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span className="progress-value">
                {employee.tiempo_contrato}%
              </span>
            </div>
          </div>
        </td>
        <td className="text-center">{employee.valor_contrato}</td>
        <td className="text-center">
          {employee.estado ? (
            <div className="badge bg-success">Activo</div>
          ) : (
            <div className="badge bg-danger">Inactivo</div>
          )}
        </td>
      </tr>
    ));

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const renderPageNumbers = () => {
    return (
      <>
        <li>
          <button
            className={`page-link bg-warning text-black rounded ${
              pageNumber === 0 ? "active" : ""
            }`}
            onClick={() => changePage(pageNumber - 1)}
            disabled={pageNumber === 0}
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`page-link bg-warning text-black rounded mx-1 ${
                pageNumber === index ? "active" : ""
              }`}
              onClick={() => changePage(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`page-link bg-warning text-black rounded ${
              pageNumber === totalPages - 1 ? "active" : ""
            }`}
            onClick={() => changePage(pageNumber + 1)}
            disabled={pageNumber === totalPages - 1}
          >
            Siguiente
          </button>
        </li>
      </>
    );
  };

  return (
    <div className="container bg-gray">
      <table className="table table-dark">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Identificación</th>
            <th className="text-center">Nombres</th>
            <th className="text-center">Fecha_Nacimiento</th>
            <th className="text-center">Tiempo_Contrato</th>
            <th className="text-center">Valor_Contrato</th>
            <th className="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>{renderEmployees}</tbody>
      </table>

      <div className="pagination-container d-flex justify-content-center">
        <nav>
          <ul className="pagination">{renderPageNumbers()}</ul>
        </nav>
      </div>
    </div>
  );
};

export default App;