import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [willEditStudent, setWillEditStudent] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchoolName] = useState("");
  console.log(params);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/students/${params.studentId}`)
      .then((res) => {
        console.log(res.data);
        setWillEditStudent(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setStudentNumber(res.data.studentNumber);
        setStudentClass(res.data.studentClass);
        setSchoolName(res.data.schoolName);
      })
      .catch((err) => {});
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (
      firstName === "" ||
      lastName === "" ||
      studentNumber === "" ||
      studentClass === "" ||
      schoolName === ""
    ) {
      alert("Bütün alanlar zorunludur");
      return;
    }
    const editedStudent = {
      id: params.studentId,
      firstName: firstName,
      lastName: lastName,
      studentNumber: studentNumber,
      studentClass: studentClass,
      schoolName: schoolName,
    };
    axios
      .put(`http://localhost:3004/students/${params.studentId}`, editedStudent)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert("Güncelleme işlemi esnasında bir hata oluştu");
      });
  };
  if (willEditStudent === null) {
    return null;
  }
  return (
    <div>
      <Header page={"edit-student"} />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
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
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
