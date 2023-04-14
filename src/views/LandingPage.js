import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function LandingPage() {
  const [students, setStudents] = useState([]);

   async function getAllStudents() {
    const query = await getDocs(collection(db, "students"));
    const students = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setStudents (students);
  }

  useEffect(() => {
    getAllStudents();
  }, []);

  const StudentsRow = () => {
    return students.map((student, index) => <StudentSquare key={index} student={student} />);
  };

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Learning Steps - Building Your Future</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Register</Nav.Link>
            <Nav.Link href="/attendace">Take Attendance</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    

      <Container>
        <Row>
        <Table striped bordered hover>
      <thead>
        <tr>
        <th>Name</th>
        <th>School</th>
        <th>Class</th>
        </tr>
      </thead>
          <StudentsRow />
          </Table>
        </Row>
      </Container>
    </>
  );
}

function StudentSquare({ student }) {
  const { name, school, section, id } = student;
  return (
    <>
    
      <tbody>
      <tr>
      <Link
      to={`student/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}>
        <td>{name}</td>
        </Link>
        <td>{school}</td>
        <td>{section}</td>
        </tr>
        </tbody>
    </>
  );
}