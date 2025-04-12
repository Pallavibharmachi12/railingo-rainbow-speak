
import { Language } from "@/types";
import { toast } from "@/components/ui/use-toast";

// ElevenLabs voice IDs for different languages
const VOICE_IDS: Record<Language, string> = {
  english: "EXAVITQu4vr4xnSDxMaL", // Sarah
  hindi: "pFZP5JQG7iQjIQuC4Bku", // Lily
  telugu: "IKne3meq5aSn9XLyUdCD", // Charlie
};

// Map of active Audio elements
const audioMap = new Map<string, HTMLAudioElement>();

export const ttsService = {
  apiKey: "", // This should be set by the user in the app

  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem("elevenlabs_api_key", key);
    console.log("ElevenLabs API key set");
  },

  getApiKey(): string {
    if (!this.apiKey) {
      const storedKey = localStorage.getItem("elevenlabs_api_key");
      if (storedKey) {
        this.apiKey = storedKey;
      }
    }
    return this.apiKey;
  },

  async generateSpeech(text: string, language: Language): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      toast({ 
        title: "API Key Missing", 
        description: "Please set your ElevenLabs API key in the settings", 
        variant: "destructive" 
      });
      throw new Error("ElevenLabs API key is not set");
    }

    // For now, return a mock URL to an audio file
    // In a real app, we would call the ElevenLabs API here
    console.log(`Generating speech for: ${text} in ${language}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, just return a placeholder
    return `https://example.com/audio-${language}-${Date.now()}.mp3`;
  },

  async playAnnouncement(text: string, language: Language, announcementId?: string): Promise<void> {
    try {
      // Simulate playing TTS audio
      console.log(`Playing announcement in ${language}: ${text}`);
      
      // Stop any currently playing announcement with the same ID
      if (announcementId) {
        this.stopAnnouncement(announcementId);
      }
      
      // In a real app, we would generate and play audio here
      const audioUrl = await this.generateSpeech(text, language);
      
      // For demo purposes, create a bell sound to simulate announcement
      const audio = new Audio();
      
      // Play bell sound followed by 1s delay
      audio.src = "/bell-sound.mp3"; // This would be a real bell sound file
      
      // Simulate audio with a timer
      toast({
        title: "Playing Announcement",
        description: `${language.charAt(0).toUpperCase() + language.slice(1)}: ${text.substring(0, 60)}...`,
        duration: 5000,
      });
      
      // Store the audio element if we have an ID
      if (announcementId) {
        audioMap.set(announcementId, audio);
      }
      
      // In a real implementation, this would actually play audio
      // audio.play();
    } catch (error) {
      console.error("Error playing announcement:", error);
      toast({
        title: "Error",
        description: "Could not play announcement audio",
        variant: "destructive",
      });
    }
  },

  stopAnnouncement(announcementId: string): void {
    const audio = audioMap.get(announcementId);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audioMap.delete(announcementId);
    }
  },

  stopAllAnnouncements(): void {
    audioMap.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    audioMap.clear();
  }
};

// Initialize API key from localStorage if available
ttsService.getApiKey();
