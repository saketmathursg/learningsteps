import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";



export default function StudentUpdate() {
  const params = useParams();
  const id = params.id;
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [section, setSection] = useState("");
  const [maths, setMaths] = useState(false);
  const [physics, setPhysics] = useState(false);
  const [chemistry, setChemistry] = useState(false);
  const [biology, setBiology] = useState(false);

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function updateStudent() {
    await updateDoc(doc(db, "students", id), {       
        biology,name,school,section,maths,physics,chemistry,
    });
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
    <div>
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
        <h1 style={{ marginBlock: "1rem" }}>Update Student</h1> 
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
                checked={maths}
                onChange={(text) => setMaths(text.target.checked)}
                />
          <Form.Check type="switch"
                id="physics-switch"
                label="Physics"
                checked={physics}
                onChange={(text) => setPhysics(text.target.checked)}
                />
                <Form.Check type="switch"
                id="chemistry-switch"
                label="Chemistry"
                checked={chemistry}
                onChange={(text) => setChemistry(text.target.checked)}
                />
                <Form.Check type="switch"
                id="biology-switch"
                checked={biology}
                label="Biology"
                onChange={(text) => setBiology(text.target.checked)}
                />


          <Button variant="primary" onClick={(e) => updateStudent()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}