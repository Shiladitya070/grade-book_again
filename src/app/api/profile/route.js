import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/UserSchema";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {

    const user = await currentUser()
    const { id, firstName, lastName } = user
    const { role } = await User.findOne({ userId: user.id })
    console.log(role)
    try {
        if (user) {
            return NextResponse.json({ id, name: firstName + " " + lastName, role }, { status: 200 })
        } else {
            return NextResponse.json({ error: "No user found" }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); // Parse the JSON data from the request body
        const { id, role } = body
        const newUser = new User({ userId: id, role: role })
        const savedUser = await newUser.save()
        // Respond with a success message
        return NextResponse.json({ message: "User role updated successfully", sucess: true, savedUser })
    } catch (error) {
        // If an error occurs, respond with an error message
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
