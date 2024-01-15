/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import "../styles/LogInSignUp.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!firstName || !email || !password || !lastName) {
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
    console.log(firstName, lastName, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/user",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        config,
      );
      console.log(data);
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
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/");
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
      console.log(error);
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
            <h2 className="fw-bold mb-5">Sign up now</h2>

            <MDBRow>
              <MDBCol col="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="First name"
                  id="form1"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </MDBCol>

              <MDBCol col="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last name"
                  id="form1"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </MDBCol>
            </MDBRow>

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
              sign up
            </MDBBtn>
            <Toaster />
            <div className="text-center">
              <a href="/">
                <p>Already have an account? Login</p>
              </a>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}

export default App;
