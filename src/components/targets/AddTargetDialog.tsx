
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/components/ui/use-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const targetFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().optional(),
  // Authentication fields
  useBasicAuth: z.boolean().default(false),
  username: z.string().optional(),
  password: z.string().optional(),
  loginUrl: z.string().url("Please enter a valid login URL").optional(),
  // VPN fields
  useVpn: z.boolean().default(false),
  vpnType: z.enum(["token", "config", "internal"]).optional(),
  vpnToken: z.string().optional(),
  // Headers/Advanced
  customHeaders: z.string().optional(),
  // Schedule fields
  useSchedule: z.boolean().default(false),
  scheduleType: z.enum(["daily", "weekly", "monthly", "custom"]).optional(),
  scheduleTime: z.date().optional(),
  scheduleDay: z.string().optional(),
});

type TargetFormData = z.infer<typeof targetFormSchema>;

type AddTargetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddTargetDialog({ open, onOpenChange }: AddTargetDialogProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<TargetFormData>({
    resolver: zodResolver(targetFormSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      useBasicAuth: false,
      useVpn: false,
      useSchedule: false,
    },
  });

  const handleSubmit = (data: TargetFormData) => {
    console.log("Form data submitted:", data);
    // In a real app, send this data to your backend
    
    onOpenChange(false);
    toast({
      title: "Target added successfully",
      description: "The target has been added to your account.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("targets.addNewTarget")}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="basic">{t("targets.name")}</TabsTrigger>
                <TabsTrigger value="credentials">{t("targets.targetCredentials")}</TabsTrigger>
                <TabsTrigger value="schedule">{t("targets.scanSchedule")}</TabsTrigger>
                <TabsTrigger value="advanced">{t("targets.headers")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("targets.name")}</FormLabel>
                      <FormControl>
                        <Input placeholder="My Website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("targets.url")}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("targets.description")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Main corporate website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="credentials" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">{t("targets.basicAuth")}</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common.username")}</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common.password")}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="loginUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common.loginUrl")}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/login" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h3 className="text-lg font-medium">{t("targets.vpnConnection")}</h3>
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="vpnType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("targets.vpnConnection")}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select VPN type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="token">{t("targets.vpnToken")}</SelectItem>
                              <SelectItem value="config">{t("targets.vpnConfig")}</SelectItem>
                              <SelectItem value="internal">{t("targets.useInternalVPN")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("vpnType") === "token" && (
                      <FormField
                        control={form.control}
                        name="vpnToken"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>{t("targets.vpnToken")}</FormLabel>
                            <FormControl>
                              <Input placeholder="VPN token" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="scheduleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("targets.scanFrequency")}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">{t("targets.daily")}</SelectItem>
                          <SelectItem value="weekly">{t("targets.weekly")}</SelectItem>
                          <SelectItem value="monthly">{t("targets.monthly")}</SelectItem>
                          <SelectItem value="custom">{t("targets.custom")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("scheduleType") && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="scheduleTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{t("targets.chooseTime")}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={
                                    !field.value ? "text-muted-foreground" : ""
                                  }
                                >
                                  <Clock className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "HH:mm")
                                  ) : (
                                    <span>Select time</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <div className="p-4">
                                <Select
                                  onValueChange={(value) => {
                                    const [hour, minute] = value.split(":");
                                    const date = new Date();
                                    date.setHours(parseInt(hour));
                                    date.setMinutes(parseInt(minute));
                                    field.onChange(date);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }).map((_, hour) =>
                                      [0, 30].map((minute) => {
                                        const timeValue = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                        return (
                                          <SelectItem key={timeValue} value={timeValue}>
                                            {timeValue}
                                          </SelectItem>
                                        );
                                      })
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {(form.watch("scheduleType") === "weekly" || form.watch("scheduleType") === "monthly") && (
                      <FormField
                        control={form.control}
                        name="scheduleDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("targets.chooseDay")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {form.watch("scheduleType") === "weekly" ? (
                                  <>
                                    <SelectItem value="monday">Monday</SelectItem>
                                    <SelectItem value="tuesday">Tuesday</SelectItem>
                                    <SelectItem value="wednesday">Wednesday</SelectItem>
                                    <SelectItem value="thursday">Thursday</SelectItem>
                                    <SelectItem value="friday">Friday</SelectItem>
                                    <SelectItem value="saturday">Saturday</SelectItem>
                                    <SelectItem value="sunday">Sunday</SelectItem>
                                  </>
                                ) : (
                                  Array.from({ length: 28 }).map((_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                      {(i + 1).toString()}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="customHeaders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("targets.headers")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder='{"Authorization": "Bearer token", "X-Custom-Header": "Value"}' 
                          className="font-mono text-sm"
                          rows={6}
                          {...field} 
                          value={field.value || ''} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter custom headers as JSON format
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="pt-2">
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">
                  {activeTab !== "basic" && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        const tabs = ["basic", "credentials", "schedule", "advanced"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex > 0) {
                          setActiveTab(tabs[currentIndex - 1]);
                        }
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {activeTab !== "advanced" && (
                    <Button 
                      type="button"
                      onClick={() => {
                        const tabs = ["basic", "credentials", "schedule", "advanced"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex < tabs.length - 1) {
                          setActiveTab(tabs[currentIndex + 1]);
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                  >
                    {t("common.cancel")}
                  </Button>
                  
                  {activeTab === "advanced" && (
                    <Button type="submit">
                      {t("common.save")}
                    </Button>
                  )}
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
