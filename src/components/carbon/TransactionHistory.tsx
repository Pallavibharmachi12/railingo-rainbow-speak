
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "purchase" | "sale" | "retire";
  project: string;
  amount: number;
  price: number;
  status: "confirmed" | "pending" | "failed";
  blockchainId: string;
}

const transactions: Transaction[] = [
  {
    id: "tx-0012",
    date: "2025-04-10",
    type: "purchase",
    project: "Solar Farm Initiative",
    amount: 5,
    price: 12.5,
    status: "confirmed",
    blockchainId: "0x8f7d4569c5a2e03ec5295213c5b3b61196a19d23"
  },
  {
    id: "tx-0011",
    date: "2025-04-05",
    type: "retire",
    project: "Reforestation Project",
    amount: 3,
    price: 8.75,
    status: "confirmed",
    blockchainId: "0x3a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
  },
  {
    id: "tx-0010",
    date: "2025-04-01",
    type: "purchase",
    project: "Wind Energy Collective",
    amount: 10,
    price: 10.25,
    status: "confirmed",
    blockchainId: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
  },
  {
    id: "tx-0009",
    date: "2025-03-28",
    type: "purchase",
    project: "Methane Capture",
    amount: 2,
    price: 15.75,
    status: "failed",
    blockchainId: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9"
  },
  {
    id: "tx-0008",
    date: "2025-03-22",
    type: "sale",
    project: "Sustainable Agriculture",
    amount: 4,
    price: 9.5,
    status: "confirmed",
    blockchainId: "0x7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7"
  },
  {
    id: "tx-0007", 
    date: "2025-03-15",
    type: "retire",
    project: "Reforestation Project",
    amount: 8,
    price: 8.75,
    status: "confirmed",
    blockchainId: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"
  },
];

const TransactionHistory = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and verify all your blockchain-recorded carbon credit transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="retirements">Retirements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <TransactionTable transactions={transactions} />
            </TabsContent>
            
            <TabsContent value="purchases" className="mt-6">
              <TransactionTable transactions={transactions.filter(t => t.type === "purchase")} />
            </TabsContent>
            
            <TabsContent value="sales" className="mt-6">
              <TransactionTable transactions={transactions.filter(t => t.type === "sale")} />
            </TabsContent>
            
            <TabsContent value="retirements" className="mt-6">
              <TransactionTable transactions={transactions.filter(t => t.type === "retire")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Carbon Credit Certificates</CardTitle>
          <CardDescription>
            Download verification certificates for your retired carbon credits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .filter(t => t.type === "retire" && t.status === "confirmed")
                  .map(transaction => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">CERT-{transaction.id.split('-')[1]}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.project}</TableCell>
                      <TableCell>{transaction.amount} tons</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Certificate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Generate Annual Carbon Offset Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge variant={
                    transaction.type === "purchase" ? "outline" : 
                    transaction.type === "sale" ? "secondary" : 
                    "default"
                  }>
                    {transaction.type === "purchase" ? "Purchase" : 
                     transaction.type === "sale" ? "Sale" : 
                     "Retirement"}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.project}</TableCell>
                <TableCell>{transaction.amount} tons</TableCell>
                <TableCell>${(transaction.amount * transaction.price).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={
                    transaction.status === "confirmed" ? "default" : 
                    transaction.status === "pending" ? "outline" : 
                    "destructive"
                  }>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
