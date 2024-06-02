import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api"
import {
  useQuery,
} from '@tanstack/react-query'

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get()
  if (!res.ok) { // if response not okay
    throw new Error("Server error")
  }
  const data = await res.json()
  return data
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent
  })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>The total amount you've spent</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{isPending ? "..." : data.total}</p>
    </CardContent>
    </Card>
  );
}

export default App;
