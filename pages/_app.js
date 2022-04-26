import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Menu from "../compements/Menu";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <Menu>
      <Component {...pageProps} />
    </Menu>
  );
}

export default MyApp;
