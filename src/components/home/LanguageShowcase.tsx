
import React from "react";
import { dataService } from "@/lib/data";
import { Language } from "@/types";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { ttsService } from "@/lib/tts";

const LanguageShowcase: React.FC = () => {
  const languages: Language[] = ["english", "hindi", "telugu"];
  
  // Sample announcement text in different languages
  const sampleAnnouncement = {
    english: "Attention passengers, Rajdhani Express from Delhi to Mumbai is arriving on platform 1.",
    hindi: "यात्रियों को सूचित किया जाता है, राजधानी एक्सप्रेस दिल्ली से मुंबई के लिए प्लेटफॉर्म 1 पर आ रही है।",
    telugu: "ప్రయాణికులకు గమనిక, దిల్లీ నుండి ముంబైకి వెళ్ళే రాజధాని ఎక్స్‌ప్రెస్ ప్లాట్‌ఫారం 1పై రాబోతోంది.",
  };

  const handlePlaySample = (language: Language) => {
    ttsService.playAnnouncement(sampleAnnouncement[language], language, `sample-${language}`);
  };

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="rainbow-text">Multilingual Magic</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience seamless announcements in multiple languages
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {languages.map((language) => (
            <div key={language} className="relative group">
              <div className="absolute inset-0 rainbow-gradient rounded-lg opacity-50 blur-lg group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-background p-6 rounded-lg shadow-sm border overflow-hidden">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{dataService.getLanguageFlag(language)}</span>
                  <h3 className="text-xl font-semibold">{dataService.getLanguageName(language)}</h3>
                </div>
                
                <div className="mb-4 min-h-[120px]">
                  <p className="text-muted-foreground">
                    {sampleAnnouncement[language]}
                  </p>
                </div>
                
                <Button 
                  onClick={() => handlePlaySample(language)} 
                  variant="outline" 
                  className="w-full"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Play Sample
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageShowcase;
