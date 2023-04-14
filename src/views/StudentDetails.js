import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, ListGroupItem, Nav, Navbar, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";


export default function StudentDetails() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [section, setSection] = useState("");
  const [maths, setMaths] = useState("");
  const [physics, setPhysics] = useState("");
  const [chemistry, setChemistry] = useState("");
  const [biology, setBiology] = useState("");
  
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();


  
async function deleteStudent(id) {
  await deleteDoc(doc(db, "students", id));
  navigate("/");
}


  async function getStudent(id) {
    const studentDocument = await getDoc(doc(db, "students", id));
    const student = studentDocument.data();
    setName(student.name);
    setSchool(student.school); 
    setSection(student.section);
    setMaths(student.maths);
    setPhysics(student.physics);
    setChemistry(student.chemistry);
    setBiology(student.biology);

  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getStudent(id);
  }, [id, navigate, user, loading]);

  return (
    <>
       <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Learning Steps - Building Your Future</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Register</Nav.Link>
            <Nav.Link href="/attendace">Take Attendance</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     <Container>
        <Row style={{ marginTop: "1rem" }}>
          <Col md="2">
             
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Header>{name}</Card.Header>
                <Card.Text>{school},{section}</Card.Text>
                <ListGroup className="list-group-flush">
                <ListGroupItem></ListGroupItem>
                  <ListGroupItem>Maths - {maths.toString()} </ListGroupItem>
                  <ListGroupItem>Physics - {physics.toString()} </ListGroupItem>
                  <ListGroupItem>Chemistry - {chemistry.toString()} </ListGroupItem>
                  <ListGroupItem>Biology - {biology.toString()} </ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                </ListGroup>
                <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                <Card.Link
                  onClick={() => deleteStudent(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
