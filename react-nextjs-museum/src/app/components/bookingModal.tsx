// 'use client';

// import { useState } from 'react';
// import {
//   Modal,
//   Button,
//   TextField,
//   Label,
//   Input,
//   Checkbox,
//   Spinner
// } from '@heroui/react';

// interface BookingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     date: '',
//     groupSize: 1,
//     comment: '',
//     consent: false,
//   });

//   const handleChange = (field: string, value: string | boolean | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch('/api/booking', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Ошибка отправки');

//       setSuccess(true);
//       setFormData({
//         name: '', email: '', phone: '', date: '', groupSize: 1, comment: '', consent: false,
//       });

//       setTimeout(() => {
//         setSuccess(false);
//         onClose();
//       }, 2000);

//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={(open) => !open && onClose()}
      
//     >
//       <Modal.Backdrop variant="blur">
//         <Modal.Container size="lg">
//           <Modal.Dialog className="bg-museum-dark text-white border border-gray-800 rounded-xl shadow-2xl">
//             <form onSubmit={handleSubmit} className="flex flex-col h-full">
//               <Modal.Header className="pb-4 border-b border-gray-800">
//                 <span className="text-xl font-bold font-serif text-white block">Запись на экскурсию</span>
//                 <span className="text-sm font-normal text-gray-400 block mt-1">Политехнический музей ЮФУ</span>
//               </Modal.Header>

//               <Modal.Body className="py-6 space-y-5 overflow-y-auto max-h-[70vh]">
//                 {success ? (
//                   <div className="text-center py-10">
//                     <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
//                       <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
//                     </div>
//                     <h3 className="text-lg font-semibold text-white mb-2">Заявка отправлена!</h3>
//                     <p className="text-gray-400 text-sm">Мы свяжемся с вами в ближайшее время.</p>
//                   </div>
//                 ) : (
//                   <>
//                     {error && (
//                       <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
//                         {error}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <TextField className="w-full" isRequired>
//                         <Label className="text-gray-400">ФИО *</Label>
//                         <Input
//                           placeholder="Иванов Иван Иванович"
//                           value={formData.name}
//                           onChange={(e) => handleChange('name', e.target.value)}
//                         />
//                       </TextField>

//                       <TextField className="w-full" type="email">
//                         <Label className="text-gray-400">Email</Label>
//                         <Input
//                           placeholder="example@mail.ru"
//                           value={formData.email}
//                           onChange={(e) => handleChange('email', e.target.value)}
//                         />
//                       </TextField>

//                       <TextField className="w-full" isRequired>
//                         <Label className="text-gray-400">Телефон *</Label>
//                         <Input
//                           type="tel"
//                           placeholder="+7 (___) ___-__-__"
//                           value={formData.phone}
//                           onChange={(e) => handleChange('phone', e.target.value)}
//                         />
//                       </TextField>

//                       <TextField className="w-full" isRequired>
//                         <Label className="text-gray-400">Дата посещения *</Label>
//                         <Input
//                           type="date"
//                           min={new Date().toISOString().split('T')[0]}
//                           value={formData.date}
//                           onChange={(e) => handleChange('date', e.target.value)}
//                         />
//                       </TextField>
//                     </div>

//                     <TextField className="w-full">
//                       <Label className="text-gray-400">Комментарий / Кол-во человек</Label>
//                       <Input
//                         placeholder="Например: группа из 5 школьников..."
//                         value={formData.comment}
//                         onChange={(e) => handleChange('comment', e.target.value)}
//                       />
//                     </TextField>

//                     <Checkbox
//                       isSelected={formData.consent}
//                       onChange={(checked) => handleChange('consent', checked)}
//                       className="mt-0.5 shrink-0"
//                     >
//                       <Checkbox.Content>
//                         <span className="text-xs text-gray-400 cursor-pointer select-none leading-tight">
//                           Я согласен на обработку{' '}
//                           <a href="/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noreferrer">
//                             персональных данных
//                           </a>{' '}
//                           в соответствии с 152-ФЗ *
//                         </span>
//                       </Checkbox.Content>
//                     </Checkbox>
//                   </>
//                 )}
//               </Modal.Body>

//               {!success && (
//                 <Modal.Footer className="pt-4 border-t border-gray-800">
//                   <Button
//                     variant="tertiary"
//                     onPress={onClose}
//                     isDisabled={loading}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     Отмена
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="primary"
//                     isDisabled={!formData.consent || loading}
//                     className="bg-teal-600 hover:bg-teal-500 text-white min-w-[120px]"
//                   >
//                     {loading ? (
//                       <>
//                         <Spinner size="sm" color="current" className="mr-2" />
//                         Отправка...
//                       </>
//                     ) : (
//                       'Отправить заявку'
//                     )}
//                   </Button>
//                 </Modal.Footer>
//               )}
//             </form>
//           </Modal.Dialog>
//         </Modal.Container>
//       </Modal.Backdrop>
//     </Modal>
//   );
// }