import React from "react";
import "../styles/LogInSignUp.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!email || !password) {
      toast("Check if all the fields are filled up correctly.", {
        duration: 4000,
        position: "top-center",

        icon: "❌",

        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        { email: email, password: password },
        config,
      );
      toast("Successfully Account Creation", {
        duration: 4000,
        position: "top-center",

        icon: "👏",

        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/chat");
    } catch (error) {
      toast("Error Occured", {
        duration: 4000,
        position: "top-center",

        icon: "❌",

        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
        }}
      ></div>

      <div className="d-flex justify-content-center">
        <MDBCard
          className="mx-5 mb-5 p-5 shadow-5"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
            maxWidth: "1000px",
          }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Sign in now</h2>

            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn className="w-100 mb-4" size="md" onClick={submitHandler}>
              sign in
            </MDBBtn>
            <Toaster />

            <div className="text-center">
              <a href="/signup">
                {" "}
                <p>Don't have an account? Sign Up</p>{" "}
              </a>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}

export default App;
