import { connectDB } from "@/dbConfig/dbConfig";
import assignment from "@/model/AssignmentSchema";

import { NextResponse } from "next/server";

connectDB()

export async function POST(req) {
    try {
        const body = await req.json(); // Parse the JSON data from the request body
        // console.log(body)
        const { title, dueDate, className } = body;
        const newAssignment = new assignment({ title, dueDate, className })
        const savedAssigmnet = await newAssignment.save()

        return NextResponse.json({ message: "Created assigment successfully", sucess: true, savedAssigmnet })
    } catch (error) {
        // If an error occurs, respond with an error message
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}