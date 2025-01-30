import { useEffect, useState } from 'react';
import './UpdateUser.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const UpdateUser = () =>{

    const {id} = useParams();

    const [formData, setFormData] = useState({
        firstName: "",   
        lastName: "", 
        email: "",
        phone: "",
        department: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => { 
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(()=>{
        const fetchEmployee = async () =>{
            try{
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            }
            catch(e) {
                console.error("Error fetching user : ",e.message);
            }
        }
        fetchEmployee();
    },[id])

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch("http://localhost:8080/api/employee",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee updated ", data);
            navigate("/");
        }
        catch (e) {
            console.log("Error Updating Employee ",e.message);
        }
    }

    return (
        <>
        <div className="center-form">
            <h1>Edit Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName"> {/* Unique controlId */}
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formLastName"> {/* Unique controlId */}
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail"> {/* Unique controlId */}
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPhone"> {/* Unique controlId */}
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter Phone No."
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formDepartment"> {/* Unique controlId */}
                    <Form.Control
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Edit Employee
                </Button>
            </Form>
        </div>
    </>
    )
}

export default UpdateUser;
