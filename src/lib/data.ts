
import { Announcement, Language, Train, TrainStatus } from "@/types";

// Mock train data
export const TRAINS: Train[] = [
  {
    id: "1",
    trainNumber: "12345",
    trainName: "Rajdhani Express",
    source: "Delhi",
    destination: "Mumbai",
    scheduledArrival: "08:30",
    scheduledDeparture: "08:45",
    platform: "1",
    status: "ON_TIME",
  },
  {
    id: "2",
    trainNumber: "67890",
    trainName: "Shatabdi Express",
    source: "Chennai",
    destination: "Bangalore",
    scheduledArrival: "09:15",
    scheduledDeparture: "09:30",
    platform: "2",
    status: "DELAYED",
  },
  {
    id: "3",
    trainNumber: "54321",
    trainName: "Duronto Express",
    source: "Kolkata",
    destination: "Hyderabad",
    scheduledArrival: "10:00",
    scheduledDeparture: "10:15",
    platform: "3", 
    status: "ARRIVING",
  },
  {
    id: "4",
    trainNumber: "98765",
    trainName: "Garib Rath",
    source: "Jaipur",
    destination: "Pune",
    scheduledArrival: "11:45",
    scheduledDeparture: "12:00",
    platform: "4",
    status: "PLATFORM_CHANGED",
  },
  {
    id: "5",
    trainNumber: "13579",
    trainName: "Sampark Kranti",
    source: "Ahmedabad",
    destination: "Goa",
    scheduledArrival: "13:30",
    scheduledDeparture: "13:45",
    platform: "5",
    status: "CANCELLED",
  },
];

