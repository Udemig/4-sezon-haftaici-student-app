import React from "react";

import { Link } from "react-router-dom";

import axios from "axios";

const ListStudents = ({ students, didUpdate,setDidUpdate }) => {
  const deleteStudent=(id)=>{
    if(window.confirm("Silmek İstediğinize emin misiniz?")===true){
      axios.delete(`http://localhost:3004/students/${id}`)
      .then(res=>{
        console.log(res);
        setDidUpdate(!didUpdate)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end">
        <Link className="btn btn-primary" to={"/add-student"}>
          Öğrenci Ekle
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Adı</th>
            <th scope="col">Soyadı</th>
            <th scope="col">Ögr No</th>
            <th scope="col">Sınıfı</th>
            <th scope="col">Okulu</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={6}>
                Kayıtlı Öğrenci Bulunmamaktadır
              </td>
            </tr>
          ) : (
            <>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.studentNumber}</td>
                  <td>{student.studentClass}</td>
                  <td>{student.schoolName}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example">
                      <button onClick={()=>deleteStudent(student.id)} type="button" className="btn btn-sm btn-outline-danger">
                        Sil
                      </button>
                      <Link to={`/edit-student/${student.id}`} className="btn btn-sm btn-outline-primary">
                        Güncelle
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudents;
