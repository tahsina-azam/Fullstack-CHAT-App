import "../styles/ChatBody.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup
} from "mdb-react-ui-kit";
import { useEffect,useState } from "react";
import axios from "axios";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8000")

export default function App() {
  const [firstName,setFirstName]=useState('')
  const [messages,setMessages]=useState([])
  const [users,setUsers]=useState([])
  const [email,setEmail]=useState('')
  const [newMessage,setNewMessage]=useState('');
  const [receiver,setReceiver]=useState('')
  const [messageReceived,setMessageReceived]=useState('');
  const [lastName,setLastName]=useState('')
  const [room,setRoom]=useState('5')


  const changeUser = (mail, id) => {
   setReceiver(email);
  }

  const sendMessage = () =>{
     var data = {
       sender:{
        _id:email
       },
       content: newMessage,
       chat:{
        users:[
          {_id:email},
          {_id:'tahsina.sheeva@gmail.com'}
        ]
       }

     }
    socket.emit("send_message", data);
    setMessages(prevDataArray=>{
      let p = [...prevDataArray, data]
      console.log('Message data', p)
      return p
    });
  };


  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join chat", room);
    }
  };

  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.content)
      setMessages(prevDataArray=>{
        let q = [...prevDataArray, data]
        console.log("recive",q)
        return q
      }
        );
    });
    return () => socket.off("receive_message")
  }, []);

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/chat/users")
    .then(response => {
      setUsers(response.data.data);
      console.log(response.data)
    })
    .catch((error) => {
       console.log(error)
    });
},[])
  useEffect(() => {
    console.log("component mounted")
    // Access the token from local storage on the client-side
    const token = localStorage.getItem('token');
    const tokenData = JSON.parse(token);
    console.log(tokenData.firstName)
    setFirstName(tokenData.firstName);
    setLastName(tokenData.lastName)
    setEmail(tokenData.email);   // You can now use the token as needed in your component
    //fetchUsers();
  }, []);
 
  
  return (
    <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "#CDC4F9", minHeight: "100vh" }}
    >
      <MDBRow>
        <MDBCol md="12">
          <div className="d-flex align-items-center justify-content-center">
            <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                    <div className="p-3">
                      
                    <MDBInputGroup className="rounded mb-3">
                      <input
                        className="form-control rounded"
                        placeholder="Search"
                        type="search"
                      />
                      <span
                        className="input-group-text border-0"
                        id="search-addon"
                      >
                        <MDBIcon fas icon="search" />
                      </span>
                    </MDBInputGroup>
                      <div
                        className="overflow-auto"
                        style={{  height: "600px" }}
                      >
                        <MDBTypography listUnStyled className="mb-0">
                          {users?.map((user)=>(
                            <li className="p-2 border-bottom">
                            <a
                              href="/chat"
                              onClick={joinRoom}
                              className="d-flex justify-content-between"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span className="badge bg-success badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">{user.firstName}&nbsp;{user.lastName}</p>
                                  <p className="small text-muted">
                                    Hello! Chat with me.
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Just now
                                </p>
                                <span className="badge bg-danger rounded-pill float-end">
                                  3
                                </span>
                              </div>
                            </a>
                          </li>
                          ))}
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6" lg="5" xl="4">
                   
                    <div
                      style={{ position: "relative", height: "600px", width:"300px" }}
                      className="pt-3 pe-3 overflow-auto"
                    >
                       {
                      messages?.map((msg)=>(
                        msg?.sender._id===email?(
                          <div key={Math.floor(Math.random()*16777215).toString(16)}>
                          <div className="d-flex flex-row justify-content-start">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                          <div>
                            <p
                              className="small p-2 ms-3 mb-1 rounded-3"
                              style={{ backgroundColor: "#f5f6f7" }}
                            >
                             {msg.content}
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                              12:00 PM | Aug 13
                            </p>
                          </div>
                        </div>

                        </div>
                       

                        ):(
                          <div key={Math.floor(Math.random()*16777215).toString(16)}>
                          <div className="d-flex flex-row justify-content-end">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                          <div>
                            <p
                              className="small p-2 ms-3 mb-1 rounded-3"
                              style={{ backgroundColor: "#ffffff" }}
                            >
                             {msg.content}
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                              12:00 PM | Aug 13
                            </p>
                          </div>
                        </div>

                        </div>
                        )
                        

                     
                      ))
                    };
                   
                 <div className="d-flex flex-row justify-content-end">
                          <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                             {messageReceived}
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted">
                              12:00 PM | Aug 13
                            </p>
                          </div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                        </div>
                      
                    </div>
                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 3"
                        style={{ width: "40px", height: "100%" }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="exampleFormControlInput2"
                        placeholder="Type message"
                        style={{width:"200px"}}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <a className="ms-1 text-muted" href="#!">
                        <MDBIcon fas icon="paperclip" />
                      </a>
                      <a className="ms-3 text-muted" href="#!">
                        <MDBIcon fas icon="smile" onClick={joinRoom} />
                      </a>
                      <a className="ms-3" href="#!">
                        <MDBIcon fas icon="paper-plane" onClick={sendMessage} />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
