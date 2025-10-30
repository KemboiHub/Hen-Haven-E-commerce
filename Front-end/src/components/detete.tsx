import React from 'react'

const detete = () => {
  return (
    <div>detete</div>
  )
}

export default detete
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronLeft } from 'lucide-react';

interface ContactSectionProps {
  goBack?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ goBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });