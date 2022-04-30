import { Button, Card as BsCard } from "react-bootstrap";
import { getCurrentUser } from "../Service/authService";
import { deleteProd } from "../Service/prodService";
import { revalidate } from "../Service/Reload";
import toast from "./toast/toast";
import { reload } from "../pages/prod/deleteProd";
import Router from "next/router";
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
  const Id = getCurrentUser()._id;
  console.log(Id);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (_id !== undefined) {
        console.log(_id);
        await deleteProd(_id);
        await revalidate();
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
  );
};

export default DeleteCard;
