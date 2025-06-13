"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Fingerprint, Key, Lock, Mail, Save, Shield, Smartphone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { updateProfile, updatePassword, updateSecuritySettings } from "@/lib/actions"

export default function SettingsPage({ user }: { user: any }) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [securitySettings, setSecuritySettings] = useState({
    smsAuth: true,
    emailAuth: false,
    biometricAuth: true,
  })

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const result = await updateProfile(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    }

    setIsSaving(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const result = await updatePassword(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      })(
        // Reset the form
        e.target as HTMLFormElement,
      ).reset()
    }

    setIsSaving(false)
  }

  const handleToggleSecurity = async (key: string, value: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))

    const formData = new FormData()
    formData.append(key, value.toString())

    const result = await updateSecuritySettings(formData)

    if (result.error) {
      // Revert the change if there was an error
      setSecuritySettings((prev) => ({ ...prev, [key]: !value }))

      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardShell user={user}>
      <DashboardHeader heading="Settings" text="Manage your account settings and security preferences" />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="access">
            <Key className="mr-2 h-4 w-4" />
            Legacy Access
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" defaultValue={user?.firstName || "Vikram"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" defaultValue={user?.lastName || "Sharma"} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email || "vikram.sharma@example.com"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" defaultValue="+91 98765 12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of birth</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue="1985-06-15" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>
                  This person will be contacted in case of emergency but won't have access to your vault
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact name</Label>
                  <Input id="emergencyName" name="emergencyName" defaultValue="Neha Patel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Relationship</Label>
                  <Input id="emergencyRelation" name="emergencyRelation" defaultValue="Sister" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone number</Label>
                  <Input id="emergencyPhone" name="emergencyPhone" type="tel" defaultValue="+91 87654 32109" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyEmail">Email</Label>
                  <Input id="emergencyEmail" name="emergencyEmail" type="email" defaultValue="neha.patel@example.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <form onSubmit={handleUpdatePassword}>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" name="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>Updating...</>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Update Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    <Label>SMS Authentication</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive a code via SMS when signing in</p>
                </div>
                <Switch
                  checked={securitySettings.smsAuth}
                  onCheckedChange={(checked) => handleToggleSecurity("smsAuth", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <Label>Email Authentication</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive a code via email when signing in</p>
                </div>
                <Switch
                  checked={securitySettings.emailAuth}
                  onCheckedChange={(checked) => handleToggleSecurity("emailAuth", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Fingerprint className="mr-2 h-4 w-4" />
                    <Label>Biometric Authentication</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Use fingerprint or face recognition to sign in</p>
                </div>
                <Switch
                  checked={securitySettings.biometricAuth}
                  onCheckedChange={(checked) => handleToggleSecurity("biometricAuth", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about security events like login attempts
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked id="security-email" />
                  <Label htmlFor="security-email" className="text-sm">
                    Email
                  </Label>
                  <Switch defaultChecked id="security-sms" />
                  <Label htmlFor="security-sms" className="text-sm">
                    SMS
                  </Label>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Heir Access Requests</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when an heir requests access to your vault
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked id="heir-email" />
                  <Label htmlFor="heir-email" className="text-sm">
                    Email
                  </Label>
                  <Switch defaultChecked id="heir-sms" />
                  <Label htmlFor="heir-sms" className="text-sm">
                    SMS
                  </Label>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Vault Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about changes to your vault</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked id="updates-email" />
                  <Label htmlFor="updates-email" className="text-sm">
                    Email
                  </Label>
                  <Switch id="updates-sms" />
                  <Label htmlFor="updates-sms" className="text-sm">
                    SMS
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setIsSaving(true)
                  setTimeout(() => {
                    setIsSaving(false)
                    toast({
                      title: "Preferences Saved",
                      description: "Your notification preferences have been updated.",
                    })
                  }, 1000)
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legacy Access Rules</CardTitle>
              <CardDescription>Configure how and when heirs can access your vault</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Access Trigger Method</Label>
                <Select defaultValue="manual">
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Verification</SelectItem>
                    <SelectItem value="automatic">Automatic (Death Certificate)</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Multiple Methods)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  How heirs will verify your unavailability to access your vault
                </p>
              </div>

              <div className="space-y-2">
                <Label>Access Delay Period</Label>
                <Select defaultValue="48">
                  <SelectTrigger>
                    <SelectValue placeholder="Select delay period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                    <SelectItem value="72">72 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">Time between verification and vault access</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Multi-Factor Authentication for Heirs</Label>
                  <p className="text-sm text-muted-foreground">Require heirs to use 2FA when accessing your vault</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notify Me of Access Attempts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone tries to access your vault</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setIsSaving(true)
                  setTimeout(() => {
                    setIsSaving(false)
                    toast({
                      title: "Rules Saved",
                      description: "Your legacy access rules have been updated.",
                    })
                  }, 1000)
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Rules
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
