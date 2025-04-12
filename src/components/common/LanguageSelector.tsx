
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { dataService } from "@/lib/data";
import { Language } from "@/types";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const languages: Language[] = ["english", "hindi", "telugu"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{dataService.getLanguageFlag(selectedLanguage)}</span>
          <span>{dataService.getLanguageName(selectedLanguage)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => onLanguageChange(language)}
            className={`flex items-center gap-2 ${
              selectedLanguage === language ? "font-bold bg-primary/10" : ""
            }`}
          >
            <span>{dataService.getLanguageFlag(language)}</span>
            <span>{dataService.getLanguageName(language)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
