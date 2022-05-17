import Card from "./Card";
import { CardGroup } from "react-bootstrap";
import Pagination from "./Pagination";
import React from "react";
const CardBord = ({ cards }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const carsPerPage = 6;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  if (cards === undefined) {
    return <div>Loading...</div>;
  }
  const currentCars = cards.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1>Produtker</h1>
      <CardGroup>
        {currentCars.map((card, key) => (
          <Card key={key} {...card} style={{ height: 50 }} />
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

export default CardBord;
