import { useEffect, useState } from "react";
import  Container from "react-bootstrap/Container";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import  Table from "react-bootstrap/Table";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect( ()=>{
        const fetchEmployees = async() => {
            try{
                const response = await fetch("http://localhost:8080/api/employees")
                const data = await response.json();
                console.log(data);
                setEmployees(data);
            }
            catch(e){
                console.log("Error in Fetching Employes ", e.message);
            }
        }
        fetchEmployees();
    },[]);

    const handleDelete = async (employeeId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`,{
                method: "DELETE",
            })
            if(response.ok){
                setEmployees((prevEmployees)=>
                    prevEmployees.filter((employee)=>employee.id!==employeeId)
                )
            }
            console.log(`Employee with ID ${employeeId} deleted Successfully`);
        }
        catch (e){
            console.log("Error in Deleting Employe ", e.message);
        }
    }

    const handleUpdate = (employeeId) =>{
        navigate(`/employee/${employeeId}`);
    }

    const [search, setSearch] = useState("");
    console.log(search);

    return (
        <>
            <Container className="mt-5">
                <Form>
                    <InputGroup className="my-3">
                        <Form.Control placeholder="Search Employees with First Name" onChange={(e)=>setSearch(e.target.value)}/>
                    </InputGroup>
                </Form>
                <Row>
                    <Col>
                        <h1 className="text-center">Employees</h1>
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>First Nmae</th>
                                    <th>Last Nmae</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.filter((item)=>{
                                    return search.toLowerCase() === ''?item:item.firstName.toLowerCase().includes(search)
                                }).map(emp=>(
                                    <tr key={emp.id}>
                                        <td> {emp.firstName}</td>
                                        <td> {emp.lastName}</td>
                                        <td> {emp.email}</td>
                                        <td> {emp.phone}</td>
                                        <td> {emp.department}</td>
                                        <td>
                                            <Button variant="outline-secondary"  onClick={()=>{handleUpdate(emp.id)}}>Update</Button>{" "}
                                            <Button variant="outline-danger" onClick={()=>{handleDelete(emp.id)}}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;