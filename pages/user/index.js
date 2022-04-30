import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "../../Service/authService";
import toast from "../../compements/toast/toast";

useState;
const Login = () => {
  let [Account, setAccount] = useState({
    Email: "",
    password: "",
  });
  let handerSubmit = async (e) => {
    e.preventDefault();
    console.log(Account);
    // await axios
    //   .post("https://shop-pipline.herokuapp.com/api/login", Account)
    //   .then((res) => {
    //     console.log(res.data);
    //     localStorage.setItem("x-auth-token", JSON.stringify(res.data));
    //     Router.push("./home");
    //   });
    try {
      const acc = await login(Account.Email, Account.password);
      console.log("acc");
      console.log(acc);
      if (acc) {
        window.location.href = "/";
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.response.data);
      toast({ type: "error", message: "Wrong Email or Password" });
    }
  };

  let handlerChange = (e) => {
    setAccount({
      ...Account,
      [e.target.name]: e.target.value,
    });
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

export default Login;
