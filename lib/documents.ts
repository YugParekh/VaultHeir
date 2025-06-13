"use server"

import { z } from "zod"

// Document schema
export const documentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: z.string(),
  category: z.string(),
  url: z.string(),
  size: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Document = z.infer<typeof documentSchema>

// Mock documents
const documents: Document[] = []

// Document functions
export async function uploadDocument(document: Omit<Document, "id" | "createdAt" | "updatedAt">) {
  // In a real app, this would upload the document to a storage service
  // For demo purposes, we'll just add it to our mock database

  const newDocument: Document = {
    ...document,
    id: `document-${documents.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  documents.push(newDocument)
  return newDocument
}

export async function getDocuments(userId: string) {
  return documents.filter((document) => document.userId === userId)
}

export async function getDocumentsByCategory(userId: string, category: string) {
  return documents.filter((document) => document.userId === userId && document.category === category)
}

export async function getDocument(id: string, userId: string) {
  return documents.find((document) => document.id === id && document.userId === userId) || null
}

export async function deleteDocument(id: string, userId: string) {
  const index = documents.findIndex((document) => document.id === id && document.userId === userId)
  if (index === -1) return false

  documents.splice(index, 1)
  return true
}
