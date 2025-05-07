
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const FeaturedProject: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userIP, setUserIP] = useState('');
  const [userOrigin, setUserOrigin] = useState('');
  const [sessionId, setSessionId] = useState('');

  // Get user origin information and generate UUID when component mounts
  useEffect(() => {
    // Generate a UUID for this session
    setSessionId(uuidv4());
    
    // Get origin (hostname, protocol, etc)
    const origin = window.location.origin;
    setUserOrigin(origin);
    
    // Fetch the user's public IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIP(data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a message',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch('https://pipes.renanmonteiro.com.br/webhook/n8n_portfolio_invoker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: message,
          origin: userOrigin,
          userIP: userIP || 'unknown',
          sessionId: sessionId
        }),
      });
      
      const data = await res.json();
      // Extract and display only the output value if it exists
      const outputValue = data.output || data;
      setResponse(typeof outputValue === 'string' ? outputValue : JSON.stringify(outputValue, null, 2));
      toast({
        title: 'Success',
        description: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Error sending webhook:', error);
      setResponse('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-12 border-y border-gray-200">
      <h2 className="section-title mb-10">{t('featured.title')}</h2>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-50 p-6">
          <p className="mb-4">{t('featured.description')}</p>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('featured.placeholder')}
            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-0 focus:border-purple mb-4"
            rows={4}
          />
          <button 
            className="purple-button"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? '...' : t('featured.send')}
          </button>
          
          {response && (
            <div className="mt-6">
              <p className="font-medium mb-2">{t('featured.response')}</p>
              <div className="bg-gray-100 p-4 overflow-auto max-h-64 w-full">
                <pre className="text-xs whitespace-pre-wrap">{response}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
