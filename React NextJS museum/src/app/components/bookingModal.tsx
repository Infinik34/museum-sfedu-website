'use client';

import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Checkbox } from '@heroui/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    groupSize: 1,
    comment: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Ошибка отправки');

      setSuccess(true);
      setFormData({
        name: '', email: '', phone: '', date: '', groupSize: 1, comment: '', consent: false,
      });
      
      // Закрыть модалку через 2 сек после успеха
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Запись на экскурсию
              <span className="text-sm font-normal text-gray-500">Политехнический музей ЮФУ</span>
            </ModalHeader>
            
            <ModalBody>
              {success ? (
                <div className="text-center py-8 text-green-600">
                  ✅ Заявка успешно отправлена!<br />
                  <span className="text-sm text-gray-500">Мы свяжемся с вами в ближайшее время.</span>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="ФИО *"
                      placeholder="Иванов Иван Иванович"
                      isRequired
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <Input
                      label="Email *"
                      type="email"
                      placeholder="example@mail.ru"
                      isRequired
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <Input
                      label="Телефон *"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      isRequired
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    <Input
                      label="Дата посещения *"
                      type="date"
                      isRequired
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                    />
                    <Input
                      label="Количество человек *"
                      type="number"
                      min={1}
                      max={30}
                      value={formData.groupSize}
                      onChange={(e) => handleChange('groupSize', Number(e.target.value))}
                    />
                  </div>
                  
                  <Textarea
                    label="Комментарий"
                    placeholder="Пожелания по теме экскурсии, особые потребности..."
                    className="mt-2"
                    value={formData.comment}
                    onChange={(e) => handleChange('comment', e.target.value)}
                  />
                  
                  <Checkbox
                    isSelected={formData.consent}
                    onValueChange={(checked) => handleChange('consent', checked)}
                    isRequired
                    className="mt-4"
                  >
                    <span className="text-xs text-gray-600">
                      Я согласен на обработку{' '}
                      <a href="/privacy" className="text-museum-blue hover:underline" target="_blank">
                        персональных данных
                      </a>{' '}
                      в соответствии с 152-ФЗ
                    </span>
                  </Checkbox>
                </>
              )}
            </ModalBody>
            
            {!success && (
              <ModalFooter>
                <Button variant="primary" onPress={onClose} isDisabled={loading}>
                  Отмена
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  isLoading={loading}
                  isDisabled={!formData.consent || loading}
                >
                  Отправить заявку
                </Button>
              </ModalFooter>
            )}
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}