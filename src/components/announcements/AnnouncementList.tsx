
import React from "react";
import { Announcement } from "@/types";
import AnnouncementCard from "./AnnouncementCard";

interface AnnouncementListProps {
  announcements: Announcement[];
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({ announcements }) => {
  // Sort announcements by timestamp, newest first
  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg font-medium text-center mb-2">No announcements yet</p>
        <p className="text-muted-foreground text-center">
          Announcements will appear here as they become available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedAnnouncements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};

export default AnnouncementList;
