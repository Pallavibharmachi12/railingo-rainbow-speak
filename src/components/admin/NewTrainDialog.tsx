
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Train, TrainStatus } from "@/types";
import { dataService } from "@/lib/data";

interface NewTrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (train: Omit<Train, "id">) => void;
}

const NewTrainDialog: React.FC<NewTrainDialogProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainName, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [scheduledArrival, setScheduledArrival] = useState("");
  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [platform, setPlatform] = useState("1");
  const [status, setStatus] = useState<TrainStatus>("ON_TIME");

  const resetForm = () => {
    setTrainNumber("");
    setTrainName("");
    setSource("");
    setDestination("");
    setScheduledArrival("");
    setScheduledDeparture("");
    setPlatform("1");
    setStatus("ON_TIME");
  };

  const handleSave = () => {
    const newTrain: Omit<Train, "id"> = {
      trainNumber,
      trainName,
      source,
      destination,
      scheduledArrival,
      scheduledDeparture,
      platform,
      status,
    };
    onSave(newTrain);
    resetForm();
  };

  const isFormValid = () => {
    return (
      trainNumber.trim() !== "" &&
      trainName.trim() !== "" &&
      source.trim() !== "" &&
      destination.trim() !== "" &&
      scheduledArrival.trim() !== "" &&
      scheduledDeparture.trim() !== "" &&
      platform.trim() !== ""
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Train</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trainNumber">Train Number</Label>
              <Input
                id="trainNumber"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="e.g., 12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trainName">Train Name</Label>
              <Input
                id="trainName"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
                placeholder="e.g., Rajdhani Express"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g., Delhi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Mumbai"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledArrival">Scheduled Arrival</Label>
              <Input
                id="scheduledArrival"
                value={scheduledArrival}
                onChange={(e) => setScheduledArrival(e.target.value)}
                placeholder="e.g., 08:30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledDeparture">Scheduled Departure</Label>
              <Input
                id="scheduledDeparture"
                value={scheduledDeparture}
                onChange={(e) => setScheduledDeparture(e.target.value)}
                placeholder="e.g., 08:45"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid()}>
            Save Train
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTrainDialog;
