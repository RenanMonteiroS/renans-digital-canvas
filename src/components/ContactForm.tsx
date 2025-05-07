
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/components/ui/use-toast';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.name} ${formData.surname}`,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      
      // Reset the form
      setFormData({
        name: '',
        surname: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.description'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="section-title mb-2">{t('contact.title')}</h2>
      <h3 className="text-2xl md:text-3xl font-serif text-center mb-8">{t('contact.subtitle')}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="name" className="sr-only">{t('contact.name')}</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="input-underline"
              placeholder={t('contact.name')} 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="surname" className="sr-only">{t('contact.surname')}</label>
            <input 
              type="text" 
              id="surname" 
              name="surname" 
              className="input-underline"
              placeholder={t('contact.surname')}
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="sr-only">{t('contact.email')}</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="input-underline"
            placeholder={t('contact.email')} 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="message" className="sr-only">{t('contact.message')}</label>
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            className="input-underline resize-none"
            placeholder={t('contact.message')}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="purple-button"
            disabled={isLoading}
          >
            {isLoading ? '...' : t('contact.send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
