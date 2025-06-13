"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createHeir } from "@/lib/actions"

export default function NewHeirPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPrimary, setIsPrimary] = useState(false)

  // Check if primary parameter is set
  useEffect(() => {
    const primary = searchParams.get("primary")
    if (primary === "true") {
      setIsPrimary(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target as HTMLFormElement)
    formData.append("isPrimary", isPrimary.toString())

    const result = await createHeir(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    toast({
      title: "Heir Added",
      description: "Your heir has been added successfully.",
    })

    router.push("/heirs")
    router.refresh()
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>{isPrimary ? "Add Primary Heir" : "Add New Heir"}</CardTitle>
          <CardDescription>
            {isPrimary
              ? "Add someone who will have first access to your vault in case of your unavailability."
              : "Add someone who can access your vault in case of your unavailability."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Select name="relationship" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="lawyer">Lawyer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>

            <div className="space-y-2">
              <Label>Access Level</Label>
              <RadioGroup defaultValue="full" name="accessLevel">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full Access</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limited" id="limited" />
                  <Label htmlFor="limited">Limited Access</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Access Conditions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="death-certificate" name="death-certificate" defaultChecked />
                  <Label htmlFor="death-certificate">Death Certificate Verification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="legal-executor" name="legal-executor" />
                  <Label htmlFor="legal-executor">Legal Executor Verification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="multi-heir" name="multi-heir" />
                  <Label htmlFor="multi-heir">Multi-Heir Verification (2+ heirs must confirm)</Label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Heir"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
