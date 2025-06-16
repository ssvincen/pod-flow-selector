
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Package, Users, BarChart3, ArrowRight, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Package className="h-8 w-8 text-blue-600" />,
      title: "Smart Item Filtering",
      description: "Filter dispatch items by branch, category, and date range with powerful search capabilities."
    },
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      title: "POD Management",
      description: "Create Proof of Delivery documents with driver and vehicle assignment in seconds."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Resource Allocation",
      description: "Assign available drivers and vehicles based on capacity, location, and availability."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Real-time Tracking",
      description: "Monitor dispatch operations with live status updates and delivery tracking."
    }
  ];

  const stats = [
    {
      icon: <Package className="h-5 w-5 text-blue-600" />,
      label: "Active Dispatches",
      value: "247",
      trend: "+12%"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      label: "Completed PODs",
      value: "1,834",
      trend: "+8%"
    },
    {
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      label: "Avg. Delivery Time",
      value: "2.4h",
      trend: "-15%"
    },
    {
      icon: <MapPin className="h-5 w-5 text-purple-600" />,
      label: "Coverage Areas",
      value: "4",
      trend: "0%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Truck className="h-4 w-4" />
            Dispatch Management System
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Streamline Your Dispatch Operations
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Efficiently manage dispatch items, create PODs, and assign drivers and vehicles 
            with our comprehensive dispatch management platform.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/dispatch')}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.trend.startsWith('+') ? 'text-green-600' : 
                    stat.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage your dispatch operations efficiently and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to optimize your dispatch operations?</h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Start managing your dispatch items, creating PODs, and assigning resources with our intuitive platform.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/dispatch')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Launch Dispatch Manager
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
