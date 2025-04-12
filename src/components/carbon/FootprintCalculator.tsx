
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Car, Home, ShoppingBag, Utensils, Plane } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FootprintCalculator = () => {
  const { toast } = useToast();
  const [transportationScore, setTransportationScore] = useState<number>(0);
  const [homeScore, setHomeScore] = useState<number>(0);
  const [foodScore, setFoodScore] = useState<number>(0);
  const [calculatedFootprint, setCalculatedFootprint] = useState<number | null>(null);

  const handleCalculate = () => {
    // In a real application, this would use AI models to calculate actual carbon footprint
    const totalFootprint = (transportationScore * 0.5) + (homeScore * 0.3) + (foodScore * 0.2);
    setCalculatedFootprint(totalFootprint);
    
    toast({
      title: "Carbon Footprint Calculated",
      description: `Your estimated carbon footprint is ${totalFootprint.toFixed(2)} tons of CO2 per year.`,
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint Calculator</CardTitle>
          <CardDescription>
            Our AI model analyzes your lifestyle data to estimate your carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transportation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transportation" className="flex items-center gap-2">
                <Car className="h-4 w-4" /> Transportation
              </TabsTrigger>
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="h-4 w-4" /> Home & Energy
              </TabsTrigger>
              <TabsTrigger value="food" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" /> Food & Consumption
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transportation" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vehicle-type">Primary vehicle type</Label>
                  <RadioGroup defaultValue="car" id="vehicle-type" className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="car" id="car" />
                      <Label htmlFor="car">Car</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid/Electric</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public Transit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bicycle" id="bicycle" />
                      <Label htmlFor="bicycle">Bicycle/Walking</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="km-per-week">
                    Weekly distance traveled (km): {transportationScore * 10}
                  </Label>
                  <Slider 
                    id="km-per-week"
                    min={0} 
                    max={20} 
                    step={1}
                    value={[transportationScore]} 
                    onValueChange={(value) => setTransportationScore(value[0])} 
                    className="mt-2" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="flights-per-year">Annual flights taken</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline" size="icon" onClick={() => setTransportationScore(Math.max(0, transportationScore - 1))}>-</Button>
                    <span className="w-8 text-center">{Math.round(transportationScore / 2)}</span>
                    <Button variant="outline" size="icon" onClick={() => setTransportationScore(Math.min(20, transportationScore + 1))}>+</Button>
                    <Plane className="h-4 w-4 ml-2 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="home" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="energy-source">Primary energy source</Label>
                  <RadioGroup defaultValue="mixed" id="energy-source" className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="renewable" id="renewable" />
                      <Label htmlFor="renewable">Renewable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed" />
                      <Label htmlFor="mixed">Mixed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fossil" id="fossil" />
                      <Label htmlFor="fossil">Fossil Fuels</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unknown" id="unknown" />
                      <Label htmlFor="unknown">Unknown</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="household-size">Household size</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline" size="icon" onClick={() => setHomeScore(Math.max(0, homeScore - 1))}>-</Button>
                    <span className="w-8 text-center">{Math.round(homeScore / 4) + 1}</span>
                    <Button variant="outline" size="icon" onClick={() => setHomeScore(Math.min(20, homeScore + 1))}>+</Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="home-energy">
                    Monthly energy usage (kWh): {homeScore * 50 + 200}
                  </Label>
                  <Slider 
                    id="home-energy"
                    min={0} 
                    max={20} 
                    step={1}
                    value={[homeScore]} 
                    onValueChange={(value) => setHomeScore(value[0])} 
                    className="mt-2" 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="food" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="diet-type">Primary diet</Label>
                  <RadioGroup defaultValue="mixed" id="diet-type" className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegan" id="vegan" />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegetarian" id="vegetarian" />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed-diet" />
                      <Label htmlFor="mixed-diet">Mixed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="meat" id="meat" />
                      <Label htmlFor="meat">Meat-Heavy</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="local-food">
                    Percentage of locally sourced food: {foodScore * 5}%
                  </Label>
                  <Slider 
                    id="local-food"
                    min={0} 
                    max={20} 
                    step={1}
                    value={[foodScore]} 
                    onValueChange={(value) => setFoodScore(value[0])} 
                    className="mt-2" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="food-waste">
                    Weekly food waste level
                  </Label>
                  <RadioGroup defaultValue="medium" id="food-waste" className="grid grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low-waste" />
                      <Label htmlFor="low-waste">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium-waste" />
                      <Label htmlFor="medium-waste">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high-waste" />
                      <Label htmlFor="high-waste">High</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCalculate} className="w-full">
            Calculate Carbon Footprint
          </Button>
        </CardFooter>
      </Card>

      {calculatedFootprint !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Your Carbon Footprint Results
              <span className={
                calculatedFootprint < 5 ? "text-emerald-500" :
                calculatedFootprint < 10 ? "text-amber-500" :
                "text-red-500"
              }>
                {calculatedFootprint.toFixed(2)} tons CO₂/year
              </span>
            </CardTitle>
            <CardDescription>
              Based on AI analysis of your lifestyle data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How you compare</h4>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min(calculatedFootprint * 5, 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 tons (Excellent)</span>
                  <span>10 tons (Average)</span>
                  <span>20+ tons (High)</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">AI Recommendation</h4>
                <p className="text-sm text-muted-foreground">
                  {calculatedFootprint < 5 
                    ? "Your carbon footprint is excellent! To further reduce, consider investing in renewable energy for your home."
                    : calculatedFootprint < 10 
                    ? "You're doing better than average! Try reducing meat consumption and flying less to lower your footprint further."
                    : "Your carbon footprint is higher than average. Focus on switching to public transport and reducing energy consumption at home."}
                </p>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  View Detailed Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FootprintCalculator;
