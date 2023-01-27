import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import ListStudents from "../components/ListStudents";

import axios from "axios";

const Home = () => {
  const [students, setStudents] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  

  useEffect(() => {
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {});
  }, [didUpdate]);

  if (students === null) return null;

  return (
    <div>
      <Header />
      <ListStudents
        students={students}
        didUpdate={didUpdate}
        setDidUpdate={setDidUpdate}
      />
    </div>
  );
};

export default Home;
