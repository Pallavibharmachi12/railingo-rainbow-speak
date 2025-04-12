
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Announcement, Language } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { dataService } from "@/lib/data";
import { ttsService } from "@/lib/tts";
import { Volume2, VolumeX } from "lucide-react";
import LanguageSelector from "../common/LanguageSelector";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handlePlayAnnouncement = async () => {
    if (isPlaying) {
      ttsService.stopAnnouncement(announcement.id);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      try {
        await ttsService.playAnnouncement(
          announcement.message[selectedLanguage],
          selectedLanguage,
          announcement.id
        );
        // In a real app, we would wait for audio to complete
        // For now, simulate audio duration
        setTimeout(() => setIsPlaying(false), 5000);
      } catch (error) {
        console.error("Failed to play announcement:", error);
        setIsPlaying(false);
      }
    }
  };

  const statusColorClass = dataService.getStatusColor(announcement.status);
  const formattedTime = formatDistanceToNow(new Date(announcement.timestamp), { addSuffix: true });

  return (
    <Card className="card-hover overflow-hidden">
      <div className={`h-1 ${statusColorClass}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{announcement.train?.trainName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {announcement.train?.source} → {announcement.train?.destination}
            </p>
          </div>
          <div className="flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
            {announcement.train?.trainNumber}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4 rounded-md bg-secondary/50 p-3">
          <p className="text-sm">{announcement.message[selectedLanguage]}</p>
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Platform {announcement.platform}</span>
          <span
            className={`px-2 py-0.5 rounded font-medium text-white ${dataService.getStatusColor(
              announcement.status
            )}`}
          >
            {dataService.getStatusText(announcement.status)}
          </span>
          <span>{formattedTime}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <LanguageSelector 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={handleLanguageChange} 
        />
        <Button
          variant="outline"
          size="icon"
          className={isPlaying ? "bg-primary/10" : ""}
          onClick={handlePlayAnnouncement}
        >
          {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
