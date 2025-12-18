import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  Building2,
  FileText,
  Send,
  Loader2
} from 'lucide-react';

export default function App() { // Renamed to 'App' to match main.jsx
  const [step, setStep] = useState('entry'); // entry | loading | insight | success
  const [formData, setFormData] = useState({
    businessName: '',
    businessSummary: '',
    industry: '',
    monthlyBudget: '',
    email: '',
    name: ''
  });

  // Personalization helper functions
  const getIndustrySpecificStats = (industry) => {
    const stats = {
      'services': { waste: '45-55%', primaryChannel: 'referrals and local SEO' },
      'local': { waste: '50-60%', primaryChannel: 'Google Business Profile and local directories' },
      'ecommerce': { waste: '35-45%', primaryChannel: 'social media and email marketing' },
      'b2b': { waste: '40-50%', primaryChannel: 'LinkedIn outreach and content marketing' },
      'saas': { waste: '30-40%', primaryChannel: 'content marketing and product-led growth' }
    };
    return stats[industry] || { waste: '40-50%', primaryChannel: 'digital marketing' };
  };

  const getIndustrySpecificActions = (industry, businessName) => {
    const actions = {
      'services': [
        `Ask your top 3 clients at ${businessName} for referrals this week`,
        'Post a before/after transformation story',
        'Optimize your Google My Business listing with fresh photos'
      ],
      'local': [
        'Ask 10 happy customers to leave Google reviews',
        'Post a local community event you’re hosting',
        'Update your Yelp profile with new photos and offers'
      ],
      'ecommerce': [
        'Email past customers with a limited-time comeback offer',
        'Post user-generated content of customers using your products',
        'Optimize your product pages for search terms'
      ],
      'b2b': [
        'Reach out to 5 LinkedIn connections with value-first messages',
        'Share a client case study with measurable results',
        'Optimize your LinkedIn profile for your target industry'
      ],
      'saas': [
        'Offer a free trial extension to inactive users',
        'Publish a helpful tutorial video for your software',
        'Optimize your onboarding flow to reduce churn'
      ]
    };
    return actions[industry] || [
      'Ask 10 happy customers for referrals',
      'Post one customer success story',
      'Optimize your Google listing'
    ];
  };

  const getPersonalizedIntro = (businessName, industry) => {
    const industryIntros = {
      'services': `${businessName} and other service businesses are losing 45-55% of marketing budget on the wrong channels. Most service providers waste money on broad advertising instead of leveraging their existing client relationships.`,
      'local': `${businessName} and similar local businesses typically waste 50-60% of their marketing effort trying to compete locally instead of dominating locally. Local businesses often overspend on broad social media ads instead of local SEO and community engagement.`,
      'ecommerce': `${businessName} and other e-commerce stores are throwing away 35-45% of their ad spend on cold traffic that doesn't convert. Most stores focus on acquisition instead of retention and referral strategies.`,
      'b2b': `${businessName} and B2B companies like yours are burning 40-50% of their budget on mass marketing instead of targeted account-based approaches. B2B companies often waste resources on broad awareness campaigns instead of focused prospect nurturing.`,
      'saas': `${businessName} and other SaaS companies typically waste 30-40% of growth budget on acquisition channels with poor unit economics. SaaS businesses often chase vanity metrics instead of sustainable growth levers.`
    };
    
    return industryIntros[industry] || `${businessName} and businesses like yours typically waste 40-50% of marketing budget on ineffective channels.`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setStep('loading');
    setTimeout(() => setStep('insight'), 2200);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/send-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          businessName: formData.businessName,
          industry: formData.industry,
          businessSummary: formData.businessSummary,
          intro: personalizedIntro,
          actions: industryActions,
        })
      });

      if (!res.ok) throw new Error('Email failed');
      setStep('success');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please check if your backend is running.');
    }
  };

  // Get personalized content
  const industryStats = getIndustrySpecificStats(formData.industry);
  const industryActions = getIndustrySpecificActions(formData.industry, formData.businessName);
  const personalizedIntro = getPersonalizedIntro(formData.businessName, formData.industry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find the fastest way to get your next 50 customers — without wasting ad money
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answer a few quick questions and get a personalized customer acquisition strategy 
            specifically for the <strong>Achievers Network</strong> — in under 2 minutes.
          </p>
        </div>

        {/* ENTRY STATE */}
        {step === 'entry' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Let's understand your business</h2>
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Business Name</label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="w-full pl-10 py-2 border rounded-lg text-gray-900 bg-white"
                      placeholder="My Awesome Business"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Industry</label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-900 bg-white"
                  >
                    <option value="">Select industry…</option>
                    <option value="services">Services</option>
                    <option value="local">Local Business</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="b2b">B2B</option>
                    <option value="saas">SaaS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-900 bg-white"
                  placeholder="Founder Name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Describe your business in one sentence</label>
                <div className="relative mt-1">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    required
                    value={formData.businessSummary}
                    onChange={(e) => handleInputChange('businessSummary', e.target.value)}
                    className="w-full pl-10 py-2 border rounded-lg text-gray-900 bg-white"
                    placeholder="I help people with..."
                  />
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                Generate My Strategy <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* LOADING STATE */}
        {step === 'loading' && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Building your strategy…</h3>
            <p className="text-gray-600">Analyzing your business • Filtering high-ROI channels</p>
          </div>
        )}

        {/* INSIGHT STATE */}
        {step === 'insight' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-yellow-900">Here's the Reality for {formData.businessName}</h3>
              <p className="text-yellow-800 mt-2">{personalizedIntro}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">3 quick actions you can take this week</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {industryActions.map((action, index) => <li key={index}>{action}</li>)}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Get the Full Blueprint</h3>
              <p className="mb-4">We'll send the detailed 30-day plan and templates to your inbox.</p>
              <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                  placeholder="your@email.com"
                />
                <button className="bg-white text-purple-600 px-6 rounded-lg font-semibold">Send</button>
              </form>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {step === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-900">Blueprint Sent!</h3>
            <p className="text-green-800 mt-2">Welcome to the Furst Spark journey to 50,000 businesses.</p>
          </div>
        )}

      </div>
    </div>
  );
}