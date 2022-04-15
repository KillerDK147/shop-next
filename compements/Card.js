import { Button, Card as BsCard } from "react-bootstrap";

const Card = ({ titel, katergori, besk, sti, antal, enhed, pris }) => {
  console.log(titel);
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
      </BsCard.Body>
      <BsCard.Header className="small">{katergori}</BsCard.Header>
    </BsCard>
  );
};

export default Card;