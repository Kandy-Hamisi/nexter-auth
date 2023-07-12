import { NextRequest } from "next/server";
import { request } from "http";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.JWT_SEC!);

        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}