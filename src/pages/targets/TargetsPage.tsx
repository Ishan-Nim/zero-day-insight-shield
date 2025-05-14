
import { useState } from "react";
import { mockTargets } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Calendar, PlusCircle, Search, Trash2, MoreVertical, Play, Edit, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/components/ui/use-toast";
import AddTargetDialog from "@/components/targets/AddTargetDialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TargetsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [scanningTargetIds, setScanningTargetIds] = useState<string[]>([]);

  const filteredTargets = mockTargets.filter(
    target => 
      target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startScan = (targetId: string) => {
    // Add target to scanning state
    setScanningTargetIds(prev => [...prev, targetId]);
    
    // Simulate API call delay
    setTimeout(() => {
      // Show success toast
      toast({
        title: t("targets.scanStarted"),
        description: `Target ID: ${targetId}`,
      });
      
      // Remove target from scanning state after notification
      setScanningTargetIds(prev => prev.filter(id => id !== targetId));
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-6">
        <h1 className="text-2xl font-bold">{t("targets.title")}</h1>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("targets.searchPlaceholder")}
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("targets.addTarget")}
          </Button>
          <AddTargetDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">{t("targets.allTargets")}</TabsTrigger>
          <TabsTrigger value="active">{t("targets.active")}</TabsTrigger>
          <TabsTrigger value="inactive">{t("targets.inactive")}</TabsTrigger>
          <TabsTrigger value="scanning">{t("targets.scanning")}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredTargets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t("targets.noTargetsFound")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? t("targets.tryAdjustingSearch") : t("targets.addFirstTarget")}
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
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t("targets.verified")}
                            </span>
                          ) : (
                            t("targets.notVerified")
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
                          <DropdownMenuLabel>{t("targets.actions")}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => startScan(target.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            {t("targets.runScan")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("targets.editTarget")}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("common.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">{t("targets.url")}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t("targets.description")}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {target.lastScan && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {t("targets.lastScan")}: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <Button 
                          size="sm"
                          onClick={() => startScan(target.id)}
                          disabled={scanningTargetIds.includes(target.id)}
                        >
                          {scanningTargetIds.includes(target.id) ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("common.loading")}
                            </>
                          ) : (
                            t("targets.runScan")
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
                  {/* Similar card content as above */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t("targets.verified")}
                            </span>
                          ) : (
                            t("targets.notVerified")
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
                          <DropdownMenuLabel>{t("targets.actions")}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => startScan(target.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            {t("targets.runScan")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("targets.editTarget")}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("common.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">{t("targets.url")}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t("targets.description")}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {target.lastScan && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {t("targets.lastScan")}: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <Button 
                          size="sm"
                          onClick={() => startScan(target.id)}
                          disabled={scanningTargetIds.includes(target.id)}
                        >
                          {scanningTargetIds.includes(target.id) ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("common.loading")}
                            </>
                          ) : (
                            t("targets.runScan")
                          )}
                        </Button>
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
                  {/* Similar card content structure */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t("targets.verified")}
                            </span>
                          ) : (
                            t("targets.notVerified")
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
                          <DropdownMenuLabel>{t("targets.actions")}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => startScan(target.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            {t("targets.runScan")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("targets.editTarget")}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("common.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">{t("targets.url")}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t("targets.description")}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="pt-2">
                        <Button size="sm">{t("targets.activate")}</Button>
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
                  {/* Similar card content structure */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{target.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {target.verified ? (
                            <span className="inline-flex items-center text-green-600">
                              <BadgeCheck className="mr-1 h-3 w-3" /> {t("targets.verified")}
                            </span>
                          ) : (
                            t("targets.notVerified")
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
                        <p className="text-sm font-medium">{t("targets.url")}</p>
                        <p className="text-sm text-muted-foreground break-all">{target.url}</p>
                      </div>
                      {target.description && (
                        <div>
                          <p className="text-sm font-medium">{t("targets.description")}</p>
                          <p className="text-sm text-muted-foreground">{target.description}</p>
                        </div>
                      )}
                      <div className="pt-2">
                        <p className="text-sm text-blue-500">{t("targets.scanInProgress")}</p>
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
