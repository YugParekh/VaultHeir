"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createAsset } from "@/lib/actions"

export default function NewAssetPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("financial")
  const [assetType, setAssetType] = useState("bank")

  // Set the active tab based on the URL parameter
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      if (category === "document") {
        setActiveTab("document")
        setAssetType("insurance")
      } else if (category === "property") {
        setActiveTab("property")
        setAssetType("real-estate")
      } else if (category === "digital") {
        setActiveTab("digital")
        setAssetType("email")
      } else {
        setActiveTab("financial")
        setAssetType("bank")
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target as HTMLFormElement)
    formData.append("category", activeTab)

    const result = await createAsset(formData)

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
      title: "Asset Added",
      description: "Your asset has been added to your vault.",
    })

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Asset</CardTitle>
          <CardDescription>Add details about your asset. All information is encrypted and secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              if (value === "financial") setAssetType("bank")
              if (value === "property") setAssetType("real-estate")
              if (value === "document") setAssetType("insurance")
              if (value === "digital") setAssetType("email")
            }}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="financial" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type</Label>
                  <Select defaultValue={assetType} onValueChange={setAssetType} name="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Account</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="loan">Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Institution Name</Label>
                  <Input id="title" name="title" placeholder="e.g., HDFC Bank" required />
                </div>

                {assetType === "bank" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-1">Account Number</Label>
                      <Input id="detail-value-1" name="detail-value-1" placeholder="XXXX-XXXX-XXXX" required />
                      <input type="hidden" name="detail-label-1" value="Account Number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-2">Account Type</Label>
                      <Select defaultValue="savings" name="detail-value-2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Savings">Savings</SelectItem>
                          <SelectItem value="Current">Current</SelectItem>
                          <SelectItem value="Fixed Deposit">Fixed Deposit</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="detail-label-2" value="Account Type" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-3">Branch</Label>
                      <Input id="detail-value-3" name="detail-value-3" placeholder="e.g., Mumbai Main" required />
                      <input type="hidden" name="detail-label-3" value="Branch" />
                    </div>
                  </>
                )}

                {assetType === "investment" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-1">Investment Type</Label>
                      <Select defaultValue="Mutual Fund" name="detail-value-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                          <SelectItem value="Stocks">Stocks</SelectItem>
                          <SelectItem value="Bonds">Bonds</SelectItem>
                          <SelectItem value="PPF">PPF</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="detail-label-1" value="Investment Type" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-2">Folio/Account Number</Label>
                      <Input id="detail-value-2" name="detail-value-2" required />
                      <input type="hidden" name="detail-label-2" value="Folio Number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-3">Units/Quantity</Label>
                      <Input id="detail-value-3" name="detail-value-3" required />
                      <input type="hidden" name="detail-label-3" value="Units" />
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="property" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select defaultValue={assetType} onValueChange={setAssetType} name="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Property Name/Description</Label>
                  <Input id="title" name="title" placeholder="e.g., Residential Apartment" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detail-label-1">Location</Label>
                  <Input id="detail-value-1" name="detail-value-1" placeholder="e.g., Mumbai, Maharashtra" required />
                  <input type="hidden" name="detail-label-1" value="Location" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detail-label-2">Document Number</Label>
                  <Input id="detail-value-2" name="detail-value-2" placeholder="e.g., PROP-12345" required />
                  <input type="hidden" name="detail-label-2" value="Document No." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detail-label-3">Purchase Date</Label>
                  <Input id="detail-value-3" name="detail-value-3" type="date" required />
                  <input type="hidden" name="detail-label-3" value="Purchase Date" />
                </div>
              </TabsContent>

              <TabsContent value="document" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select defaultValue={assetType} onValueChange={setAssetType} name="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="insurance">Insurance Policy</SelectItem>
                      <SelectItem value="will">Will</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Document Name</Label>
                  <Input id="title" name="title" placeholder="e.g., Life Insurance" required />
                </div>

                {assetType === "insurance" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-1">Policy Number</Label>
                      <Input id="detail-value-1" name="detail-value-1" placeholder="e.g., LI-987654" required />
                      <input type="hidden" name="detail-label-1" value="Policy Number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-2">Provider/Issuer</Label>
                      <Input id="detail-value-2" name="detail-value-2" placeholder="e.g., LIC India" required />
                      <input type="hidden" name="detail-label-2" value="Provider" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-3">Expiry Date</Label>
                      <Input id="detail-value-3" name="detail-value-3" type="date" required />
                      <input type="hidden" name="detail-label-3" value="Expiry" />
                    </div>
                  </>
                )}

                {assetType === "will" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-1">Date Created</Label>
                      <Input id="detail-value-1" name="detail-value-1" type="date" required />
                      <input type="hidden" name="detail-label-1" value="Date Created" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-2">Last Updated</Label>
                      <Input id="detail-value-2" name="detail-value-2" type="date" required />
                      <input type="hidden" name="detail-label-2" value="Last Updated" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="detail-label-3">Notarized</Label>
                      <Select defaultValue="Yes" name="detail-value-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Is this document notarized?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="detail-label-3" value="Notarized" />
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="digital" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Digital Asset Type</Label>
                  <Select defaultValue={assetType} onValueChange={setAssetType} name="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select digital asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Account</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Service Name</Label>
                  <Input id="title" name="title" placeholder="e.g., Gmail" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detail-label-1">Username/Email</Label>
                  <Input id="detail-value-1" name="detail-value-1" placeholder="e.g., user@gmail.com" required />
                  <input type="hidden" name="detail-label-1" value="Username" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detail-label-2">Recovery Information</Label>
                  <Textarea
                    id="detail-value-2"
                    name="detail-value-2"
                    placeholder="Recovery email, phone number, or other recovery methods"
                    required
                  />
                  <input type="hidden" name="detail-label-2" value="Recovery Info" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detail-label-3">Notes</Label>
                  <Textarea
                    id="detail-value-3"
                    name="detail-value-3"
                    placeholder="Additional information about this digital asset"
                  />
                  <input type="hidden" name="detail-label-3" value="Notes" />
                </div>
              </TabsContent>

              <div className="mt-6 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Asset"}
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
