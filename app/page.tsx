'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { AlertCircle, DollarSign, Home, Check, Building2, Bath, Bed, MapPin } from 'lucide-react';
import ClientOnly from './components/ClientOnly';
import { getRentalRateByZip } from '@/data/rental-rates';
import Image from 'next/image';
import Link from 'next/link';

const PROPERTY_TYPE_MULTIPLIER = {
  apartment: 1.0,
  house: 1.2,
  condo: 1.1
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo container */}
          <div className="flex items-center">
            {/* Replace the text with your logo image */}
            <Image 
              src="/your-logo.jpg"  // Put your logo file in the public folder
              alt="Furnished Finder" 
              width={150} 
              height={40} 
              priority
            />
          </div>
          
          {/* Optional: Right side items */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://www.furnishedfinder.com/members/pm-dashboard" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600"
              >
                Sign In
              </Button>
            </Link>
            <Link 
              href="https://www.furnishedfinder.com/list-your-property"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const EarningsEstimator = () => {
  const [formData, setFormData] = useState({
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'apartment',
    email: '',
    phone: '',
    amenities: [],
  });

  const [showEstimate, setShowEstimate] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const calculateEarnings = (data: any) => {
    // Get rental rate data for the ZIP code
    const rentalRate = getRentalRateByZip(data.zipCode);
    
    // Calculate base monthly rate
    let monthlyRate = rentalRate.baseRate * Number(data.bedrooms);
    
    // Apply property type multiplier
    monthlyRate *= PROPERTY_TYPE_MULTIPLIER[data.propertyType as keyof typeof PROPERTY_TYPE_MULTIPLIER];
    
    // Adjust for number of bathrooms (5% increase per bathroom)
    monthlyRate *= (1 + (Number(data.bathrooms) * 0.05));
    
    // Apply occupancy rate
    monthlyRate *= rentalRate.occupancyRate;

    // Calculate platform-specific rates and fees
    const furnishedFinderRate = {
      monthlyGross: monthlyRate,
      annualFee: 179,
      monthlyNet: monthlyRate - (179 / 12)
    };

    // Airbnb: 3% host fee + 12% traveler service fee
    const airbnbRate = {
      monthlyGross: monthlyRate,
      hostFees: monthlyRate * 0.03,  // 3% host fee
      serviceFees: monthlyRate * 0.12,  // 12% traveler service fee
      totalFees: monthlyRate * 0.15,  // Combined fees (3% + 12%)
      monthlyNet: monthlyRate * 0.85  // Net after all fees (100% - 15%)
    };

    // Vrbo: 8% host fee + 12% traveler service fee
    const vrboRate = {
      monthlyGross: monthlyRate,
      hostFees: monthlyRate * 0.08,  // 8% host fee
      serviceFees: monthlyRate * 0.12,  // 12% traveler service fee
      totalFees: monthlyRate * 0.20,  // Combined fees (8% + 12%)
      monthlyNet: monthlyRate * 0.80  // Net after all fees (100% - 20%)
    };

    return {
      furnishedFinder: furnishedFinderRate,
      competitors: {
        airbnb: airbnbRate,
        vrbo: vrboRate
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and phone
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!formData.phone || !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      // Submit form data to API route
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Calculate earnings after successful form submission
      const earnings = calculateEarnings(formData);
      setEstimate(earnings);
      setEmailSubmitted(true);
      setShowEstimate(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Main Section - Flex container for headline and calculator */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start min-h-[80vh]">
          {/* Left Side - Headline and Description */}
          <div className="lg:w-1/2 lg:sticky lg:top-8 space-y-6 lg:pt-20">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Maximize Your <span className="text-blue-600">Rental Income</span> with Furnished Finder
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Join thousands of property owners earning more with longer-term rentals. 
              Calculate your potential earnings and see how we compare to other platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">No booking fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Quality tenants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Longer stays</span>
              </div>
            </div>
          </div>

          {/* Right Side - Calculator */}
          <div className="lg:w-1/2">
            {/* Main Calculator Card */}
            <Card className="overflow-hidden shadow-lg border-0">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                <CardTitle className="text-2xl font-bold text-white text-center">
                  Earnings Calculator
                </CardTitle>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="relative">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          ZIP Code
                        </label>
                        <Input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="Enter ZIP code"
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="relative">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          Property Type
                        </label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full mt-1 p-2 border rounded-md"
                        >
                          <option value="apartment">Apartment</option>
                          <option value="house">House</option>
                          <option value="condo">Condo</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Bed className="w-4 h-4 text-blue-600" />
                          Bedrooms
                        </label>
                        <Input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          min="0"
                          className="mt-1"
                        />
                      </div>

                      <div className="relative">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Bath className="w-4 h-4 text-blue-600" />
                          Bathrooms
                        </label>
                        <Input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          min="0"
                          step="0.5"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="mt-1"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      We'll send your detailed earnings report to this email address.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-lg relative overflow-hidden transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        Calculating...
                      </div>
                    ) : (
                      'Calculate Potential Earnings'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section - Only show when there are results */}
        {emailSubmitted && estimate && (
          <div className="space-y-8 animate-fadeIn mt-16">
            {/* Earnings Comparison */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  Your Potential Monthly Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-600">Furnished Finder</h3>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <DollarSign className="text-blue-600 w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(estimate.furnishedFinder.monthlyNet)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Monthly Net Income</p>
                    <div className="mt-4 p-2 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        Only {formatCurrency(estimate.furnishedFinder.annualFee)} annual fee
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-700">Airbnb</h3>
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Home className="text-gray-600 w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-700">
                      {formatCurrency(estimate.competitors.airbnb.monthlyNet)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Monthly Net Income</p>
                    <div className="mt-4 space-y-2">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          -{formatCurrency(estimate.competitors.airbnb.hostFees)} host fees
                        </p>
                      </div>
                      <div className="p-2 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          -{formatCurrency(estimate.competitors.airbnb.serviceFees)} service fees
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-700">Vrbo</h3>
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Home className="text-gray-600 w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-700">
                      {formatCurrency(estimate.competitors.vrbo.monthlyNet)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Monthly Net Income</p>
                    <div className="mt-4 space-y-2">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          -{formatCurrency(estimate.competitors.vrbo.hostFees)} host fees
                        </p>
                      </div>
                      <div className="p-2 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          -{formatCurrency(estimate.competitors.vrbo.serviceFees)} service fees
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Why Property Owners Choose Furnished Finder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <DollarSign className="text-blue-600 w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Simple Pricing</h4>
                    <p className="text-gray-600">
                      Just $179 annual listing fee - no hidden charges or booking fees.
                    </p>
                  </div>

                  <div className="p-6 bg-green-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Building2 className="text-green-600 w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Quality Tenants</h4>
                    <p className="text-gray-600">
                      Connect with traveling nurses, corporate travelers, and digital nomads.
                    </p>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="text-purple-600 w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Stable Income</h4>
                    <p className="text-gray-600">
                      Average stays of 3+ months mean less turnover and consistent income.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Maximize Your Rental Income?
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Join thousands of property owners already earning more with Furnished Finder
              </p>
              <Link 
                href="https://www.furnishedfinder.com/list-your-property"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  List Your Property Now
                </Button>
              </Link>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Market Insights */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="text-blue-600" />
                    Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Average Stay Duration</span>
                      <span className="text-blue-600 font-semibold">3+ months</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Occupancy Rate</span>
                      <span className="text-blue-600 font-semibold">85%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Typical Tenant Type</span>
                      <span className="text-blue-600 font-semibold">Healthcare Professionals</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitive Advantages */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="text-green-600" />
                    Platform Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Direct Communication</h4>
                        <p className="text-sm text-gray-600">Chat directly with potential tenants</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Verified Tenants</h4>
                        <p className="text-sm text-gray-600">Professional background checks included</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Support Team</h4>
                        <p className="text-sm text-gray-600">24/7 dedicated customer service</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600">How does the annual fee work?</h4>
                    <p className="text-gray-600">Pay once and list your property for a full year. No additional fees or commissions on bookings.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600">What type of tenants will I get?</h4>
                    <p className="text-gray-600">Primarily healthcare professionals, traveling nurses, and corporate travelers seeking mid-term stays.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600">How do I get paid?</h4>
                    <p className="text-gray-600">Receive payments directly from tenants through our secure payment system or arrange your preferred method.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600">What support do I receive?</h4>
                    <p className="text-gray-600">Access to 24/7 customer service, tenant screening tools, and a dedicated property success team.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">S</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah M.</h4>
                      <p className="text-sm text-gray-600">Property Owner in Denver</p>
                    </div>
                  </div>
                  <p className="text-gray-700">"Switched from short-term rentals to Furnished Finder and doubled my net income. The longer stays mean less work for me too!"</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-green-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xl">J</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">John R.</h4>
                      <p className="text-sm text-gray-600">Property Owner in Austin</p>
                    </div>
                  </div>
                  <p className="text-gray-700">"The quality of tenants is outstanding. Having healthcare professionals as long-term guests gives me peace of mind."</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-xl">M</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Maria L.</h4>
                      <p className="text-sm text-gray-600">Property Owner in Seattle</p>
                    </div>
                  </div>
                  <p className="text-gray-700">"The flat annual fee makes such a difference in my profits. No more watching my earnings disappear to booking fees!"</p>
                </CardContent>
              </Card>
            </div>

            {/* Final Call to Action Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2">
                {/* Left side - Content */}
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      List Your Property Today
                    </h3>
                    <p className="text-gray-600">
                      Take advantage of our simple pricing and start earning more with quality, long-term tenants.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Maximize Your Income</h4>
                        <p className="text-sm text-gray-600">Keep more of your rental income</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Professional Tenants</h4>
                        <p className="text-sm text-gray-600">Connect with healthcare professionals</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Check className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Simple Pricing</h4>
                        <p className="text-sm text-gray-600">Just $179 per year, no hidden fees</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link 
                      href="https://www.furnishedfinder.com/list-your-property"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-lg font-semibold transition-all duration-300"
                      >
                        Get Started Now
                      </Button>
                    </Link>
                    <p className="text-center text-sm text-gray-500 mt-4">
                      30-day satisfaction guarantee
                    </p>
                  </div>
                </div>

                {/* Right side - Gradient */}
                <div className="relative h-64 md:h-auto bg-gradient-to-r from-blue-600 to-blue-800">
                  <div className="absolute inset-0 flex flex-col justify-center p-8 text-white space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold">
                        Your Potential Earnings
                      </h3>
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-4xl font-bold">
                          {formatCurrency(estimate.furnishedFinder.monthlyNet)}
                        </p>
                        <p className="text-sm text-blue-100">Estimated Monthly Net Income</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-300" />
                          <span>No booking fees or commissions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-300" />
                          <span>Longer stays, less turnover</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-300" />
                          <span>Direct communication with tenants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default function Page() {
  return (
    <ClientOnly>
      <EarningsEstimator />
    </ClientOnly>
  );
}