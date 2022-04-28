import React from "react";
import CardBord from "../compements/CardBordGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import httpService from "../Service/httpService";
import { SSRProvider } from "react-bootstrap";
function Home(props) {
  // const cards = [
  //   {%D
  //     titel: "Køkken",
  //     katergori: "Køkken",
  //     besk: "Køkken",
  //     sti: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  //     antal: "1",
  //     enhed: "stk",
  //     pris: "100",
  //   },
  //   {
  //     titel: "Køkken",
  //     katergori: "Køkken",
  //     besk: "Køkken",
  //     sti: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  //     antal: "1",
  //     enhed: "stk",
  //     pris: "100",
  //   },
  // ];

  return (
    <div>
      <SSRProvider>
        <CardBord cards={props.cards} />
      </SSRProvider>
      <button onClick={revalidate}>Refresh</button>
    </div>
  );
}
const revalidate = async () => {
  const t = await fetch("/api/revalidate?secret=supersecret");
};
export async function getStaticProps() {
  console.log("getStaticProps");
  const result = await httpService.get("produkter/");
  console.log(result);
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

export default Home;
