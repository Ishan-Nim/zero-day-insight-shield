import { useState } from "react";
import { mockTargets } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { BadgeCheck, Calendar, PlusCircle, Search, Trash2, MoreVertical, Play, Edit, Clock, Key } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ScheduleFormValues {
  frequency: 'daily' | 'weekly' | 'monthly';
  date?: Date;
  time?: string;
}

interface CredentialsFormValues {
  useBasicAuth: boolean;
  username?: string;
  password?: string;
  loginUrl?: string;
  useVpn: boolean;
  vpnDetails?: string;
  useHeaders: boolean;
  headers?: string;
}

export default function TargetsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState({ name: "", url: "", description: "" });
  const [scanningTargets, setScanningTargets] = useState<{[key: string]: boolean}>({});
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isCredentialsDialogOpen, setIsCredentialsDialogOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  const scheduleForm = useForm<ScheduleFormValues>({
    defaultValues: {
      frequency: 'weekly',
    }
  });

  const credentialsForm = useForm<CredentialsFormValues>({
    defaultValues: {
      useBasicAuth: false,
      useVpn: false,
      useHeaders: false,
    }
  });

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
    toast({
      title: "Target Added",
      description: "Your new target has been added successfully.",
    });
    // In a real app, we would add the target to the database
  };

  const handleScheduleScan = (data: ScheduleFormValues) => {
    console.log("Scheduling scan for target:", activeTarget);
    console.log("Schedule data:", data);
    setIsScheduleDialogOpen(false);
    
    toast({
      title: "Scan Scheduled",
      description: `Your scan has been scheduled for ${data.frequency} ${data.time || '12:00'}.`,
    });
  };

  const handleSaveCredentials = (data: CredentialsFormValues) => {
    console.log("Saving credentials for target:", activeTarget);
    console.log("Credentials data:", data);
    setIsCredentialsDialogOpen(false);
    
    toast({
      title: "Credentials Saved",
      description: "Target credentials have been saved successfully.",
    });
  };

  const handleRunScan = (targetId: string) => {
    setActiveTarget(targetId);
    setScanningTargets(prev => ({ ...prev, [targetId]: true }));
    
    // Simulate a delay to show the scanning animation
    setTimeout(() => {
      setScanningTargets(prev => ({ ...prev, [targetId]: false }));
      
      toast({
        title: t('targets.scanStarted'),
        description: "We'll notify you by email once the scan is complete.",
        duration: 5000,
      });

      // Simulate admin notification (in a real app, this would be a server call)
      if (Math.random() > 0.5) { // Just to show it doesn't happen every time in this demo
        setTimeout(() => {
          toast({
            title: "Admin Notification",
            description: "The admin has been notified about your scan request.",
            duration: 3000,
          });
        }, 2000);
      }
    }, 3000);
  };

  const openScheduleDialog = (targetId: string) => {
    setActiveTarget(targetId);
    setIsScheduleDialogOpen(true);
  };

  const openCredentialsDialog = (targetId: string) => {
    setActiveTarget(targetId);
    setIsCredentialsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-6">
        <h1 className="text-2xl font-bold">{t('targets.title')}</h1>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('targets.searchTargets')}
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('targets.addTarget')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t('targets.addTarget')}</DialogTitle>
                <DialogDescription>Add a new website to scan for vulnerabilities</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t('targets.name')}</Label>
                  <Input 
                    id="name" 
                    placeholder="My Website" 
                    value={newTarget.name}
                    onChange={e => setNewTarget({...newTarget, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">{t('targets.url')}</Label>
                  <Input 
                    id="url" 
                    placeholder="https://example.com" 
                    value={newTarget.url}
                    onChange={e => setNewTarget({...newTarget, url: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">{t('targets.description')}</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Main corporate website" 
                    value={newTarget.description}
                    onChange={e => setNewTarget({...newTarget, description: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openCredentialsDialog("new")}>
                    <Key className="h-4 w-4 mr-2" />
                    {t('targets.credentials')}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>{t('common.cancel')}</Button>
                <Button onClick={handleAddTarget}>{t('common.add')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">{t('targets.all')}</TabsTrigger>
          <TabsTrigger value="active">{t('targets.active')}</TabsTrigger>
          <TabsTrigger value="inactive">{t('targets.inactive')}</TabsTrigger>
          <TabsTrigger value="scanning">{t('targets.scanning')}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredTargets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t('targets.noTargets')}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? "Try adjusting your search term" : t('targets.noTargetsDesc')}
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
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t('targets.verified')}
                            </span>
                          ) : (
                            t('targets.notVerified')
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
                          <DropdownMenuLabel>{t('targets.actions')}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleRunScan(target.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            {t('targets.runScan')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openScheduleDialog(target.id)}>
                            <Clock className="mr-2 h-4 w-4" />
                            {t('targets.scheduleScan')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openCredentialsDialog(target.id)}>
                            <Key className="mr-2 h-4 w-4" />
                            {t('targets.credentials')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('targets.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('targets.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">{t('targets.url')}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t('targets.description')}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {target.lastScan && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {t('targets.lastScan')}: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleRunScan(target.id)}
                          disabled={scanningTargets[target.id]}
                        >
                          {scanningTargets[target.id] ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t('targets.scanInProgress')}
                            </>
                          ) : (
                            t('targets.runScan')
                          )}
                        </Button>
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
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t('targets.verified')}
                            </span>
                          ) : (
                            t('targets.notVerified')
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
                          <DropdownMenuLabel>{t('targets.actions')}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleRunScan(target.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            {t('targets.runScan')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openScheduleDialog(target.id)}>
                            <Clock className="mr-2 h-4 w-4" />
                            {t('targets.scheduleScan')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openCredentialsDialog(target.id)}>
                            <Key className="mr-2 h-4 w-4" />
                            {t('targets.credentials')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('targets.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('targets.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">{t('targets.url')}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t('targets.description')}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {target.lastScan && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {t('targets.lastScan')}: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleRunScan(target.id)}
                          disabled={scanningTargets[target.id]}
                        >
                          {scanningTargets[target.id] ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t('targets.scanInProgress')}
                            </>
                          ) : (
                            t('targets.runScan')
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTargets
              .filter((target) => target.status === "inactive")
              .map((target) => (
                <Card key={target.id}>
                  {/* Similar card content */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t('targets.verified')}
                            </span>
                          ) : (
                            t('targets.notVerified')
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
                          <DropdownMenuLabel>{t('targets.actions')}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleRunScan(target.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            {t('targets.runScan')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openScheduleDialog(target.id)}>
                            <Clock className="mr-2 h-4 w-4" />
                            {t('targets.scheduleScan')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openCredentialsDialog(target.id)}>
                            <Key className="mr-2 h-4 w-4" />
                            {t('targets.credentials')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('targets.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('targets.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">{t('targets.url')}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t('targets.description')}</p>
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
                  {/* Similar card content */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t('targets.verified')}
                            </span>
                          ) : (
                            t('targets.notVerified')
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
                        <p className="text-sm font-medium">{t('targets.url')}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t('targets.description')}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="pt-2">
                        <p className="text-sm text-blue-500">{t('targets.scanInProgress')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('targets.scheduleScan')}</DialogTitle>
            <DialogDescription>
              Set up a recurring scan schedule for this target.
            </DialogDescription>
          </DialogHeader>
          <Form {...scheduleForm}>
            <form onSubmit={scheduleForm.handleSubmit(handleScheduleScan)} className="space-y-4">
              <FormField
                control={scheduleForm.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('targets.scheduleFrequency')}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">{t('targets.daily')}</SelectItem>
                        <SelectItem value="weekly">{t('targets.weekly')}</SelectItem>
                        <SelectItem value="monthly">{t('targets.monthly')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              {scheduleForm.watch("frequency") !== "daily" && (
                <FormField
                  control={scheduleForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={scheduleForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('targets.scheduleTime')}</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="Select time"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit">{t('common.save')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Credentials Dialog */}
      <Dialog open={isCredentialsDialogOpen} onOpenChange={setIsCredentialsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{t('targets.credentials')}</DialogTitle>
            <DialogDescription>
              Add authentication details for this target.
            </DialogDescription>
          </DialogHeader>
          <Form {...credentialsForm}>
            <form onSubmit={credentialsForm.handleSubmit(handleSaveCredentials)} className="space-y-4">
              <FormField
                control={credentialsForm.control}
                name="useBasicAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{t('targets.basicAuth')}</FormLabel>
                      <FormDescription>
                        Use HTTP Basic Authentication for this target.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {credentialsForm.watch("useBasicAuth") && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={credentialsForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('targets.username')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={credentialsForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('targets.password')}</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <FormField
                control={credentialsForm.control}
                name="loginUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('targets.loginUrl')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/login" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={credentialsForm.control}
                name="useVpn"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{t('targets.vpnConnection')}</FormLabel>
                      <FormDescription>
                        Use VPN to access this target.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {credentialsForm.watch("useVpn") && (
                <FormField
                  control={credentialsForm.control}
                  name="vpnDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('targets.vpnDetails')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="VPN configuration details" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={credentialsForm.control}
                name="useHeaders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{t('targets.headers')}</FormLabel>
                      <FormDescription>
                        Add custom headers or authentication tokens.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {credentialsForm.watch("useHeaders") && (
                <FormField
                  control={credentialsForm.control}
                  name="headers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('targets.authTokens')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder='{"Authorization": "Bearer token", "X-API-Key": "key"}'
                          className="font-mono text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCredentialsDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit">{t('common.save')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to format dates
function format(date: Date, formatStr: string): string {
  // Simple implementation for demo
  return date.toLocaleDateString();
}
