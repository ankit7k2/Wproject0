import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleRoomClick = () => {
        navigate('/rooms');
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    const handleStudentManagementClick = () => {
        navigate('/student-management');
    };

    const handleStaffManagementClick = () => {
        navigate('/staff-management');
    };

    const handleAdminManagementClick = () => {
        navigate('/admin-management');
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-2xl font-bold">Explore the hostelDB...</h1>
                <div>
                    <button
                        className="mr-2 bg-white text-blue-600 px-4 py-2 rounded"
                        onClick={handleHomeClick}
                    >
                        Home
                    </button>
                    <button
                        className="mr-2 bg-white text-blue-600 px-4 py-2 rounded"
                        onClick={handleRoomClick}
                    >
                        Rooms
                    </button>
                    <button
                        className="mr-2 bg-white text-blue-600 px-4 py-2 rounded"
                        onClick={handleDashboardClick}
                    >
                        Dashboard
                    </button>


                    <button
                        className="bg-white text-blue-600 px-4 py-2 rounded"
                        onClick={handleAdminManagementClick}
                    >
                        Admin Management
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
