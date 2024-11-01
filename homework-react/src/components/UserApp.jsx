import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Todos from "./Todos"
import Posts from "./Posts"

const getUsersData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const res = await axios.get(url);
  const data = res.data;

  return data;
}

export default function UserApp() {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };
  
  useEffect(() => {
    getUsersData().then((data) => {
      setUserData(data);
    })
  }, []);
  
  return (
    <div>
      <h1>Users</h1>

      <ListGroup>
        {userData.map((user) => (
          <ListGroup.Item key={user.id} onClick={()=>handleShow(user.id)}>{`${user.id}. ${user.name} - ${user.email}`}</ListGroup.Item>
        ))}
      </ListGroup>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{userData[userId-1] ? userData[userId-1].name : "User Not Found"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Posts userId={userId} />
          <Todos userId={userId} />
        </Modal.Body>
      </Modal>

    </div>
  );
}