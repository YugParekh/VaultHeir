"use server"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "./auth"
import { uploadDocument, deleteDocument } from "./documents"

// Document actions
export async function uploadDocumentAction(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const name = formData.get("name") as string
    const type = formData.get("type") as string
    const category = formData.get("category") as string
    const file = formData.get("file") as File

    if (!name || !type || !category || !file) {
      return { error: "Missing required fields" }
    }

    // In a real app, this would upload the file to a storage service
    // For demo purposes, we'll just create a mock URL
    const url = `https://example.com/documents/${Date.now()}-${file.name}`

    await uploadDocument({
      userId: user.id,
      name,
      type,
      category,
      url,
      size: file.size,
    })

    revalidatePath("/will/documents")
    return { success: true }
  } catch (error) {
    console.error("Error uploading document:", error)
    return { error: "Failed to upload document" }
  }
}

export async function deleteDocumentAction(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const documentId = formData.get("documentId") as string

    if (!documentId) {
      return { error: "Document ID is required" }
    }

    await deleteDocument(documentId, user.id)

    revalidatePath("/will/documents")
    return { success: true }
  } catch (error) {
    console.error("Error deleting document:", error)
    return { error: "Failed to delete document" }
  }
}
