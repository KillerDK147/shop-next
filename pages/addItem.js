import { Form, Button } from "react-bootstrap";
const additem = () => {
  const Items = () => {
    let [items, setItems] = useState({
      titel: "",
      katergori: "",
      besk: "",
      sti: "",
      antal: "",
      enhed: "",
      pris: "",
    });

    let handlerSubmit = (e) => {
      e.preventDefault();
      console.log;
    };

    return (
      <div className="container mt-5">
        <Form onSubmit={handerSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="Email"
              value={Account.email}
              onChange={handlerChange}
            />
            <Form.Text className="text-muted">
              Well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={Account.password}
              onChange={handlerChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  };
};

export default additem;
