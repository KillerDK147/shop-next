import DeleteCardBord from "../../compements/deleteBordGroup";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../Service/authService";
import httpService from "../../Service/httpService";
import { Router } from "next/dist/client/router";
import * as ReactBootStrap from "react-bootstrap";
const DeleteProd = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await httpService
        .get("produkter/seller/" + getCurrentUser()._id)
        .then((res) => {
          setCards(res.data);
        })
        .then(() => {
          setLoading(true);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <DeleteCardBord cards={cards} />
      ) : (
        <div className="border d-flex align-items-center justify-content-center mt-5 border-0">
          <ReactBootStrap.Spinner animation="border" />
        </div>
      )}
    </div>
  );
};
export function reload() {
  Router.reload();
}
export default DeleteProd;
