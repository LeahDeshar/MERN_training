import { NextResponse } from "next/server";
import { connect } from "../../../../../lib/db";
import User from "../../../../../lib/modals/user";
import { URL } from "url";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    // get the data from the req body
    const { name, email, password } = await request.json();

    // if all field is filled
    if (!name || !email || !password) {
      return new NextResponse("Please fill all the fields", { status: 400 });
    }
    // create the user
    await connect();
    const user = new User({ name, email, password });
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {}
  return new NextResponse(`Error: ${error}`, { status: 500 });
};

export const PATCH = async (request: Request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const id = searchParams.get("id");

    // find the user by id
    const user = await User.findById(id);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    // get the data from the req body
    const { name, email, password } = await request.json();

    if (name !== undefined) {
      user.name = name;
    }
    if (email !== undefined) {
      user.email = email;
    }
    if (password !== undefined) {
      user.password = password;
    }
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

// DELETE
export const DELETE = async (request: Request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await User.findByIdAndDelete(id);

    return new NextResponse("User deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
