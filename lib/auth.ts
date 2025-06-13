"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  passwordHash: z.string(),
})

export type User = z.infer<typeof userSchema>

// Mock user database - in a real app, this would be a database
const users: User[] = [
  {
    id: "user-1",
    email: "demo@vaultheir.com",
    firstName: "Vikram",
    lastName: "Sharma",
    passwordHash: "hashed_password_123", // In a real app, this would be properly hashed
  },
]

// Session management
export async function createSession(userId: string) {
  // In a real app, this would create a secure session with proper encryption
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  cookies().set("session", userId, { expires, httpOnly: true, secure: true })
}

export async function getSession() {
  const session = cookies().get("session")
  if (!session) return null
  return session.value
}

export async function getCurrentUser() {
  const userId = await getSession()
  if (!userId) return null
  return users.find((user) => user.id === userId) || null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

// Auth actions
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate inputs
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Find user (in a real app, this would query a database)
  const user = users.find((u) => u.email === email)
  if (!user) {
    return { error: "Invalid email or password" }
  }

  // In a real app, you would verify the password hash
  // For demo purposes, we'll just check if the user exists

  // Create session
  await createSession(user.id)
  return { success: true }
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  // Validate inputs
  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required" }
  }

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return { error: "Email already in use" }
  }

  // Create new user (in a real app, this would insert into a database)
  const newUser: User = {
    id: `user-${users.length + 1}`,
    email,
    firstName,
    lastName,
    passwordHash: password, // In a real app, this would be properly hashed
  }

  users.push(newUser)

  // Create session
  await createSession(newUser.id)
  return { success: true }
}

export async function logout() {
  cookies().delete("session")
  redirect("/login")
}
