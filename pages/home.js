import React from "react";
import CardBord from "../compements/CardBordGroup";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  const cards = [
    {
      titel: "Køkken",
      katergori: "Køkken",
      besk: "Køkken",
      sti: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      antal: "1",
      enhed: "stk",
      pris: "100",
    },
    {
      titel: "Køkken",
      katergori: "Køkken",
      besk: "Køkken",
      sti: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      antal: "1",
      enhed: "stk",
      pris: "100",
    },
  ];
  return <CardBord cards={cards} />;
};

export default Home;