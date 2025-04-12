
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Leaf, TrendingDown, Coins, Award } from "lucide-react";

const carbonData = [
  { month: "Jan", emissions: 124, credits: 20, reduction: 5 },
  { month: "Feb", emissions: 115, credits: 25, reduction: 7 },
  { month: "Mar", emissions: 118, credits: 22, reduction: 3 },
  { month: "Apr", emissions: 110, credits: 30, reduction: 8 },
  { month: "May", emissions: 105, credits: 35, reduction: 5 },
  { month: "Jun", emissions: 100, credits: 40, reduction: 5 },
];

const insightData = [
  { 
    id: 1, 
    title: "Transportation Reduction", 
    description: "Using public transit twice a week can reduce your carbon footprint by 15%", 
    impact: "High" 
  },
  { 
    id: 2, 
    title: "Energy Optimization", 
    description: "Smart home devices could save you 10% on energy consumption", 
    impact: "Medium" 
  },
  { 
    id: 3, 
    title: "Diet Adjustment", 
    description: "Reducing meat consumption by 30% could lower your footprint by 8%", 
    impact: "Medium" 
  },
];

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <Leaf className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 tons</div>
            <p className="text-xs text-muted-foreground">
              -12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Emission Reduction</CardTitle>
            <TrendingDown className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.5 tons</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
            <Coins className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35 credits</div>
            <p className="text-xs text-muted-foreground">
              Worth approx. $280
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72/100</div>
            <p className="text-xs text-muted-foreground">
              Top 15% in your region
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Emissions Trend</CardTitle>
            <CardDescription>
              Your monthly carbon footprint over time
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#82ca9d"
                  name="CO₂ Emissions (kg)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="credits"
                  stroke="#8884d8"
                  name="Carbon Credits"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Emission Reductions</CardTitle>
            <CardDescription>
              Carbon reduction results from your sustainability efforts
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="reduction"
                  name="CO₂ Reduction (kg)"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Insights</CardTitle>
          <CardDescription>
            Personalized recommendations based on your activity patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insightData.map((insight) => (
              <Card key={insight.id} className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    insight.impact === "High" ? "bg-emerald-100 text-emerald-800" :
                    insight.impact === "Medium" ? "bg-blue-100 text-blue-800" :
                    "bg-amber-100 text-amber-800"
                  }`}>
                    {insight.impact} Impact
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;
