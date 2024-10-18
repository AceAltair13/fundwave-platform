import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BitcoinIcon } from 'lucide-react'

const CreateCampaign = () => {

  return (
    <Card className='max-w-2xl mx-auto p-6 shadow-md'>
      <CardHeader className='pb-4 text-center'>
        <h1 className='text-2xl font-bold'>Start a Campaign</h1>
      </CardHeader>

      <form>
        <CardContent className='space-y-4'>
          {/* Your Name Field */}
          <div className='space-y-1'>
            <Label htmlFor='name' className='text-sm font-medium'>Your Name *</Label>
            <Input
              id='name'
              placeholder='John Doe'
              // value={}
              // onChange={}
            />
          </div>

          {/* Campaign Title Field */}
          <div className='space-y-1'>
            <Label htmlFor='title' className='text-sm font-medium'>Campaign Title *</Label>
            <Input
              id='title'
              placeholder='Write a title'
              // value={}
              // onChange={}
            />
          </div>

          {/* Story Field */}
          <div className='space-y-1'>
            <Label htmlFor='description' className='text-sm font-medium'>Story *</Label>
            <Textarea
              id='description'
              placeholder='Write your story'
              // value={}
              // onChange={}
            />
          </div>

          {/* Icon & Message */}
          <div className='flex items-center justify-center space-y-3 bg-green-100 py-4 rounded-md'>
            <BitcoinIcon size={25} color='green' />
            <h4 className='text-lg font-bold text-green-800'>You will get 100% of the raised amount</h4>
          </div>

          {/* Goal Field */}
          <div className='space-y-1'>
            <Label htmlFor='target' className='text-sm font-medium'>Goal *</Label>
            <Input
              id='target'
              placeholder='ETH 0.50'
              // value={}
              // onChange={}
            />
          </div>

          {/* End Data Field */}
          <div className='space-y-1'>
            <Label htmlFor='deadline' className='text-sm font-medium'>End Date *</Label>
            <Input
              id='deadline'
              type='date'
              // value={}
              // onChange={}
            />
          </div>

          {/* Campaign Image Field */}
          <div className='space-y-1'>
            <Label htmlFor='image' className='text-sm font-medium'>Campaign Image</Label>
            <Input
              id='image'
              placeholder='Place image URL of your campaign'
              type='url'
              // value={form.image}
              // onChange={}
            />
          </div>
        </CardContent>

        <CardFooter className='pt-6'>
          <Button type='submit' className='w-full bg-green-600 hover:bg-green-700 text-white'>Submit New Campaign</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CreateCampaign;