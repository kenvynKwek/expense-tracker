import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col bg-background max-w-xs m-auto gap-y-5">
        <Button className="text-foreground" onClick={() => setCount((count) => count + 1)}>
          up
        </Button>
        <Button variant="secondary" onClick={() => setCount((count) => count - 1)}>
          down
        </Button>
        <p>
          {count}
        </p>
      </div>
    </>
  )
}

export default App
