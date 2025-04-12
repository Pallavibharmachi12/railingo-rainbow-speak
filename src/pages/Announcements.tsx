
import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { dataService } from "@/lib/data";
import { Announcement, Language } from "@/types";
import AnnouncementList from "@/components/announcements/AnnouncementList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TrainStatusTicker from "@/components/common/TrainStatusTicker";
import LanguageSelector from "@/components/common/LanguageSelector";

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await dataService.getAnnouncements();
        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        setError("Failed to load announcements. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const train = announcement.train;
    
    if (!train) return false;
    
    const searchLower = searchQuery.toLowerCase();
    
    return (
      train.trainName.toLowerCase().includes(searchLower) ||
      train.trainNumber.includes(searchLower) ||
      train.source.toLowerCase().includes(searchLower) ||
      train.destination.toLowerCase().includes(searchLower) ||
      announcement.message[selectedLanguage].toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {announcements.length > 0 && (
        <TrainStatusTicker
          trains={announcements.map((a) => a.train).filter(Boolean) as any[]}
        />
      )}

      <main className="flex-grow container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Station Announcements</h1>
            <p className="text-muted-foreground">
              Listen to the latest train announcements in your preferred language
            </p>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search by train name, number, or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-lg animate-pulse-soft">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        ) : (
          <AnnouncementList announcements={filteredAnnouncements} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Announcements;
