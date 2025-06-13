"use server"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "./auth"
import { addAsset, addHeir, deleteAsset, deleteHeir } from "./db"

// Asset actions
export async function createAsset(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const category = formData.get("category") as string
    const title = formData.get("title") as string
    const type = formData.get("type") as string

    // Build details array from form data
    const details = []
    const formEntries = Array.from(formData.entries())

    for (const [key, value] of formEntries) {
      if (key.startsWith("detail-label-")) {
        const index = key.replace("detail-label-", "")
        const valueKey = `detail-value-${index}`
        const valueData = formData.get(valueKey)

        if (value && valueData) {
          details.push({
            label: value.toString(),
            value: valueData.toString(),
          })
        }
      }
    }

    await addAsset({
      userId: user.id,
      title,
      type,
      category,
      details,
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error creating asset:", error)
    return { error: "Failed to create asset" }
  }
}

export async function removeAsset(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const assetId = formData.get("assetId") as string

    if (!assetId) {
      return { error: "Asset ID is required" }
    }

    await deleteAsset(assetId, user.id)

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error removing asset:", error)
    return { error: "Failed to remove asset" }
  }
}

// Heir actions
export async function createHeir(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const relationship = formData.get("relationship") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const accessLevel = formData.get("accessLevel") as "full" | "limited"
    const isPrimary = formData.get("isPrimary") === "true"

    // Get access conditions
    const accessConditions = []
    if (formData.get("death-certificate") === "on") accessConditions.push("death-certificate")
    if (formData.get("legal-executor") === "on") accessConditions.push("legal-executor")
    if (formData.get("multi-heir") === "on") accessConditions.push("multi-heir")

    await addHeir({
      userId: user.id,
      firstName,
      lastName,
      relationship,
      email,
      phone,
      accessLevel,
      isPrimary,
      isVerified: false, // New heirs start unverified
      accessConditions,
    })

    revalidatePath("/heirs")
    return { success: true }
  } catch (error) {
    console.error("Error creating heir:", error)
    return { error: "Failed to create heir" }
  }
}

export async function removeHeir(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const heirId = formData.get("heirId") as string

    if (!heirId) {
      return { error: "Heir ID is required" }
    }

    await deleteHeir(heirId, user.id)

    revalidatePath("/heirs")
    return { success: true }
  } catch (error) {
    console.error("Error removing heir:", error)
    return { error: "Failed to remove heir" }
  }
}

// Settings actions
export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // In a real app, this would update the user in the database
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: "Failed to update profile" }
  }
}

export async function updatePassword(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    // In a real app, this would verify the current password and update it
    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    return { error: "Failed to update password" }
  }
}

export async function updateSecuritySettings(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // In a real app, this would update security settings in the database
    return { success: true }
  } catch (error) {
    console.error("Error updating security settings:", error)
    return { error: "Failed to update security settings" }
  }
}
