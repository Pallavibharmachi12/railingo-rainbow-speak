
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Announcement, Language } from "@/types";
import { dataService } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ttsService } from "@/lib/tts";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface AnnouncementsTableProps {
  announcements: Announcement[];
}

const AnnouncementsTable: React.FC<AnnouncementsTableProps> = ({ announcements }) => {
  // Sort announcements by timestamp, newest first
  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const playAnnouncement = async (announcement: Announcement, language: Language) => {
    await ttsService.playAnnouncement(
      announcement.message[language], 
      language, 
      announcement.id
    );
  };

  if (announcements.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-background">
        <p className="text-muted-foreground">No announcements found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Train</TableHead>
            <TableHead>Message Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Play</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAnnouncements.map((announcement) => (
            <TableRow key={announcement.id}>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {announcement.train?.trainName || "Unknown Train"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {announcement.train?.trainNumber || "N/A"}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {announcement.messageType.replace("_", " ")}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${dataService.getStatusColor(announcement.status)} text-white`}
                >
                  {dataService.getStatusText(announcement.status)}
                </Badge>
              </TableCell>
              <TableCell>{announcement.platform}</TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(announcement.timestamp), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playAnnouncement(announcement, "english")}
                    title="Play in English"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>🇬🇧</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playAnnouncement(announcement, "hindi")}
                    title="Play in Hindi"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>🇮🇳</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playAnnouncement(announcement, "telugu")}
                    title="Play in Telugu"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>తె</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnnouncementsTable;
