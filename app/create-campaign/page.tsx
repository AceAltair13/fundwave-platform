"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';

import { createCampaign } from '@/lib/contractUtils';
import { contract } from '@/lib/smartcontract';

import { Loader } from '@/components/loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { BitcoinIcon } from 'lucide-react';

const CreateCampaign = () => {
  const account = useActiveAccount();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, target, deadline, image } = form;

    if (!title || !description || !target || !deadline || !image) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (!account) {
      alert('No account connected');
      return;
    }

    setIsLoading(true);

    try {
      await createCampaign({ form, account, _contract: contract });
      setForm({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
      });
      router.push('/');
    } catch (error) {
      console.error('Error submitting campaign:', error);
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
    );
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
            <InputField
              id="name"
              label="Your Wallet Address"
              value={account?.address || 'Fetching wallet address...'}
              onChange={() => { }}
              disabled
            />
            <InputField
              id="title"
              label="Campaign Title *"
              placeholder="Write a title"
              value={form.title}
              onChange={handleInputChange}
            />
            <TextareaField
              id="description"
              label="Story *"
              placeholder="Write your story"
              value={form.description}
              onChange={handleInputChange}
            />
            <CampaignInfoMessage />
            <InputField
              id="target"
              label="Goal *"
              placeholder="ETH 0.50"
              value={form.target}
              onChange={handleInputChange}
            />
            <InputField
              id="deadline"
              label="End Date *"
              type="date"
              value={form.deadline}
              onChange={handleInputChange}
            />
            <InputField
              id="image"
              label="Campaign Image"
              placeholder="Place image URL of your campaign"
              type="url"
              value={form.image}
              onChange={handleInputChange}
            />
            {form.image && (
              <img src={form.image} alt="Campaign Image Preview" className='w-full h-48 object-cover rounded-md' />
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
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}

const InputField = ({ id, label, placeholder, value, onChange, disabled = false, type = "text" }: InputFieldProps) => (
  <div className='space-y-1'>
    <Label htmlFor={id} className='text-sm font-medium'>{label}</Label>
    <Input id={id} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} type={type} />
  </div>
);

const TextareaField = ({ id, label, placeholder, value, onChange }: { id: string; label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
  <div className='space-y-1'>
    <Label htmlFor={id} className='text-sm font-medium'>{label}</Label>
    <Textarea id={id} placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);

const CampaignInfoMessage = () => (
  <div className="w-full mx-auto flex items-center justify-center space-x-3 bg-green-50 border border-green-200 px-4 py-3 rounded-lg shadow-sm">
    <BitcoinIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
    <p className="text-lg font-bold text-green-800">You will get 100% of the raised amount</p>
  </div>
);

export default CreateCampaign;