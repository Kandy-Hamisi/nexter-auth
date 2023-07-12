import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({ email });

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        // hash the password
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create a new user to the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "user created successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}