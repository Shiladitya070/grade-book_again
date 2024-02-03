'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        role: ''
    });

    useEffect(() => {
        // Fetch profile data from MongoDB
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile'); // API route to fetch profile data
                setProfile(response.data);
                setFormData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update profile data
        try {
            console.log(formData)
            await axios.post('/api/profile', formData); // API route to update profile data
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    };
    const roles = ['student', 'teacher', 'admin'];
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            {profile && (
                <form onSubmit={handleSubmit}>
                    <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <div className="mb-4">
                            <label className="font-bold">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold">ID:</label>
                            <input
                                type="text"
                                name="id"
                                disabled
                                value={formData.id}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold">Role:</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            >
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
