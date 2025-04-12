
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Train, TrainStatus } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dataService } from "@/lib/data";
import { ChevronDown, Clock } from "lucide-react";

interface TrainsTableProps {
  trains: Train[];
  onStatusChange: (trainId: string, newStatus: TrainStatus) => void;
}

const TrainsTable: React.FC<TrainsTableProps> = ({ trains, onStatusChange }) => {
  if (trains.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-background">
        <p className="text-muted-foreground">No trains found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Train #</TableHead>
            <TableHead>Train Name</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trains.map((train) => (
            <TableRow key={train.id}>
              <TableCell className="font-medium">{train.trainNumber}</TableCell>
              <TableCell>{train.trainName}</TableCell>
              <TableCell>
                {train.source} → {train.destination}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>
                    {train.scheduledArrival} - {train.scheduledDeparture}
                  </span>
                </div>
              </TableCell>
              <TableCell>{train.platform}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${dataService.getStatusColor(
                    train.status
                  )}`}
                >
                  {dataService.getStatusText(train.status)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <span>Update Status</span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "ON_TIME")}>
                      On Time
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "ARRIVING")}>
                      Arriving
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "ARRIVED")}>
                      Arrived
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "DEPARTING")}>
                      Departing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "DEPARTED")}>
                      Departed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "DELAYED")}>
                      Delayed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "PLATFORM_CHANGED")}>
                      Platform Changed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(train.id, "CANCELLED")}>
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainsTable;
