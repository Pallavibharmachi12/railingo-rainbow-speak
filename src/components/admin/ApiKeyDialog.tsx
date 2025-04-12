
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ttsService } from "@/lib/tts";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (open) {
      const existingKey = ttsService.getApiKey();
      setApiKey(existingKey || "");
    }
  }, [open]);

  const handleSave = () => {
    onSave(apiKey);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>ElevenLabs API Configuration</DialogTitle>
          <DialogDescription>
            Enter your ElevenLabs API key to enable text-to-speech functionality for announcements.
            You can get an API key from{" "}
            <a
              href="https://elevenlabs.io/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              ElevenLabs website
            </a>
            .
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">ElevenLabs API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
              type="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
