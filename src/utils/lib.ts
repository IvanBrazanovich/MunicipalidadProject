import { SignJWT, jwtVerify } from "jose";
import Cookies from "universal-cookie";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
const cookies = new Cookies();
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      console.log("Token has expired");
      // Handle token expiration (e.g., prompt for re-authentication)
    } else {
      console.log("Token verification failed", error);
    }
    return null;
  }
  return;
}

export async function login({ email, password }) {
  // Verify credentials && get the user
  try {
    const response = await fetch(
      "http://localhost:5123/api/propietarios/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
        // Add other fields as needed (.g., email, etc.)
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Error de inicio de sesión");
    }

    const usuario = await response.json();
    console.log(usuario);

    // // Create the session
    const expires = new Date(Date.now() + 100 * 100000);
    const session = await encrypt({ usuario, expires });

    cookies.set("session", session, {
      path: "/",
      sameSite: "none", // SameSite attribute set to None
      secure: true, // Secure attribute required for SameSite=None
      expires: expires, // Setting the expiration time
    });

    return;
  } catch (error) {
    console.log(error.message || "Error de inicio de sesión");
  }

  // Save the session in a cookie
  // cookies().set("session", session, { expires, httpOnly: true });
}

export async function signUp({ email, password, nombreyApellido, tipo }) {
  // Verify credentials && get the user
  try {
    const response = await fetch("http://localhost:5123/api/propietarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
        ApeyNombre: nombreyApellido,
        Tipo: tipo,
      }),
      // Add other fields as needed (.g., email, etc.)
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    const data = await response.json();
    console.log("User added:", data);
    // Optionally, update state or notify the user
  } catch (error) {
    console.error("Error adding user:", error);
    // Handle error, e.g., show an error message
  }
}

export async function logout() {
  // Destroy the session
  cookies.set("session", "");

  return;
}

export async function getSession() {
  const session = cookies.get("session");
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession() {
  // const session = request.cookies.get("session")?.value;
  // if (!session) return;
  // // Refresh the session so it doesn't expire
  // const parsed = await decrypt(session);
  // parsed.expires = new Date(Date.now() + 10 * 1000);
  // return res;
}
