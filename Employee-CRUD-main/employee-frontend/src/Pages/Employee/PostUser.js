import { Form } from "react-bootstrap";
import "./PostUser.css";
import Button from "react-bootstrap/Button"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",   
        lastName: "", 
        email: "",
        phone: "",
        department: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => { // Corrected typo
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

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
            console.log("Employee created ", data);
            navigate("/");
        }
        catch (e) {
            console.error("Error Creating Employee ",e.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Post New Employee</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName"> {/* Unique controlId */}
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName"> {/* Unique controlId */}
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail"> {/* Unique controlId */}
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone"> {/* Unique controlId */}
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter Phone No."
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDepartment"> {/* Unique controlId */}
                        <Form.Control
                            type="text"
                            name="department"
                            placeholder="Enter Department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Post Employee
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default PostUser;
