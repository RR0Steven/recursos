import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get('http://89.116.25.43:3500/api/empleados/listar');
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderEmployeeStatus = (status) => {
    if (status === 'Activo') {
      return <span className="badge bg-success">Activo</span>;
    } else if (status === 'Inactivo') {
      return <span className="badge bg-danger">Inactivo</span>;
    }
  };

  const renderProgressBar = (percentage) => {
    return (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    );
  };

  const itemsPerPage = 10;
  const pageCount = Math.ceil(employees.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const paginatedEmployees = employees.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <h1>Lista de Empleados</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Identificación</th>
            <th>Nombres</th>
            <th>Fecha de Nacimiento</th>
            <th>Tiempo de Contrato</th>
            <th>Valor de Contrato</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.identificacion}</td>
              <td>{employee.nombres}</td>
              <td>{employee.fecha_nacimiento}</td>
              <td>{renderProgressBar(employee.tiempo_contrato)}</td>
              <td>{employee.valor_contrato}</td>
              <td>{renderEmployeeStatus(employee.estado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'← Anterior'}
        nextLabel={'Siguiente →'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default App;