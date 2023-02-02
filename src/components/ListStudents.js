import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

const ListStudents = ({ students, didUpdate, setDidUpdate }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedSort,setSelectedSort]=useState("isimArtan")
  const deleteStudent = (id) => {
    if (window.confirm("Silmek İstediğinize emin misiniz?") === true) {
      axios
        .delete(`http://localhost:3004/students/${id}`)
        .then((res) => {
          console.log(res);
          setDidUpdate(!didUpdate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    console.log("searchText değişti");
    var tempArray = students.filter(
      (item) =>
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ===
          true ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase()) === true
    );
    /* isme göre artan */
    if(selectedSort === "isimArtan"){
      tempArray=tempArray.sort((a,b) => a.firstName.localeCompare(b.firstName))
    }
    /* isme göre azalan */
    if(selectedSort === "isimAzalan"){
      tempArray=tempArray.sort((a,b) => b.firstName.localeCompare(a.firstName))
    }
    if(selectedSort === "soyisimAzalan"){
      tempArray=tempArray.sort((a,b) => b.lastName.localeCompare(a.lastName))
    }

    setFilteredStudents(tempArray);
    if (tempArray.length > 0) setIsEmpty(false);
    else setIsEmpty(true);
  }, [searchText,selectedSort]);
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <input
          className="form-control"
          type="text"
          placeholder="Aramak istediğiniz öğrenci bilgisini girin..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Link className="btn btn-primary w-50" to={"/add-student"}>
          Öğrenci Ekle
        </Link>
      </div>
      <div onChange={(event)=> setSelectedSort(event.target.value)}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="artan"
            value={"isimArtan"}
            defaultChecked
          />
          <label className="form-check-label" htmlFor="artan">
            İsme göre artan
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="soyisimAzalan"
            value={"isimAzalan"}
          />
          <label className="form-check-label" htmlFor="soyisimAzalan">
            İsme göre azalan
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="azalan"
            value={"soyisimAzalan"}
          />
          <label className="form-check-label" htmlFor="azalan">
            Soyisme göre azalan
          </label>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Adı</th>
            <th scope="col">Soyadı</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td className="text-center" colSpan={6}>
                Kayıtlı öğrenci bulunmamaktadır
              </td>
            </tr>
          )}
          {isEmpty === true && (
            <tr>
              <td className="text-center" colSpan={6}>
                Aradığınız kriterde öğrenci bulunmamaktadır
              </td>
            </tr>
          )}
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <th scope="row">{index + 1}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example">
                  <button
                    onClick={() => deleteStudent(student.id)}
                    type="button"
                    className="btn btn-sm btn-outline-danger">
                    Sil
                  </button>
                  <Link
                    to={`/edit-student/${student.id}`}
                    className="btn btn-sm btn-outline-primary">
                    Güncelle
                  </Link>
                  <Link
                    to={`/student-detail/${student.id}`}
                    className="btn btn-sm btn-outline-secondary">
                    Detay
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudents;
