/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { getCurrentUser } from "../Service/authService";
import { useEffect, useState } from "react";
import { saveProd } from "../Service/prodService";
import toast from "./toast/toast";
import { revalidate } from "../Service/Reload";
import * as ReactBootStrap from "react-bootstrap";
import Router from "next/router";
const Prod = (props) => {
  const [image, setImage] = useState([]);
  const [validImage, setValidImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Prod, setProd] = useState({
    katergori: "grøntsager",
    titel: "",
    besk: "",
    sti: "",
    publicId: "",
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
  }, []);
  useEffect(() => {
    if (validImage) {
      async function updateData(key, value) {
        setProd({ ...Prod, [key]: value });

        console.log(imageUrl, "mat du er en dårlig programerer");
        console.log(value, "imageUrl");
      }
      updateData("sti", imageUrl.secure_url);
    }
  }, [imageUrl]);
  useEffect(() => {
    async function updateData() {
      if (imageUrl) {
        console.log(imageUrl.public_id, "jeg er prod");
        await saveProd(Prod, imageUrl.public_id);
        await revalidate().then(() => {
          setLoading(true);
        });
      }
    }
    updateData();
  }, [Prod.sti]);

  const handleSelect = async (e) => {
    console.log(e);
    setProd({ ...Prod, katergori: e });
    console.log(`jeg er nu ${Prod.katergori}`);
  };
  // const uploadToClient = async (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target.files[0];
  //     setValidImage(i);
  //     console.log(i);
  //     const t = i.name;
  //     const type = [];
  //     if (t !== undefined) {
  //       type = t.split(".");
  //     }
  //     console.log(i.size);
  //     if (
  //       type[1] === "jpg" ||
  //       type[1] === "png" ||
  //       (type[1] === "jpeg" && i.size < 1000000)
  //     ) {
  //       console.log("image uploaded");
  //       setImage(i);
  //       setCreateObjectURL(URL.createObjectURL(i));
  //     } else {
  //       toast({
  //         type: "error",
  //         title: "Fejl",
  //         message: "Kun JPG og jpeg og PNG filer og mindre end 1MB",
  //       });
  //     }
  //   }
  // };
  // const UploadToServer = async (event) => {
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "my-uploads");
  //   const data = await fetch(
  //     "https://api.cloudinary.com/v1_1/dhk7j9vy2/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   ).then((res) => res.json());
  //   console.log(data);
  //   console.log("Billede", data.secure_url);
  //   const t = data.secure_url;
  //   test = t;
  //   console.log(t, "test");
  // };
  async function uploadToServer(event) {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const t = i.name;
      const type = [];
      if (t !== undefined) {
        type = t.split(".");
      }
      console.log(i.size);
      console.log(type[1]);
      if (
        type[1] === "jpg" ||
        type[1] === "png" ||
        type[1] === "webp" ||
        (type[1] === "jpeg" && i.size < 4000000)
      ) {
        setValidImage(i);
        console.log(validImage, "validImage");
        toast({
          type: "success",
          title: " Billede uploadet",
          message: "Billede uploadet",
        });
        return;
      }
      toast({
        type: "error",
        title: "Fejl",
        message: "Kun JPG og jpeg og PNG filer og mindre end 4MB",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", validImage);
  }
  let th = async (value) => {
    const formData = new FormData();
    console.log("FormData");
    formData.append("file", value);
    console.log(value, "v123");
    console.log(formData, "formData");
    formData.append("upload_preset", "my-uploads");
    const data = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    console.log(data, "jeg er data");
    console.log("Billede", data.secure_url);
    const updateData = (value) => {
      setImageUrl(value);
      console.log(Prod, "imageUrl");
    };
    // const updateData2 = (value) => {
    //   setImage(value);
    //   console.log(Prod, "imageUrl");
    // };
    updateData(data);
    // updateData(data.secure_url);
    console.log(data.secure_url, "Prod.sti");
    console.log(Prod.sti, "test");
  };
  let handleSubmit = async (e) => {
    try {
      const User = getCurrentUser();
      e.preventDefault();
      if (!validImage) {
        toast({ type: "error", title: "Fejl", message: "Vælg et billede" });
        return;
      }
      // if (validImage !== image) {
      //   toast({
      //     type: "error",
      //     title: "Fejl",
      //     message: "Det er ikke samme billede",
      //   });
      //   return;
      // }
      if (Prod.titel === "" || Prod.besk === "" || validImage === null) {
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
          if (Prod.katergori.length >= 3 && Prod.titel.length >= 3) {
            setLoading(false);
            await th(validImage);
            console.log("success");
            console.log(imageUrl);

            console.log("saved");
            toast({ type: "success", message: "Produktet er oprettet" });
          } else {
            console.log("fejl");

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
    console.log(Prod);
  };
  return (
    <div className="container">
      <div className="border d-flex align-items-center justify-content-center mt-5 border-0">
        {loading ? null : <ReactBootStrap.Spinner animation="border" />}
      </div>
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
            onChange={uploadToServer}
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
