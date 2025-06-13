"use server"

import { z } from "zod"

// Death verification request schema
export const verificationRequestSchema = z.object({
  id: z.string(),
  heirId: z.string(),
  userId: z.string(),
  type: z.enum(["death-certificate", "legal-executor", "multi-heir"]),
  status: z.enum(["pending", "approved", "rejected"]),
  documentUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type VerificationRequest = z.infer<typeof verificationRequestSchema>

// Mock verification requests
const verificationRequests: VerificationRequest[] = []

// Verification functions
export async function createVerificationRequest(
  request: Omit<VerificationRequest, "id" | "createdAt" | "updatedAt" | "status">,
) {
  const newRequest: VerificationRequest = {
    ...request,
    id: `request-${verificationRequests.length + 1}`,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  verificationRequests.push(newRequest)
  return newRequest
}

export async function getVerificationRequests(userId: string) {
  return verificationRequests.filter((request) => request.userId === userId)
}

export async function getVerificationRequestsByHeir(heirId: string) {
  return verificationRequests.filter((request) => request.heirId === heirId)
}

export async function updateVerificationRequest(id: string, data: Partial<VerificationRequest>) {
  const index = verificationRequests.findIndex((request) => request.id === id)
  if (index === -1) return null

  verificationRequests[index] = {
    ...verificationRequests[index],
    ...data,
    updatedAt: new Date(),
  }

  return verificationRequests[index]
}

// Death verification service
export async function verifyDeath(
  userId: string,
  verificationData: {
    deathCertificateUrl?: string
    legalExecutorId?: string
    confirmingHeirIds?: string[]
  },
) {
  // In a real app, this would implement a sophisticated verification process
  // For demo purposes, we'll just return a success response

  return {
    verified: true,
    verificationMethod: verificationData.deathCertificateUrl ? "death-certificate" : "multi-heir",
    timestamp: new Date(),
  }
}
