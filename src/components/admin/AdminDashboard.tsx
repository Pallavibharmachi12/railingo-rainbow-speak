
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Announcement, Train, TrainStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { dataService } from "@/lib/data";
import TrainsTable from "./TrainsTable";
import AnnouncementsTable from "./AnnouncementsTable";
import { PlusCircle } from "lucide-react";
import { ttsService } from "@/lib/tts";
import { Input } from "@/components/ui/input";
import NewAnnouncementDialog from "./NewAnnouncementDialog";
import NewTrainDialog from "./NewTrainDialog";
import { useToast } from "@/components/ui/use-toast";
import ApiKeyDialog from "./ApiKeyDialog";

const AdminDashboard: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTrain, setShowNewTrain] = useState(false);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedTrains, fetchedAnnouncements] = await Promise.all([
          dataService.getTrains(),
          dataService.getAnnouncements(),
        ]);

        setTrains(fetchedTrains);
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Check if ElevenLabs API key is set
    const apiKey = ttsService.getApiKey();
    if (!apiKey) {
      setShowApiKeyDialog(true);
    }
  }, [toast]);

  const handleSaveApiKey = (apiKey: string) => {
    ttsService.setApiKey(apiKey);
    setShowApiKeyDialog(false);
    toast({
      title: "API Key Saved",
      description: "ElevenLabs API key has been saved successfully.",
    });
  };

  const handleTrainStatusChange = async (trainId: string, newStatus: TrainStatus) => {
    try {
      const trainToUpdate = trains.find((train) => train.id === trainId);
      if (!trainToUpdate) return;

      const updatedTrain = { ...trainToUpdate, status: newStatus };
      await dataService.updateTrain(updatedTrain);

      // Update local state
      setTrains((prevTrains) =>
        prevTrains.map((train) => (train.id === trainId ? updatedTrain : train))
      );

      toast({
        title: "Train Updated",
        description: `${updatedTrain.trainName} status changed to ${dataService.getStatusText(
          newStatus
        )}.`,
      });
    } catch (error) {
      console.error("Failed to update train status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update train status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewTrain = async (train: Omit<Train, "id">) => {
    try {
      const newTrain = await dataService.createTrain(train);
      setTrains((prevTrains) => [...prevTrains, newTrain]);
      setShowNewTrain(false);
      toast({
        title: "Train Added",
        description: `${newTrain.trainName} has been added successfully.`,
      });
    } catch (error) {
      console.error("Failed to add train:", error);
      toast({
        title: "Error",
        description: "Failed to add new train. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewAnnouncement = async (announcement: Omit<Announcement, "id" | "timestamp">) => {
    try {
      const newAnnouncement = await dataService.createAnnouncement(announcement);
      setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnouncement]);
      setShowNewAnnouncement(false);
      toast({
        title: "Announcement Created",
        description: "New announcement has been created successfully.",
      });
    } catch (error) {
      console.error("Failed to create announcement:", error);
      toast({
        title: "Error",
        description: "Failed to create new announcement. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredTrains = searchQuery
    ? trains.filter(
        (train) =>
          train.trainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          train.trainNumber.includes(searchQuery) ||
          train.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
          train.destination.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trains;

  const filteredAnnouncements = searchQuery
    ? announcements.filter((announcement) => {
        const train = trains.find((t) => t.id === announcement.trainId);
        return (
          train?.trainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          train?.trainNumber.includes(searchQuery) ||
          announcement.message.english.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : announcements;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-soft">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage trains, create announcements, and monitor station activity
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => setShowApiKeyDialog(true)}
            className="ml-2"
          >
            Configure ElevenLabs API
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search trains or announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="trains" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="trains">Trains</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="trains" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Train Management</h2>
            <Button onClick={() => setShowNewTrain(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Train
            </Button>
          </div>

          <TrainsTable
            trains={filteredTrains}
            onStatusChange={handleTrainStatusChange}
          />
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <Button onClick={() => setShowNewAnnouncement(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </div>

          <AnnouncementsTable announcements={filteredAnnouncements} />
        </TabsContent>
      </Tabs>

      <NewTrainDialog
        open={showNewTrain}
        onOpenChange={setShowNewTrain}
        onSave={handleNewTrain}
      />

      <NewAnnouncementDialog
        open={showNewAnnouncement}
        onOpenChange={setShowNewAnnouncement}
        onSave={handleNewAnnouncement}
        trains={trains}
      />

      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onSave={handleSaveApiKey}
      />
    </div>
  );
};

export default AdminDashboard;
