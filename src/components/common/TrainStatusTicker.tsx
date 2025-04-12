
import React from "react";
import { dataService } from "@/lib/data";
import { Train } from "@/types";

interface TrainStatusTickerProps {
  trains: Train[];
}

const TrainStatusTicker: React.FC<TrainStatusTickerProps> = ({ trains }) => {
  if (!trains || trains.length === 0) {
    return null;
  }

  // Duplicate train data to create a seamless loop effect
  const duplicatedTrains = [...trains, ...trains];

  return (
    <div className="ticker-container py-2 bg-secondary/50 border-y overflow-hidden">
      <div className="ticker-content whitespace-nowrap animate-ticker inline-block">
        {duplicatedTrains.map((train, index) => (
          <div key={`${train.id}-${index}`} className="inline-flex items-center mr-10">
            <span className="font-medium">{train.trainNumber}</span>
            <span className="mx-2 font-medium">{train.trainName}</span>
            <span className="mx-2">
              {train.source} → {train.destination}
            </span>
            <span className="mr-2">
              Platform: {train.platform}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${dataService.getStatusColor(train.status)}`}>
              {dataService.getStatusText(train.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainStatusTicker;