// Mock announcements data
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    trainId: "1",
    messageType: "ARRIVAL",
    platform: "1",
    status: "ARRIVING",
    message: {
      english: "Attention passengers, Rajdhani Express from Delhi to Mumbai is arriving on platform 1.",
      hindi: "यात्रियों को सूचित किया जाता है, राजधानी एक्सप्रेस दिल्ली से मुंबई के लिए प्लेटफॉर्म 1 पर आ रही है।",
      telugu: "ప్రయాణికులకు గమనిక, దిల్లీ నుండి ముంబైకి వెళ్ళే రాజధాని ఎక్స్‌ప్రెస్ ప్లాట్‌ఫారం 1పై రాబోతోంది.",
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    trainId: "2",
    messageType: "DELAY",
    platform: "2",
    status: "DELAYED",
    message: {
      english: "We regret to inform that Shatabdi Express from Chennai to Bangalore is delayed by 30 minutes.",
      hindi: "हमें यह सूचित करते हुए खेद है कि चेन्नई से बैंगलोर के लिए शताब्दी एक्सप्रेस 30 मिनट की देरी से आ रही है।",
      telugu: "చెన్నై నుండి బెంగళూరుకి వెళ్ళే శతాబ్ది ఎక్స్‌ప్రెస్ 30 నిమిషాలు ఆలస్యంగా ఉందని తెలియజేయడానికి చింతిస్తున్నాము.",
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    trainId: "3",
    messageType: "ARRIVAL",
    platform: "3",
    status: "ARRIVING",
    message: {
      english: "Attention passengers, Duronto Express from Kolkata to Hyderabad is arriving on platform 3.",
      hindi: "यात्रियों को सूचित किया जाता है, दुरंतो एक्सप्रेस कोलकाता से हैदराबाद के लिए प्लेटफॉर्म 3 पर आ रही है।",
      telugu: "ప్రయాణికులకు గమనిక, కోల్కతా నుండి హైదరాబాద్‌కి వెళ్ళే దురంతో ఎక్స్‌ప్రెస్ ప్లాట్‌ఫారం 3పై రాబోతోంది.",
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "4",
    trainId: "4",
    messageType: "PLATFORM_CHANGE",
    platform: "5",
    status: "PLATFORM_CHANGED",
    message: {
      english: "Attention passengers, Garib Rath from Jaipur to Pune will now arrive at platform 5 instead of platform 4.",
      hindi: "यात्रियों को सूचित किया जाता है, गरीब रथ जयपुर से पुणे के लिए प्लेटफॉर्म 4 के बजाय प्लेटफॉर्म 5 पर आएगी।",
      telugu: "ప్రయాణికులకు గమనిక, జైపూర్ నుండి పూణేకి వెళ్ళే గరీబ్ రథ్ ప్లాట్‌ఫారం 4 బదులుగా ప్లాట్‌ఫారం 5పై వస్తుంది.",
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "5",
    trainId: "5",
    messageType: "CANCELLATION",
    platform: "5",
    status: "CANCELLED",
    message: {
      english: "We regret to inform that Sampark Kranti from Ahmedabad to Goa has been cancelled due to technical reasons.",
      hindi: "हमें यह सूचित करते हुए खेद है कि तकनीकी कारणों से अहमदाबाद से गोवा के लिए संपर्क क्रांति रद्द कर दी गई है।",
      telugu: "సాంకేతిక కారణాల వల్ల అహ్మదాబాద్ నుండి గోవాకు వెళ్ళే సంపర్క్ క్రాంతి రద్దు చేయబడిందని తెలియజేయడానికి చింతిస్తున్నాము.",
    },
    timestamp: new Date().toISOString(),
  },
];

// Mock data service
export const dataService = {
  getTrains: async (): Promise<Train[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...TRAINS];
  },
  
  getTrainById: async (id: string): Promise<Train | undefined> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return TRAINS.find(train => train.id === id);
  },
  
  updateTrain: async (train: Train): Promise<Train> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Find and update the train in our mock data
    const index = TRAINS.findIndex(t => t.id === train.id);
    
    if (index === -1) {
      throw new Error("Train not found");
    }
    
    TRAINS[index] = train;
    return train;
  },
  
  createTrain: async (train: Omit<Train, "id">): Promise<Train> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a new train with ID
    const newTrain: Train = {
      ...train,
      id: String(TRAINS.length + 1),
    };
    
    // Add to mock data
    TRAINS.push(newTrain);
    return newTrain;
  },
  
  getAnnouncements: async (): Promise<Announcement[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return the announcements with train data
    return ANNOUNCEMENTS.map(announcement => {
      const train = TRAINS.find(train => train.id === announcement.trainId);
      return {
        ...announcement,
        train,
      };
    });
  },
  
  createAnnouncement: async (announcement: Omit<Announcement, "id" | "timestamp">): Promise<Announcement> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Create a new announcement with ID and timestamp
    const newAnnouncement: Announcement = {
      ...announcement,
      id: String(ANNOUNCEMENTS.length + 1),
      timestamp: new Date().toISOString(),
    };
    
    // Add to mock data
    ANNOUNCEMENTS.push(newAnnouncement);
    return newAnnouncement;
  },

  getStatusColor: (status: TrainStatus): string => {
    switch (status) {
      case "ON_TIME":
        return "bg-green-500";
      case "ARRIVING":
      case "ARRIVED":
      case "DEPARTING":
      case "DEPARTED":
        return "bg-blue-500";
      case "DELAYED":
        return "bg-yellow-500";
      case "PLATFORM_CHANGED":
        return "bg-purple-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  },

  getStatusText: (status: TrainStatus): string => {
    switch (status) {
      case "ON_TIME":
        return "On Time";
      case "ARRIVING":
        return "Arriving";
      case "ARRIVED":
        return "Arrived";
      case "DEPARTING":
        return "Departing";
      case "DEPARTED":
        return "Departed";
      case "DELAYED":
        return "Delayed";
      case "PLATFORM_CHANGED":
        return "Platform Changed";
      case "CANCELLED":
        return "Cancelled";
      default:
        return "Unknown";
    }
  },

  getLanguageName: (language: Language): string => {
    switch (language) {
      case "english":
        return "English";
      case "hindi":
        return "हिन्दी";
      case "telugu":
        return "తెలుగు";
      default:
        return "Unknown";
    }
  },
  
  getLanguageFlag: (language: Language): string => {
    switch (language) {
      case "english":
        return "🇬🇧";
      case "hindi":
        return "🇮🇳";
      case "telugu":
        return "🇮🇳";
      default:
        return "🏁";
    }
  },
};
