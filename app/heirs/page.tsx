import { AlertCircle, Check, Clock, Edit, Mail, Phone, Plus, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { requireAuth } from "@/lib/auth"
import { getPrimaryHeir, getSecondaryHeirs } from "@/lib/db"
import { DeleteHeirButton } from "@/components/delete-heir-button"

export default async function HeirsPage() {
  const user = await requireAuth()

  // Get heirs
  const primaryHeir = await getPrimaryHeir(user.id)
  const secondaryHeirs = await getSecondaryHeirs(user.id)

  return (
    <DashboardShell user={user}>
      <DashboardHeader heading="Legacy Access" text="Manage who can access your vault and under what conditions">
        <Button asChild>
          <a href="/heirs/new">
            <Plus className="mr-2 h-4 w-4" /> Add Heir
          </a>
        </Button>
      </DashboardHeader>

      <div className="grid gap-6">
        {primaryHeir ? (
          <Card>
            <CardHeader>
              <CardTitle>Primary Heir</CardTitle>
              <CardDescription>
                This person will have first access to your vault in case of your unavailability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>{`${primaryHeir.firstName.charAt(0)}${primaryHeir.lastName.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{`${primaryHeir.firstName} ${primaryHeir.lastName}`}</p>
                    <p className="text-sm text-muted-foreground">{primaryHeir.relationship}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">
                        {primaryHeir.isVerified ? (
                          <>
                            <Check className="mr-1 h-3 w-3" /> Verified
                          </>
                        ) : (
                          <>
                            <AlertCircle className="mr-1 h-3 w-3" /> Pending Verification
                          </>
                        )}
                      </Badge>
                      <Badge variant="secondary">
                        <Shield className="mr-1 h-3 w-3" />{" "}
                        {primaryHeir.accessLevel === "full" ? "Full Access" : "Limited Access"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={`/heirs/edit/${primaryHeir.id}`}>
                      <Edit className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{primaryHeir.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{primaryHeir.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Access delay: 48 hours after verification</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Primary Heir</CardTitle>
              <CardDescription>You haven't designated a primary heir yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <p className="text-muted-foreground mb-4">
                  The primary heir will have first access to your vault in case of your unavailability
                </p>
                <Button asChild>
                  <a href="/heirs/new?primary=true">
                    <Plus className="mr-2 h-4 w-4" /> Add Primary Heir
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Secondary Heirs</CardTitle>
            <CardDescription>
              These people will have access to your vault based on your specified conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {secondaryHeirs.length > 0 ? (
              secondaryHeirs.map((heir) => (
                <div key={heir.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>{`${heir.firstName.charAt(0)}${heir.lastName.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{`${heir.firstName} ${heir.lastName}`}</p>
                      <p className="text-sm text-muted-foreground">{heir.relationship}</p>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant="outline"
                          className={`mr-2 ${heir.isVerified ? "" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}
                        >
                          {heir.isVerified ? (
                            <>
                              <Check className="mr-1 h-3 w-3" /> Verified
                            </>
                          ) : (
                            <>
                              <AlertCircle className="mr-1 h-3 w-3" /> Pending Verification
                            </>
                          )}
                        </Badge>
                        <Badge variant="secondary">
                          <Shield className="mr-1 h-3 w-3" />{" "}
                          {heir.accessLevel === "full" ? "Full Access" : "Limited Access"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" asChild>
                      <a href={`/heirs/edit/${heir.id}`}>
                        <Edit className="h-4 w-4" />
                      </a>
                    </Button>
                    <DeleteHeirButton heirId={heir.id} heirName={`${heir.firstName} ${heir.lastName}`} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <p className="text-muted-foreground mb-4">You haven't added any secondary heirs yet</p>
                <Button asChild>
                  <a href="/heirs/new">
                    <Plus className="mr-2 h-4 w-4" /> Add Secondary Heir
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              <User className="inline-block mr-1 h-4 w-4" /> You can add up to 5 heirs to your vault
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
