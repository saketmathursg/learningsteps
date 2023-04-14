import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, Row, Table, Col } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth, db} from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, getDocs, collection } from "firebase/firestore";


export default function Attendance() {

    const [maths, setMaths] = useState(false);
    const [physics, setPhysics] = useState(false);
    const [chemistry, setChemistry] = useState(false);
    const [biology, setBiology] = useState(false);
    const [name, setName] = useState(");")
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [students, setStudents] = useState([]);
      
  async function markAttendance() {

    await addDoc(collection(db, "subjects"), {
      biology,name,maths,physics,chemistry,
         
    });
    navigate("/");

  };

  async function getAllStudents() {
    const query = await getDocs(collection(db, "students"));
    const students = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setStudents (students);
    console.log(students);
  }   
 
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getAllStudents();
  }, [navigate, user, loading]);


  const StudentsRow = () => {
    return students.map((student, index) => <StudentRow key={index} student={student} />);
  };



  function StudentRow({ student }) {
    const { name } = student;
    setName(name);
    return (
      <>
      <Form>
  
          <Row>
          <Col xs={3}> {name}</Col>
          
          <Col>
          <Form.Check type="switch"
                  id="maths-switch"
                  label="Maths"
                  checked={maths}
                  onChange={(text) => setMaths(text.target.checked)}
          />
          </Col>
          <Col>
          <Form.Check type="switch"
                  id="biology-switch"
                  label="Biology"
                  checked={biology}
                  onChange={(text) => setBiology(text.target.checked)}
          />
          </Col>
          <Col>
          <Form.Check type="switch"
                  id="chemistry-switch"
                  label="Chemistry"
                  checked={chemistry}
                  onChange={(text) => setChemistry(text.target.checked)}
          />
          </Col>
          <Col>
          <Form.Check type="switch"
                  id="physics-switch"
                  label="Physics"
                  checked={physics}
                  onChange={(text) => setPhysics(text.target.checked)}
          />
          </Col>
          <Col>
          <Button variant="primary" onClick={async (e) => markAttendance()}>
              Submit 
            </Button>
          
          </Col>

          </Row>
  
      </Form>
      
  
      </>
    );
  }




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
        <Row>
        <Table striped bordered hover>
      <thead>
        <tr>
        <th>Attendance</th>
        </tr>
      </thead>
          <StudentsRow />
          </Table>
        </Row>
      </Container>
    </>
  );
}

