import Router from "next/router";

const logout = () => {
  if (typeof window !== "undefined") {
    const tokenKey = localStorage.getItem("x-auth-token");
    if (!tokenKey) {
      Router.push("/");
    }
  }
  return (
    <div className="container">
      <h1>Logout</h1>
      <button
        onClick={() => {
          localStorage.removeItem("x-auth-token");
          Router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default logout;
