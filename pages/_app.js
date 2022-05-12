import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect } from "react";
import Menu from "../compements/Menu";
import { getCurrentUser } from "../Service/authService";
import { useState } from "react";
import { SSRProvider } from "react-bootstrap";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [User, setUser] = useState({});
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    setUser(getCurrentUser());
  }, []);
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
      <SSRProvider>
        <Menu user={User}>
          <Component {...pageProps} />
        </Menu>
      </SSRProvider>
    </Fragment>
  );
}
