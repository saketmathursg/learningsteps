import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth, db} from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";


export default function StudentAdd() {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [section, setSection] = useState("");
    const [maths, setMaths] = useState(false);
    const [physics, setPhysics] = useState(false);
    const [chemistry, setChemistry] = useState(false);
    const [biology, setBiology] = useState(false);
    const navigate = useNavigate();


  async function addStudent() {

    await addDoc(collection(db, "students"), {
      biology,name,
        school,
         section,
         maths,
         physics,
         chemistry,
         
    });
    navigate("/");

  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [ navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Learning Steps - Building Your Future</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Register</Nav.Link>
            <Nav.Link href="/add">Take Attendance</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Student</h1>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(text) => setName(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="school">
            <Form.Label>School</Form.Label>
            <Form.Control
              type="text"
              placeholder="School Name"
              value={school}
              onChange={(text) => setSchool(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="section">
            <Form.Label>Section</Form.Label>
            <Form.Control
              type="text"
              placeholder="Class and Section"
              value={section}
              onChange={(text) => setSection(text.target.value)}
            />
          </Form.Group>

          <Form.Check type="switch"
                id="maths-switch"
                label="Maths"
                onChange={(text) => setMaths(text.target.checked)}
                />
          <Form.Check type="switch"
                id="physics-switch"
                label="Physics"
                onChange={(text) => setPhysics(text.target.checked)}
                />
                <Form.Check type="switch"
                id="chemistry-switch"
                label="Chemistry"
                onChange={(text) => setChemistry(text.target.checked)}
                />
                <Form.Check type="switch"
                id="biology-switch"
                label="Biology"
                onChange={(text) => setBiology(text.target.checked)}
                />


          <Button variant="primary" onClick={async (e) => addStudent()}>
            Submit 
          </Button>
        </Form>
      </Container>
    </>
  );
}