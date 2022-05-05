import DeleteCardBord from "../../compements/deleteBordGroup";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../Service/authService";
import httpService from "../../Service/httpService";
import { Router } from "next/dist/client/router";
const DeleteProd = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await httpService
        .get("produkter/seller/" + getCurrentUser()._id)
        .then((res) => {
          setCards(res.data);
        });

      console.log("result.data");
      console.log(cards);
      console.log("result.data");
    };
    fetchData();
  }, []);

  return (
    <div>
      <DeleteCardBord cards={cards} />
    </div>
  );
};
export function reload() {
  Router.reload();
}
export default DeleteProd;
