import React from "react";
import CardBord from "../compements/CardBordGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function Home(props) {
  const [cards, setCards] = React.useState([]);
  // const cards = [
  //   {
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
      <CardBord cards={props.cards} />
      <button onClick={refreshPage}>Refresh</button>
    </div>
  );
}
async function refreshPage() {
  const result = await axios.get(
    "https://shop-pipline.herokuapp.com/api/produkter"
  );
  const card = result.data;
  console.log("Reloaded" + card);
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
export async function getStaticProps() {
  const result = await axios.get(
    "https://shop-pipline.herokuapp.com/api/produkter"
  );
  const card = result.data;
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
