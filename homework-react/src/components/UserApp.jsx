import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const userPromiseObj = async function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const res = await axios.get(url);
  const data = res.data;

  return data;
}

export default function UserApp() {
  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    userPromiseObj().then((data) => {
      setUserData(data);
    })
  }, []);
  console.log(userData)

  return (
    <div>
      <h1>Users</h1>

      <ListGroup>
        {userData.map((user) => (
          <ListGroup.Item key={user.id}>{`${user.id}. ${user.username} - ${user.email}`}</ListGroup.Item>
        ))}
      </ListGroup>

    </div>
  );
}