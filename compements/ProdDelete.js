import React from "react";
import CardBord from "../compements/CardBordGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import httpService from "../Service/httpService";
import { SSRProvider } from "react-bootstrap";
import { revalidate } from "../Service/Reload";
function ProdDelete(props) {
  return (
    <div>
      <SSRProvider>
        <CardBord cards={props.cards} />
      </SSRProvider>
      {process.env.NODE_ENV == "development" && (
        <button onClick={revalidate}>Delete</button>
      )}
    </div>
  );
}

export async function getStaticProps() {
  console.log("getStaticProps");
  const result = await httpService.get("produkter/seller");
  const card = result.data;
  console.log("card");
  console.log(card);
  return {
    props: {
      cards: card.map((card) => ({
        katergori: card.katergori,
        titel: card.titel,
        besk: card.besk,
        sti: card.sti,
        antal: card.antal,
        enhed: card.enhed,
        pris: card.pris,
        id: card._id.toString(),
        seller: card.seller.toString(),
      })),
    },
  };
}

export default ProdDelete;
