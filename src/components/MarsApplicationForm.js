"use client";

import React, { useState } from 'react';
import { RocketIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';

const MarsApplicationForm = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    // Stage 1: Personal Information
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    
    // Stage 2: Travel Preferences
    departureDate: '',
    returnDate: '',
    accommodation: '',
    specialRequests: '',
    
    // Stage 3: Health and Safety
    healthDeclaration: false,
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalConditions: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\(\d{3}\)-\d{3}-\d{4}$/.test(phone);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return `(${phoneNumber}`;
    if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const validateStage = (stage) => {
    const newErrors = {};

    if (stage === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.nationality) newErrors.nationality = 'Nationality is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone format';
    }
    
    else if (stage === 2) {
      if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
      if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
      if (!formData.accommodation) newErrors.accommodation = 'Accommodation preference is required';
    }
    
    else if (stage === 3) {
      if (!formData.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
      else if (!validatePhone(formData.emergencyContactPhone)) newErrors.emergencyContactPhone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone' || name === 'emergencyContactPhone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNext = () => {
    if (validateStage(currentStage)) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStage(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStage(currentStage)) {
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="Enter your full name"
        />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Date of Birth *</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
        />
        {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Nationality *</label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="Enter your nationality"
        />
        {errors.nationality && <span className="text-red-500 text-sm">{errors.nationality}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="Enter your email"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="(123)-456-7890"
          maxLength={14}
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
      </div>
    </div>
  );

  const renderTravelPreferences = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Departure Date *</label>
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
        />
        {errors.departureDate && <span className="text-red-500 text-sm">{errors.departureDate}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Return Date *</label>
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
        />
        {errors.returnDate && <span className="text-red-500 text-sm">{errors.returnDate}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Accommodation Preference *</label>
        <select
          name="accommodation"
          value={formData.accommodation}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
        >
          <option value="">Select accommodation</option>
          <option value="space-hotel">Space Hotel</option>
          <option value="martian-base">Martian Base</option>
        </select>
        {errors.accommodation && <span className="text-red-500 text-sm">{errors.accommodation}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="Enter any special requests"
          rows="4"
        />
      </div>
    </div>
  );

  const renderHealthSafety = () => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="healthDeclaration"
            checked={formData.healthDeclaration}
            onChange={handleInputChange}
            className="rounded"
          />
          <span className="block text-sm font-medium text-gray-900 mb-1">I declare that I am in good health and fit for space travel *</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Emergency Contact Name *</label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="Enter emergency contact name"
        />
        {errors.emergencyContactName && <span className="text-red-500 text-sm">{errors.emergencyContactName}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Emergency Contact Phone *</label>
        <input
          type="tel"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="(123)-456-7890"
          maxLength={14}
        />
        {errors.emergencyContactPhone && <span className="text-red-500 text-sm">{errors.emergencyContactPhone}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Medical Conditions</label>
        <textarea
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-900"
          placeholder="List any medical conditions (if applicable)"
          rows="4"
        />
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Application Submitted Successfully!</h2>
          <p className="text-gray-600">Thank you for applying to visit Mars. We will review your application and contact you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <RocketIcon className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-800">Mars Visit Application</h1>
        </div>
        
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((stage) => (
            <div
              key={stage}
              className={`flex-1 h-2 ${
                stage < currentStage
                  ? 'bg-blue-500'
                  : stage === currentStage
                  ? 'bg-blue-200'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {currentStage === 1 && 'Personal Information'}
          {currentStage === 2 && 'Travel Preferences'}
          {currentStage === 3 && 'Health and Safety'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStage === 1 && renderPersonalInfo()}
        {currentStage === 2 && renderTravelPreferences()}
        {currentStage === 3 && renderHealthSafety()}

        <div className="flex justify-between pt-4">
          {currentStage > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </button>
          )}
          
          {currentStage < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 ml-auto"
            >
              Next
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 ml-auto"
            >
              Submit Application
              <CheckCircleIcon className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MarsApplicationForm;