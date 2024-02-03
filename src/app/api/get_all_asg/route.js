import { connectDB } from "@/dbConfig/dbConfig";
import assignment from "@/model/AssignmentSchema";
import { NextResponse } from "next/server";

connectDB()
export async function POST(req) {
    try {
        const body = await req.json();
        const { classId } = body;
        const assigments = await assignment.find({ className: classId }) // Parse the JSON data from the request body
        console.log(assigments)
        if (!assigments) {
            return NextResponse.json({ message: "No assigment found", sucess: false }, { status: 404 })
        }
        return NextResponse.json({ message: "Created assigment successfully", sucess: true, assigments })
    } catch (error) {
        // If an error occurs, respond with an error message
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}