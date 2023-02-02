import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StudentDetail = () => {
  const params = useParams();
  const [student, setStudent] = useState(null);
  console.log(params);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/students/${params.studentId}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {});
  }, []);
  if (student === null) return null;
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Öğrenci Bilgileri</span>
            <Link to={"/"} className="badge bg-primary">
              Geri
            </Link>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Adı :</b> {student.firstName}
            </li>
            <li className="list-group-item">
              <b>Soyadı :</b> {student.lastName}
            </li>
            <li className="list-group-item">
              <b>Numarası :</b> {student.studentNumber}
            </li>
            <li className="list-group-item">
              <b>Sınıfı :</b> {student.studentClass}
            </li>
            <li className="list-group-item">
              <b>Okulu :</b> {student.schoolName}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
