import React, { useState,useEffect } from "react";
import Header from "../components/Header";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [students,setStudents]=useState(null)
  const saveStudent = (event) => {
    event.preventDefault();
    /* validation */
    if (
      firstName === "" ||
      lastName === "" ||
      studentNumber === "" ||
      studentClass === "" ||
      schoolName === ""
    ) {
      alert("Bütün alanlar zorunludur.");
      return;
    }
    const hasStudent=students.find(item=>item.studentNumber === studentNumber)
    if(hasStudent !== undefined){
        alert(`${studentNumber} numarası zaten bir öğrenciye atanmıştır`)
        return
    }
    const newStudent = {
      id: String(new Date().getTime()),
      firstName: firstName,
      lastName: lastName,
      studentClass: studentClass,
      studentNumber: studentNumber,
      schoolName: schoolName,
    };
    axios
      .post("http://localhost:3004/students", newStudent)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };
  useEffect(()=>{
    axios.get("http://localhost:3004/students")
    .then(res=>{
        setStudents(res.data)
    })
    .catch(err=>{

    })
  },[])
  if(students === null){
    return null
  }
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={saveStudent}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Öğrenci Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Alex"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Öğrenci Soyadı
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="John"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentNumber" className="form-label">
              Öğrenci Numarası
            </label>
            <input
              type="number"
              className="form-control"
              id="studentNumber"
              placeholder="100"
              value={studentNumber}
              onChange={(event) => setStudentNumber(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentClass" className="form-label">
              Sınıfı
            </label>
            <input
              type="text"
              className="form-control"
              id="studentClass"
              placeholder="3/C"
              value={studentClass}
              onChange={(event) => setStudentClass(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="schoolName" className="form-label">
              Okulu
            </label>
            <input
              type="text"
              className="form-control"
              id="schoolName"
              placeholder="Cumhuriyet İ.Ö.O."
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
