"use server"

import { z } from "zod"

// Asset schema
export const assetSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  type: z.string(),
  category: z.string(),
  details: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Asset = z.infer<typeof assetSchema>

// Heir schema
export const heirSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  relationship: z.string(),
  email: z.string().email(),
  phone: z.string(),
  accessLevel: z.enum(["full", "limited"]),
  isPrimary: z.boolean(),
  isVerified: z.boolean(),
  accessConditions: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Heir = z.infer<typeof heirSchema>

// Mock database - in a real app, this would be a database
const assets: Asset[] = [
  {
    id: "asset-1",
    userId: "user-1",
    title: "HDFC Bank",
    type: "Bank Account",
    category: "financial",
    details: [
      { label: "Account Type", value: "Savings" },
      { label: "Account Number", value: "XXXX-XXXX-1234" },
      { label: "Branch", value: "Mumbai Main" },
    ],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "asset-2",
    userId: "user-1",
    title: "ICICI Bank",
    type: "Bank Account",
    category: "financial",
    details: [
      { label: "Account Type", value: "Current" },
      { label: "Account Number", value: "XXXX-XXXX-5678" },
      { label: "Branch", value: "Delhi Central" },
    ],
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "asset-3",
    userId: "user-1",
    title: "SBI Mutual Fund",
    type: "Investment",
    category: "financial",
    details: [
      { label: "Folio Number", value: "12345678" },
      { label: "Scheme", value: "Equity Fund" },
      { label: "Units", value: "500" },
    ],
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05"),
  },
  {
    id: "asset-4",
    userId: "user-1",
    title: "Residential Apartment",
    type: "Real Estate",
    category: "property",
    details: [
      { label: "Location", value: "Mumbai, Maharashtra" },
      { label: "Document No.", value: "PROP-12345" },
      { label: "Purchase Date", value: "15 Jan 2018" },
    ],
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-04-20"),
  },
  {
    id: "asset-5",
    userId: "user-1",
    title: "Commercial Space",
    type: "Real Estate",
    category: "property",
    details: [
      { label: "Location", value: "Bangalore, Karnataka" },
      { label: "Document No.", value: "PROP-67890" },
      { label: "Purchase Date", value: "22 Mar 2020" },
    ],
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12"),
  },
  {
    id: "asset-6",
    userId: "user-1",
    title: "Will",
    type: "Legal Document",
    category: "document",
    details: [
      { label: "Date Created", value: "10 Jun 2022" },
      { label: "Last Updated", value: "15 Dec 2024" },
      { label: "Notarized", value: "Yes" },
    ],
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-10"),
  },
  {
    id: "asset-7",
    userId: "user-1",
    title: "Life Insurance",
    type: "Insurance",
    category: "document",
    details: [
      { label: "Policy Number", value: "LI-987654" },
      { label: "Provider", value: "LIC India" },
      { label: "Expiry", value: "22 Jul 2045" },
    ],
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
  },
  {
    id: "asset-8",
    userId: "user-1",
    title: "Email Account",
    type: "Digital Asset",
    category: "digital",
    details: [
      { label: "Provider", value: "Gmail" },
      { label: "Username", value: "user@gmail.com" },
      { label: "Recovery Info", value: "Added" },
    ],
    createdAt: new Date("2023-08-15"),
    updatedAt: new Date("2023-08-15"),
  },
]

const heirs: Heir[] = [
  {
    id: "heir-1",
    userId: "user-1",
    firstName: "Ananya",
    lastName: "Rao",
    relationship: "spouse",
    email: "ananya.rao@example.com",
    phone: "+91 98765 43210",
    accessLevel: "full",
    isPrimary: true,
    isVerified: true,
    accessConditions: ["death-certificate"],
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    id: "heir-2",
    userId: "user-1",
    firstName: "Rahul",
    lastName: "Kumar",
    relationship: "brother",
    email: "rahul.kumar@example.com",
    phone: "+91 87654 32109",
    accessLevel: "limited",
    isPrimary: false,
    isVerified: true,
    accessConditions: ["death-certificate", "legal-executor"],
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    id: "heir-3",
    userId: "user-1",
    firstName: "Priya",
    lastName: "Singh",
    relationship: "daughter",
    email: "priya.singh@example.com",
    phone: "+91 76543 21098",
    accessLevel: "full",
    isPrimary: false,
    isVerified: false,
    accessConditions: ["death-certificate", "multi-heir"],
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20"),
  },
]

