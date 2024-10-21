"use client";

import { Loader } from '@/components/loader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createCampaign } from '@/lib/contractUtils';
import { contract } from '@/lib/smartcontract';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { BitcoinIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';

const CreateCampaign = () => {

  const account = useActiveAccount();

  const defaultFormState = {
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  }

  // State for form field
  const [form, setForm] = useState(defaultFormState);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handling input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value })
  }

  // Handling form submissions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Performing form validation
    if (!form.title || !form.description || !form.target || !form.deadline || !form.image) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      setIsLoading(true);

      console.log('Form submitted:', form);

      if (!account) {
        throw new Error("No account connected");
      }

      await createCampaign({
        form: form,
        account: account,
        _contract: contract
      })

      // Reseting form after successful submission
      setForm(defaultFormState);

      // Redirect to campaign page
      setIsLoading(false);
      redirect('/view-campaign/');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };


  if (!account) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired or you have not logged into a wallet. Please log in again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      {isLoading && <Loader />}
      <Card className='max-w-2xl mx-auto p-6 shadow-md'>
        <CardHeader className='pb-4 text-center'>
          <h1 className='text-2xl font-bold'>Start a Campaign</h1>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            {/* Your Name Field */}
            <div className='space-y-1'>
              <Label htmlFor='name' className='text-sm font-medium'>Your Wallet Address</Label>
              <Input
                id='name'
                placeholder='Fetching wallet address...'
                value={account?.address}
                onChange={handleInputChange}
                disabled
              />
            </div>

            {/* Campaign Title Field */}
            <div className='space-y-1'>
              <Label htmlFor='title' className='text-sm font-medium'>Campaign Title *</Label>
              <Input
                id='title'
                placeholder='Write a title'
                value={form.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Story Field */}
            <div className='space-y-1'>
              <Label htmlFor='description' className='text-sm font-medium'>Story *</Label>
              <Textarea
                id='description'
                placeholder='Write your story'
                value={form.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Icon & Message */}
            <div className="w-full mx-auto flex items-center justify-center space-x-3 bg-green-50 border border-green-200 px-4 py-3 rounded-lg shadow-sm">
              <BitcoinIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
              <p className="text-lg font-bold text-green-800">
                You will get 100% of the raised amount
              </p>
            </div>

            {/* Goal Field */}
            <div className='space-y-1'>
              <Label htmlFor='target' className='text-sm font-medium'>Goal *</Label>
              <Input
                id='target'
                placeholder='ETH 0.50'
                value={form.target}
                onChange={handleInputChange}
              />
            </div>

            {/* End Data Field */}
            <div className='space-y-1'>
              <Label htmlFor='deadline' className='text-sm font-medium'>End Date *</Label>
              <Input
                id='deadline'
                type='date'
                value={form.deadline}
                onChange={handleInputChange}
              />
            </div>

            {/* Campaign Image Field */}
            <div className='space-y-1'>
              <Label htmlFor='image' className='text-sm font-medium'>Campaign Image</Label>
              <Input
                id='image'
                placeholder='Place image URL of your campaign'
                type='url'
                value={form.image}
                onChange={handleInputChange}
              />
            </div>
            {/* Campaign Image Preview */}
            {form.image && (
              <img src={form.image} alt='Campaign Image Preview' className='w-full h-48 object-cover rounded-md' />
            )}
          </CardContent>

          <CardFooter className='pt-6'>
            <Button type='submit' className='w-full bg-green-600 hover:bg-green-700 text-white'>
              {isLoading ? 'Submitting...' : 'Submit New Campaign'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

export default CreateCampaign;