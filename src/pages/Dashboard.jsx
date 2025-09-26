import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';
import { podData, dispatchItemsData } from '../data/podData';

const Dashboard = () => {
  // Calculate key metrics
  const metrics = useMemo(() => {
    const totalPODs = podData.length;
    const deliveredPODs = podData.filter(pod => pod.isDelivered).length;
    const inTransitPODs = podData.filter(pod => pod.deliveryStatus === 'In Transit').length;
    const uploadedPODs = podData.filter(pod => pod.deliveryStatus === 'Uploaded').length;
    
    const deliveryRate = Math.round((deliveredPODs / totalPODs) * 100);
    
    const totalItems = dispatchItemsData.length;
    const pendingItems = dispatchItemsData.filter(item => item.status === 'Pending').length;
    const inTransitItems = dispatchItemsData.filter(item => item.status === 'InTransit').length;
    
    return {
      totalPODs,
      deliveredPODs,
      inTransitPODs,
      uploadedPODs,
      deliveryRate,
      totalItems,
      pendingItems,
      inTransitItems
    };
  }, []);

  // Status distribution data for pie chart
  const statusDistribution = useMemo(() => {
    const statusCounts = podData.reduce((acc, pod) => {
      acc[pod.deliveryStatus] = (acc[pod.deliveryStatus] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: Math.round((count / podData.length) * 100)
    }));
  }, []);

  // Delivery timeline data
  const deliveryTimeline = useMemo(() => {
    const timelineData = podData.reduce((acc, pod) => {
      const date = pod.estimatedDelivery;
      if (!acc[date]) {
        acc[date] = { date, delivered: 0, inTransit: 0, uploaded: 0 };
      }
      
      if (pod.deliveryStatus === 'Delivered') acc[date].delivered++;
      else if (pod.deliveryStatus === 'In Transit') acc[date].inTransit++;
      else if (pod.deliveryStatus === 'Uploaded') acc[date].uploaded++;
      
      return acc;
    }, {});
    
    return Object.values(timelineData).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, []);

  // Branch performance data
  const branchPerformance = useMemo(() => {
    const branchData = podData.reduce((acc, pod) => {
      const branchId = pod.sourceBranchId;
      if (!acc[branchId]) {
        acc[branchId] = { 
          branchId, 
          total: 0, 
          delivered: 0, 
          inTransit: 0,
          uploaded: 0
        };
      }
      
      acc[branchId].total++;
      if (pod.deliveryStatus === 'Delivered') acc[branchId].delivered++;
      else if (pod.deliveryStatus === 'In Transit') acc[branchId].inTransit++;
      else if (pod.deliveryStatus === 'Uploaded') acc[branchId].uploaded++;
      
      return acc;
    }, {});
    
    return Object.values(branchData)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10) // Top 10 branches
      .map(branch => ({
        ...branch,
        successRate: Math.round((branch.delivered / branch.total) * 100)
      }));
  }, []);

  const COLORS = {
    'Delivered': '#22c55e',
    'Uploaded': '#3b82f6', 
    'In Transit': '#f59e0b',
    'Draft': '#6b7280'
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">POD Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights into delivery performance and operations</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total PODs</p>
                <p className="text-2xl font-bold">{metrics.totalPODs}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4">
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Active deliveries</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold text-green-600">{metrics.deliveryRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4">
              <Progress value={metrics.deliveryRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{metrics.deliveredPODs}/{metrics.totalPODs} completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.inTransitPODs}</p>
              </div>
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-4">
              <Progress value={Math.round((metrics.inTransitPODs / metrics.totalPODs) * 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Active shipments</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{metrics.totalItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4">
              <Progress value={Math.round(((metrics.totalItems - metrics.pendingItems) / metrics.totalItems) * 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{metrics.pendingItems} pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Delivery Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#6b7280'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {statusDistribution.map((status) => (
                <div key={status.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[status.name] || '#6b7280' }}
                  />
                  <span className="text-sm">{status.name}: {status.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Delivery Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Daily Delivery Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deliveryTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="delivered" 
                    stackId="1"
                    stroke={COLORS.Delivered} 
                    fill={COLORS.Delivered}
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="uploaded" 
                    stackId="1"
                    stroke={COLORS.Uploaded} 
                    fill={COLORS.Uploaded}
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="inTransit" 
                    stackId="1"
                    stroke={COLORS['In Transit']} 
                    fill={COLORS['In Transit']}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Top Branch Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branchId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="delivered" fill={COLORS.Delivered} name="Delivered" />
                <Bar dataKey="uploaded" fill={COLORS.Uploaded} name="Uploaded" />
                <Bar dataKey="inTransit" fill={COLORS['In Transit']} name="In Transit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent POD Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {podData.slice(-5).reverse().map((pod) => (
              <div key={pod.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{pod.podNumber}</p>
                      <p className="text-sm text-muted-foreground">Branch {pod.sourceBranchId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(pod.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={pod.deliveryStatus === 'Delivered' ? 'default' : 'secondary'}
                    className={
                      pod.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                      pod.deliveryStatus === 'In Transit' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }
                  >
                    {pod.deliveryStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;