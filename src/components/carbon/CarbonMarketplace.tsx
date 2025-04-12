
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreditListing {
  id: number;
  project: string;
  location: string;
  amount: number;
  price: number;
  verified: boolean;
  trend: "up" | "down" | "stable";
  description: string;
}

const marketListings: CreditListing[] = [
  {
    id: 1,
    project: "Solar Farm Initiative",
    location: "Karnataka, India",
    amount: 50,
    price: 12.5,
    verified: true,
    trend: "up",
    description: "Credits from a 50MW solar farm replacing coal power generation"
  },
  {
    id: 2,
    project: "Reforestation Project",
    location: "Amazon, Brazil",
    amount: 120,
    price: 8.75,
    verified: true,
    trend: "stable",
    description: "Carbon sequestration through native forest restoration"
  },
  {
    id: 3,
    project: "Wind Energy Collective",
    location: "Tamil Nadu, India",
    amount: 85,
    price: 10.25,
    verified: true,
    trend: "up",
    description: "Community-owned wind turbines generating clean electricity"
  },
  {
    id: 4,
    project: "Methane Capture",
    location: "Punjab, India",
    amount: 30,
    price: 15.75,
    verified: false,
    trend: "down",
    description: "Capturing and utilizing methane from agricultural waste"
  },
  {
    id: 5,
    project: "Sustainable Agriculture",
    location: "Gujarat, India",
    amount: 65,
    price: 9.5,
    verified: true,
    trend: "up",
    description: "Regenerative farming practices reducing emissions and improving soil health"
  }
];

const CarbonMarketplace = () => {
  const { toast } = useToast();
  const [listings, setListings] = useState<CreditListing[]>(marketListings);
  const [selectedListing, setSelectedListing] = useState<CreditListing | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);
  
  const handlePurchase = (listing: CreditListing) => {
    setSelectedListing(listing);
  };
  
  const confirmPurchase = () => {
    if (!selectedListing) return;
    
    // In a real app, this would connect to a blockchain transaction
    toast({
      title: "Transaction Initiated",
      description: `Purchasing ${purchaseAmount} carbon credits from ${selectedListing.project}`,
    });
    
    // Simulate blockchain confirmation
    setTimeout(() => {
      toast({
        title: "Transaction Confirmed",
        description: `Successfully purchased ${purchaseAmount} carbon credits for $${(selectedListing.price * purchaseAmount).toFixed(2)}`,
      });
      
      // Update available credits
      setListings(listings.map(item => 
        item.id === selectedListing.id 
          ? {...item, amount: Math.max(0, item.amount - purchaseAmount)} 
          : item
      ));
      
      setSelectedListing(null);
      setPurchaseAmount(1);
    }, 2000);
  };
  
  const cancelPurchase = () => {
    setSelectedListing(null);
    setPurchaseAmount(1);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Carbon Credit Marketplace
            <Badge variant="outline" className="ml-2">Blockchain Powered</Badge>
          </CardTitle>
          <CardDescription>
            Purchase verified carbon credits from sustainable projects worldwide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Available Credits</TableHead>
                  <TableHead>Price (USD)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {listing.project}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{listing.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>{listing.location}</TableCell>
                    <TableCell>{listing.amount} tons</TableCell>
                    <TableCell className="flex items-center">
                      ${listing.price.toFixed(2)}
                      {listing.trend === "up" && <TrendingUp className="h-4 w-4 ml-2 text-emerald-500" />}
                      {listing.trend === "down" && <TrendingDown className="h-4 w-4 ml-2 text-red-500" />}
                    </TableCell>
                    <TableCell>
                      {listing.verified ? (
                        <Badge variant="default" className="bg-emerald-500">Verified</Badge>
                      ) : (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePurchase(listing)}
                        disabled={listing.amount === 0}
                      >
                        {listing.amount > 0 ? "Purchase" : "Sold Out"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedListing && (
        <Card>
          <CardHeader>
            <CardTitle>Purchase Carbon Credits</CardTitle>
            <CardDescription>
              From {selectedListing.project} ({selectedListing.location})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="credit-amount">Number of Credits (tons of CO₂)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setPurchaseAmount(Math.max(1, purchaseAmount - 1))}
                  >
                    -
                  </Button>
                  <Input 
                    id="credit-amount"
                    type="number" 
                    value={purchaseAmount} 
                    onChange={(e) => setPurchaseAmount(Math.min(selectedListing.amount, Math.max(1, parseInt(e.target.value) || 1)))} 
                    className="w-24 text-center" 
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setPurchaseAmount(Math.min(selectedListing.amount, purchaseAmount + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <span>Price per credit:</span>
                  <span>${selectedListing.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity:</span>
                  <span>{purchaseAmount} credits</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Blockchain network fee:</span>
                  <span>$0.25</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${(selectedListing.price * purchaseAmount + 0.25).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="w-full" onClick={cancelPurchase}>
              Cancel
            </Button>
            <Button className="w-full" onClick={confirmPurchase}>
              Confirm Purchase
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Carbon Credit Portfolio</CardTitle>
          <CardDescription>
            Track your carbon credit investments and their impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Credits Owned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45 tons</div>
                  <p className="text-xs text-muted-foreground">
                    Market value: $472.50
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Credits Retired</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23 tons</div>
                  <p className="text-xs text-muted-foreground">
                    Offset against your footprint
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Net Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-500">+20 tons</div>
                  <p className="text-xs text-muted-foreground">
                    You're carbon positive!
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">About Carbon Credits</h4>
              <p className="text-sm text-muted-foreground">
                Carbon credits represent one ton of carbon dioxide that has been reduced, avoided, or sequestered. 
                By purchasing credits, you fund projects that reduce greenhouse gas emissions and help combat climate change.
                All transactions are recorded on blockchain for transparency and verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Creating Label component since we're using it in this file
const Label = ({ htmlFor, children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { htmlFor: string }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}
    {...props}
  >
    {children}
  </label>
);

export default CarbonMarketplace;
