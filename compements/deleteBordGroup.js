import Card from "./deleteCard";
import { CardGroup } from "react-bootstrap";
import Pagination from "./Pagination";
import React from "react";
const DeleteCardBord = ({ cards }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const carsPerPage = 6;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cards.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1>Produtker</h1>
      <CardGroup>
        {currentCars.map((card, key) => (
          <Card key={key} {...card} />
        ))}
      </CardGroup>
      <Pagination
        postPerPage={carsPerPage}
        totalPost={cards.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DeleteCardBord;
