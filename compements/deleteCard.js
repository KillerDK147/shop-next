import { Button, Card as BsCard } from "react-bootstrap";
import { getCurrentUser } from "../Service/authService";
import { deleteProd } from "../Service/prodService";
import { revalidate } from "../Service/Reload";
import toast from "./toast/toast";
import Router from "next/router";
import * as ReactBootStrap from "react-bootstrap";
import react, { useState } from "react";
const DeleteCard = ({
  titel,
  katergori,
  besk,
  sti,
  antal,
  enhed,
  pris,
  seller,
  _id,
}) => {
  const [loading, setLoading] = useState(false);
  const Id = getCurrentUser()._id;
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (_id !== undefined) {
        setLoading(false);
        console.log(_id);
        await deleteProd(_id);
        await revalidate()
          .then(() => {})
          .then(() => {
            toast.success("Produktet er slettet");
            setLoading(true);
          });
        console.log("deleted");
        Router.reload();
        toast({ type: "success", message: "Produktet er slettet" });
      }
    } catch (ex) {
      toast({ type: "error", message: "Produktet er ikke slettet" });
      console.log(ex);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="border d-flex align-items-center justify-content-center mt-5 border-0">
          <ReactBootStrap.Spinner animation="border" />
        </div>
      ) : (
        <BsCard>
          <div className="p-2">
            <BsCard.Img variant="top" src={sti} />
          </div>
          <BsCard.Body>
            <BsCard.Title>
              {titel} - pris: {pris},-
            </BsCard.Title>
            <BsCard.Text>{besk}</BsCard.Text>
            <BsCard.Text>
              {antal} {enhed}
            </BsCard.Text>
            <Button className="btn btn-succses">Resver nu</Button>
            {Id == seller && (
              <button className="btn btn-danger" onClick={handleDelete}>
                Slet
              </button>
            )}
          </BsCard.Body>
          <BsCard.Header className="small">{katergori}</BsCard.Header>
        </BsCard>
      )}
    </div>
  );
};

export default DeleteCard;
