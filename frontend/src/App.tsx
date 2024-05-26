import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  return (
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>The total amount you've spent</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{totalSpent}</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
    </Card>
  );
}

export default App;
