import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { getCurrentUser } from "../Service/authService";
import { useState } from "react";
import { saveProd } from "../Service/prodService";
import toast from "./toast/toast";
import Route from "next/router";
const User = getCurrentUser();
console.log(User);
const Prod = () => {
  const [Prod, setProd] = useState({
    katergori: "grøntsager",
    titel: "",
    besk: "",
    sti: "",
    enhed: "",
    antal: 0,
    pris: 0,
    seller: "",
  });
  const handleSelect = async (e) => {
    console.log(e);
    setProd({ ...Prod, katergori: e });
    console.log(`jeg er nu ${Prod.katergori}`);
  };
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(Prod);
      setProd({ ...Prod, seller: User._id });

      if (typeof window !== "undefined" && User.acces !== "client") {
        await saveProd(Prod);
        toast({ type: "success", message: "Produktet er oprettet" });
        revalidate();
        console.log("saved");
      }
    } catch (ex) {
      toast({ type: "error", message: "Produktet kunne ikke oprettes" });
      console.log(ex.response.data);
    }
  };
  const revalidate = async () => {
    const t = await fetch("/api/revalidate?secret=supersecret");
  };
  let handlerChange = (e) => {
    setProd({
      ...Prod,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mt-3" controlId="formBasicTitel">
          <Form.Label>titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your titel"
            name="titel"
            value={Prod.titel}
            onChange={handlerChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicKatergori">
          <Form.Label>katergori</Form.Label>
          <DropdownButton
            id="dropdown-basic-button"
            title={Prod.katergori}
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="grøntsager">grøntsager</Dropdown.Item>
            <Dropdown.Item eventKey="frugt">frugt</Dropdown.Item>
            <Dropdown.Item eventKey="etc">etc</Dropdown.Item>
          </DropdownButton>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBeskrivlse">
          <Form.Label>beskrivlse</Form.Label>
          <Form.Control
            type="text"
            placeholder="besk"
            name="besk"
            value={Prod.besk}
            onChange={handlerChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSti">
          <Form.Label>sti</Form.Label>
          <Form.Control
            type="text"
            placeholder="sti"
            name="sti"
            value={Prod.sti}
            onChange={handlerChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAntal">
          <Form.Label>antal</Form.Label>
          <Form.Control
            type="number"
            placeholder="antal"
            name="antal"
            value={Prod.antal}
            onChange={handlerChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEnhed">
          <Form.Label>enhed</Form.Label>
          <Form.Control
            type="text"
            placeholder="enhed"
            name="enhed"
            value={Prod.enhed}
            onChange={handlerChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPris">
          <Form.Label>pris</Form.Label>
          <Form.Control
            type="number"
            placeholder="pris"
            name="pris"
            value={Prod.pris}
            onChange={handlerChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Prod;
