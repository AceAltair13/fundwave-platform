import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CountBoxProps {
  title: string
  value: string | number
}

export function CountBox({ title, value }: CountBoxProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm">{title}</p>
      </CardContent>
    </Card>
  )
}