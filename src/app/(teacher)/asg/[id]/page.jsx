'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DynamicForm = () => {
    const { id } = useParams();
    const [asg, setAsg] = useState({});
    const [formData, setFormData] = useState([
        { question: '', answer: '' }
    ]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...formData];
        list[index][name] = value;
        setFormData(list);
    };

    const handleAddFields = () => {
        setFormData([...formData, { question: '', answer: '' }]);
    };

    const handleRemoveFields = index => {
        const list = [...formData];
        list.splice(index, 1);
        setFormData(list);
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Form Data", formData);
        const res = axios.post(`/api/updateAsg`, { id, formData });
        // setFormData([{ question: '', answer: '' }]);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post(`/api/getOneAsg`, { id });
            const assigments = res.data.assigments;
            const { titte, dueDate, questions, className } = assigments
            console.log(assigments)
            if (questions.length !== 0) {
                setFormData(questions)
            }
            setAsg({ titte, dueDate, className })

        }
        fetchData();

    }, [])

    console.log(formData)


    return (
        <div className="container mx-auto">
            <h3 className="text-xl font-bold mb-2">Title</h3>
            <input
                type="text"
                placeholder="Enter title"
                value={asg.titte}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <h3 className="text-xl font-bold my-2">Due Date: {asg.dueDate}</h3>
            <input
                type="date"
                value={asg.dueDate}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <h3 className="text-xl font-bold my-2">{asg.className}</h3>
            <input
                type="text"
                placeholder="Enter class"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <form onSubmit={handleSubmit} className="space-y-4 px-4 mt-4">
                {formData.map((field, index) => (
                    <div key={index} className="flex items-start space-x-2">
                        <div className="w-1/12 flex-shrink-0 flex items-center justify-center text-gray-700 font-bold">{index + 1}.</div>
                        <div className="w-11/12">
                            <input
                                type="text"
                                name="question"
                                placeholder="Enter question"
                                value={field.question}
                                onChange={e => handleInputChange(index, e)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <textarea
                                name="answer"
                                placeholder="Enter answer"
                                value={field.answer}
                                onChange={e => handleInputChange(index, e)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveFields(index)}
                            className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <div className='flex gap-3 '>

                    <button
                        type="button"
                        onClick={() => handleAddFields()}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Add
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default DynamicForm;