// Asset functions
export async function getAssets(userId: string) {
  return assets.filter((asset) => asset.userId === userId)
}

export async function getAssetsByCategory(userId: string, category: string) {
  return assets.filter((asset) => asset.userId === userId && asset.category === category)
}

export async function getAsset(id: string, userId: string) {
  return assets.find((asset) => asset.id === id && asset.userId === userId) || null
}

export async function addAsset(asset: Omit<Asset, "id" | "createdAt" | "updatedAt">) {
  const newAsset: Asset = {
    ...asset,
    id: `asset-${assets.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  assets.push(newAsset)
  return newAsset
}

export async function updateAsset(id: string, userId: string, data: Partial<Asset>) {
  const index = assets.findIndex((asset) => asset.id === id && asset.userId === userId)
  if (index === -1) return null

  assets[index] = {
    ...assets[index],
    ...data,
    updatedAt: new Date(),
  }

  return assets[index]
}

export async function deleteAsset(id: string, userId: string) {
  const index = assets.findIndex((asset) => asset.id === id && asset.userId === userId)
  if (index === -1) return false

  assets.splice(index, 1)
  return true
}

// Heir functions
export async function getHeirs(userId: string) {
  return heirs.filter((heir) => heir.userId === userId)
}

export async function getPrimaryHeir(userId: string) {
  return heirs.find((heir) => heir.userId === userId && heir.isPrimary) || null
}

export async function getSecondaryHeirs(userId: string) {
  return heirs.filter((heir) => heir.userId === userId && !heir.isPrimary)
}

export async function getHeir(id: string, userId: string) {
  return heirs.find((heir) => heir.id === id && heir.userId === userId) || null
}

export async function addHeir(heir: Omit<Heir, "id" | "createdAt" | "updatedAt">) {
  // If this is a primary heir, update any existing primary heir
  if (heir.isPrimary) {
    const existingPrimaryIndex = heirs.findIndex((h) => h.userId === heir.userId && h.isPrimary)
    if (existingPrimaryIndex !== -1) {
      heirs[existingPrimaryIndex].isPrimary = false
    }
  }

  const newHeir: Heir = {
    ...heir,
    id: `heir-${heirs.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  heirs.push(newHeir)
  return newHeir
}

export async function updateHeir(id: string, userId: string, data: Partial<Heir>) {
  const index = heirs.findIndex((heir) => heir.id === id && heir.userId === userId)
  if (index === -1) return null

  // If updating to primary, update any existing primary heir
  if (data.isPrimary) {
    const existingPrimaryIndex = heirs.findIndex((h) => h.userId === userId && h.isPrimary && h.id !== id)
    if (existingPrimaryIndex !== -1) {
      heirs[existingPrimaryIndex].isPrimary = false
    }
  }

  heirs[index] = {
    ...heirs[index],
    ...data,
    updatedAt: new Date(),
  }

  return heirs[index]
}

export async function deleteHeir(id: string, userId: string) {
  const index = heirs.findIndex((heir) => heir.id === id && heir.userId === userId)
  if (index === -1) return false

  heirs.splice(index, 1)
  return true
}

// Dashboard stats
export async function getDashboardStats(userId: string) {
  const userAssets = await getAssets(userId)
  const userHeirs = await getHeirs(userId)

  // Calculate vault completion percentage
  // This is a simplified calculation - in a real app, this would be more sophisticated
  const totalPossibleAssets = 12 // Arbitrary number for demo
  const completionPercentage = Math.min(Math.round((userAssets.length / totalPossibleAssets) * 100), 100)

  return {
    totalAssets: userAssets.length,
    vaultCompletion: completionPercentage,
    nominatedHeirs: userHeirs.length,
    securityStatus: "Secure", // In a real app, this would be calculated based on security settings
  }
}
