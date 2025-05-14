
import { useState } from "react";
import { mockTargets } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { BadgeCheck, Calendar, PlusCircle, Search, Trash2, MoreVertical, Play, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TargetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState({ name: "", url: "", description: "" });

  const filteredTargets = mockTargets.filter(
    target => 
      target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTarget = () => {
    console.log("Adding new target:", newTarget);
    setIsAddDialogOpen(false);
    setNewTarget({ name: "", url: "", description: "" });
    // In a real app, we would add the target to the database
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-6">
        <h1 className="text-2xl font-bold">Target Management</h1>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search targets..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Target
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Target</DialogTitle>
                <DialogDescription>Add a new website to scan for vulnerabilities</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="My Website" 
                    value={newTarget.name}
                    onChange={e => setNewTarget({...newTarget, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input 
                    id="url" 
                    placeholder="https://example.com" 
                    value={newTarget.url}
                    onChange={e => setNewTarget({...newTarget, url: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input 
                    id="description" 
                    placeholder="Main corporate website" 
                    value={newTarget.description}
                    onChange={e => setNewTarget({...newTarget, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTarget}>Add Target</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Targets</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="scanning">Scanning</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredTargets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No targets found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? "Try adjusting your search term" : "Add your first target to begin scanning"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTargets.map((target) => (
                <Card key={target.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                            </span>
                          ) : (
                            "Not verified"
                          )}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Run Scan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Target
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">URL</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {target.lastScan && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            Last scan: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <Button size="sm">Run Scan</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="active">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTargets
              .filter((target) => target.status === "active")
              .map((target) => (
                <Card key={target.id}>
                  {/* Same card content as above */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                            </span>
                          ) : (
                            "Not verified"
                          )}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Run Scan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Target
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">URL</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {target.lastScan && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            Last scan: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <Button size="sm">Run Scan</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        {/* Similar content for 'inactive' and 'scanning' tabs */}
        <TabsContent value="inactive">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTargets
              .filter((target) => target.status === "inactive")
              .map((target) => (
                <Card key={target.id}>
                  {/* Same card content structure */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                            </span>
                          ) : (
                            "Not verified"
                          )}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Run Scan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Target
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">URL</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="pt-2">
                        <Button size="sm">Activate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="scanning">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTargets
              .filter((target) => target.status === "scanning")
              .map((target) => (
                <Card key={target.id}>
                  {/* Same card content structure */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                            </span>
                          ) : (
                            "Not verified"
                          )}
                        </CardDescription>
                      </div>
                      <div className="animate-pulse-dot">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">URL</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="pt-2">
                        <p className="text-sm text-blue-500">Scan in progress...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
