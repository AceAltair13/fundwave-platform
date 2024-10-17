import { ThirdwebProvider } from "thirdweb/react";
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <ThirdwebProvider>
      <h1>Hello World!</h1>
      <Button>Click Me</Button>
    </ThirdwebProvider>
  );
}
