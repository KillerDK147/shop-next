import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import Router from "next/router";
import { useState } from "react";
import { getCurrentUser } from "../Service/authService";
import { saveProd } from "../Service/prodService";
const AddItem = () => {
  let [items, setItems] = useState({
    katergori: "",
    titel: "",
    besk: "",
    sti: "",
    antal: "",
    enhed: "",
    pris: "",
    seller: "",
  });
  const handleChange = (e) => {
    setItems({
      ...items,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = async (e) => {
    console.log(e);
    setItems({ ...items, katergori: e });
    console.log(`jeg er nu ${items.katergori}`);
  };
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("items");
      setItems({ ...items, seller: getCurrentUser()._id });
      await saveProd(items);
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mt-3" controlId="formBasicTitel">
          <Form.Label>titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your titel"
            name="titel"
            value={items.titel}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicKatergori">
          <Form.Label>katergori</Form.Label>
          <DropdownButton
            id="dropdown-basic-button"
            title={items.katergori}
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
            value={items.besk}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSti">
          <Form.Label>sti</Form.Label>
          <Form.Control
            type="text"
            placeholder="sti"
            name="sti"
            value={items.sti}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAntal">
          <Form.Label>antal</Form.Label>
          <Form.Control
            type="number"
            placeholder="antal"
            name="antal"
            value={items.antal}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEnhed">
          <Form.Label>enhed</Form.Label>
          <Form.Control
            type="text"
            placeholder="enhed"
            name="enhed"
            value={items.enhed}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPris">
          <Form.Label>pris</Form.Label>
          <Form.Control
            type="number"
            placeholder="pris"
            name="pris"
            value={items.pris}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;
