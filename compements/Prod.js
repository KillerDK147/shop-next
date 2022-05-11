import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { getCurrentUser } from "../Service/authService";
import { useEffect, useState } from "react";
import { saveProd } from "../Service/prodService";
import toast from "./toast/toast";
import { revalidate } from "../Service/Reload";
import Router from "next/router";
const Prod = (props) => {
  const [image, setImage] = useState(null);
  const [validImage, setValidImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
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
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setProd({ ...Prod, seller: user._id });
    } else {
      Router.push("/");
    }
  }, [Prod]);
  const handleSelect = async (e) => {
    console.log(e);
    setProd({ ...Prod, katergori: e });
    console.log(`jeg er nu ${Prod.katergori}`);
  };
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setValidImage(i);
      console.log(i);
      const t = i.name;
      const type = t.split(".");
      console.log(i.size);
      if (
        type[1] === "jpg" ||
        type[1] === "png" ||
        (type[1] === "jpeg" && i.size < 1000000)
      ) {
        console.log("image uploaded");
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
        setProd({ ...Prod, sti: i.name });
      } else {
        toast({
          type: "error",
          title: "Fejl",
          message: "Kun JPG og PNG filer",
        });
      }
    }
  };
  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  let handleSubmit = async (e) => {
    try {
      const User = getCurrentUser();
      e.preventDefault();
      if (!image) {
        toast({ type: "error", title: "Fejl", message: "Vælg et billede" });
        return;
      }
      if (validImage !== image) {
        toast({
          type: "error",
          title: "Fejl",
          message: "Det er ikke samme billede",
        });
        return;
      }
      if (Prod.titel === "" || Prod.besk === "" || image === null) {
        toast({ type: "error", title: "Fejl", message: "Udfyld alle felter" });
        console.log(User);
        return;
      }
      if (User.acces === "client") {
        toast({
          type: "error",
          title: "Fejl",
          message: "Du har ikke tilladelse",
        });
        return;
      } else {
        if (typeof window !== "undefined") {
          console.log(Prod);
          if (
            Prod.sti.length >= 5 &&
            Prod.katergori.length >= 3 &&
            Prod.titel.length >= 3
          ) {
            await saveProd(Prod);

            await uploadToServer();

            await revalidate();
            console.log("saved");
            toast({ type: "success", message: "Produktet er oprettet" });
          } else {
            console.log("fejl");
            if (Prod.sti.length < 5) {
              toast({
                type: "error",
                title: "Fejl",
                message: "sti skal være over 5",
              });
              console.log("sti");
            }
            if (Prod.katergori.length <= 3) {
              toast({
                type: "error",
                title: "Fejl",
                message: "kategori skal være over 3",
              });
            }
            if (Prod.titel.length <= 3) {
              toast({
                type: "error",
                title: "Fejl",
                message: "titel skal være over 3",
              });
              console.log("titel");
            }
          }
        }
      }
    } catch (ex) {
      toast({ type: "error", message: "Produktet kunne ikke oprettes" });
      console.log(ex.response);
    }
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
            type="file"
            placeholder="sti"
            title={image}
            onChange={uploadToClient}
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
