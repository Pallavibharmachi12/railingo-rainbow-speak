
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Announcement, Language, Train, TrainStatus } from "@/types";
import { dataService } from "@/lib/data";

interface NewAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (announcement: Omit<Announcement, "id" | "timestamp">) => void;
  trains: Train[];
}

const NewAnnouncementDialog: React.FC<NewAnnouncementDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  trains,
}) => {
  const [trainId, setTrainId] = useState("");
  const [messageType, setMessageType] = useState<Announcement["messageType"]>("ARRIVAL");
  const [platform, setPlatform] = useState("1");
  const [status, setStatus] = useState<TrainStatus>("ARRIVING");
  const [messages, setMessages] = useState<Record<Language, string>>({
    english: "",
    hindi: "",
    telugu: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");

  // Generate announcement templates when train, messageType, or platform changes
  useEffect(() => {
    if (!trainId) return;

    const selectedTrain = trains.find((t) => t.id === trainId);
    if (!selectedTrain) return;

    // Generate announcement templates
    const englishTemplate = generateTemplate(selectedTrain, messageType, platform, status, "english");
    
    // For demo purposes, generate placeholder translations
    const hindiTemplate = `यह ${selectedTrain.trainName} के लिए ${
      messageType === "ARRIVAL" ? "आगमन" : 
      messageType === "DEPARTURE" ? "प्रस्थान" : 
      messageType === "DELAY" ? "देरी" : 
      messageType === "PLATFORM_CHANGE" ? "प्लेटफॉर्म बदलाव" : 
      "रद्दीकरण"
    } की घोषणा है।`;
    
    const teluguTemplate = `ఇది ${selectedTrain.trainName} కోసం ${
      messageType === "ARRIVAL" ? "రాక" : 
      messageType === "DEPARTURE" ? "నిష్క్రమణ" : 
      messageType === "DELAY" ? "ఆలస్యం" : 
      messageType === "PLATFORM_CHANGE" ? "ప్లాట్‌ఫారం మార్పు" : 
      "రద్దు"
    } ప్రకటన.`;

    setMessages({
      english: englishTemplate,
      hindi: hindiTemplate,
      telugu: teluguTemplate,
    });
  }, [trainId, messageType, platform, status, trains]);

  const generateTemplate = (
    train: Train,
    messageType: Announcement["messageType"],
    platform: string,
    status: TrainStatus,
    language: Language
  ): string => {
    if (language === "english") {
      switch (messageType) {
        case "ARRIVAL":
          return `Attention passengers, ${train.trainName} (${train.trainNumber}) from ${train.source} to ${train.destination} is arriving on platform ${platform}.`;
        case "DEPARTURE":
          return `Attention passengers, ${train.trainName} (${train.trainNumber}) from ${train.source} to ${train.destination} is departing from platform ${platform}.`;
        case "DELAY":
          return `We regret to inform that ${train.trainName} (${train.trainNumber}) from ${train.source} to ${train.destination} is delayed by 30 minutes.`;
        case "PLATFORM_CHANGE":
          return `Attention passengers, ${train.trainName} (${train.trainNumber}) from ${train.source} to ${train.destination} will now arrive on platform ${platform}.`;
        case "CANCELLATION":
          return `We regret to inform that ${train.trainName} (${train.trainNumber}) from ${train.source} to ${train.destination} has been cancelled due to technical reasons.`;
        default:
          return "";
      }
    }
    return "";
  };

  const resetForm = () => {
    setTrainId("");
    setMessageType("ARRIVAL");
    setPlatform("1");
    setStatus("ARRIVING");
    setMessages({
      english: "",
      hindi: "",
      telugu: "",
    });
    setSelectedLanguage("english");
  };

  const handleSave = () => {
    const newAnnouncement: Omit<Announcement, "id" | "timestamp"> = {
      trainId,
      messageType,
      platform,
      status,
      message: messages,
    };
    onSave(newAnnouncement);
    resetForm();
  };

  const isFormValid = () => {
    return (
      trainId !== "" &&
      platform !== "" &&
      messages.english.trim() !== "" &&
      messages.hindi.trim() !== "" &&
      messages.telugu.trim() !== ""
    );
  };

  const handleMessageChange = (value: string) => {
    setMessages((prev) => ({
      ...prev,
      [selectedLanguage]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="train">Train</Label>
            <Select value={trainId} onValueChange={setTrainId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a train" />
              </SelectTrigger>
              <SelectContent>
                {trains.map((train) => (
                  <SelectItem key={train.id} value={train.id}>
                    {train.trainNumber} - {train.trainName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="messageType">Announcement Type</Label>
              <Select value={messageType} onValueChange={(value) => setMessageType(value as Announcement["messageType"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ARRIVAL">Arrival</SelectItem>
                  <SelectItem value="DEPARTURE">Departure</SelectItem>
                  <SelectItem value="DELAY">Delay</SelectItem>
                  <SelectItem value="PLATFORM_CHANGE">Platform Change</SelectItem>
                  <SelectItem value="CANCELLATION">Cancellation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as TrainStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ON_TIME">On Time</SelectItem>
                <SelectItem value="ARRIVING">Arriving</SelectItem>
                <SelectItem value="ARRIVED">Arrived</SelectItem>
                <SelectItem value="DEPARTING">Departing</SelectItem>
                <SelectItem value="DEPARTED">Departed</SelectItem>
                <SelectItem value="DELAYED">Delayed</SelectItem>
                <SelectItem value="PLATFORM_CHANGED">Platform Changed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="message">Announcement Message</Label>
              <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English 🇬🇧</SelectItem>
                  <SelectItem value="hindi">Hindi 🇮🇳</SelectItem>
                  <SelectItem value="telugu">Telugu 🇮🇳</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="message"
              value={messages[selectedLanguage]}
              onChange={(e) => handleMessageChange(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid()}>
            Create Announcement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAnnouncementDialog;
