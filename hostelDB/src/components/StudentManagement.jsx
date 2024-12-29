import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    gender: '',
    contactInfo: '',
    course: '',
    year: '',
    studentId: '',
    emergencyContact: '',
    attendance: [],
  });

  useEffect(() => {
    // Fetch students from the backend
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/students', newStudent);
      setStudents([...students, response.data]);
      setNewStudent({
        name: '',
        age: '',
        gender: '',
        contactInfo: '',
        course: '',
        year: '',
        studentId: '',
        emergencyContact: '',
        attendance: [],
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Management</h1>
      
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Student</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={newStudent.age}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={newStudent.gender}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={newStudent.contactInfo}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={newStudent.course}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="year"
              value={newStudent.year}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={newStudent.studentId}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={newStudent.emergencyContact}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <button
          onClick={handleAddStudent}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Add Student
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Student List</h2>
        <ul className="list-disc list-inside mt-4">
          {students.map(student => (
            <li key={student._id} className="mt-2">
              {student.name} - {student.course} - {student.year} - {student.studentId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentManagement;
