import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Truck,
  Package,
  Calendar,
  MapPin,
  CheckCircle
} from 'lucide-react';
import SearchFiltersComponent from '../components/SearchFilters';
import ItemsList from '../components/ItemsList';
import ItemsTable from '../components/ItemsTable';
import CreatePODDialog from '../components/CreatePODDialog';
import { mockBranches, mockCategories, mockItems, mockDrivers, mockVehicles } from '../data/mockData';

const DispatchManagement = () => {
  const [filters, setFilters] = useState({
    branchId: '',
    categoryId: '',
    startDate: '',
    endDate: ''
  });
  
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePOD, setShowCreatePOD] = useState(false);
  const [createdPODs, setCreatedPODs] = useState([]);
  const [viewMode, setViewMode] = useState(0); // 0 for cards, 1 for table

  const filteredItems = useMemo(() => {
    return mockItems.filter(item => {
      const matchesBranch = !filters.branchId || item.branchId === filters.branchId;
      const matchesCategory = !filters.categoryId || item.categoryId === filters.categoryId;
      const matchesStartDate = !filters.startDate || item.createdDate >= filters.startDate;
      const matchesEndDate = !filters.endDate || item.createdDate <= filters.endDate;
      
      return matchesBranch && matchesCategory && matchesStartDate && matchesEndDate;
    });
  }, [filters]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(filteredItems);
      setSelectedItems([]);
      setIsLoading(false);
      console.log(`Search completed. Found ${filteredItems.length} items matching criteria.`);
    }, 1000);
  };

  const handleItemSelect = (itemId, selected) => {
    if (selected) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedItems(searchResults.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCreatePOD = () => {
    if (selectedItems.length === 0) {
      console.log("No items selected for POD creation");
      return;
    }
    setShowCreatePOD(true);
  };

  const handlePODCreated = (pod) => {
    const newPOD = {
      ...pod,
      id: `pod-${Date.now()}`
    };
    
    setCreatedPODs(prev => [...prev, newPOD]);
    setSelectedItems([]);
    
    console.log(`POD ${newPOD.podNumber} created successfully with ${newPOD.items.length} items.`);
  };

  const selectedItemsData = searchResults.filter(item => selectedItems.includes(item.id));

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Dispatch Management</h1>
          <p className="text-muted-foreground">Search and manage dispatch items, create delivery PODs</p>
        </div>
        <div className="flex gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Package size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{mockItems.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <CheckCircle size={20} className="text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">PODs Created</p>
                <p className="text-2xl font-bold">{createdPODs.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SearchFiltersComponent
        branches={mockBranches}
        categories={mockCategories}
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {searchResults.length > 0 && (
        <Tabs defaultValue="cards" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cards">Card View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards">
            <ItemsList
              items={searchResults}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              onCreatePOD={handleCreatePOD}
            />
          </TabsContent>
          
          <TabsContent value="table">
            <ItemsTable
              items={searchResults}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              onSelectAll={handleSelectAll}
              onCreatePOD={handleCreatePOD}
            />
          </TabsContent>
        </Tabs>
      )}

      {createdPODs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Created PODs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {createdPODs.slice(-3).map((pod) => {
              const driver = mockDrivers.find(d => d.id === pod.driverId);
              const vehicle = mockVehicles.find(v => v.id === pod.vehicleId);
              
              return (
                <div
                  key={pod.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Package size={20} className="text-primary" />
                      <div>
                        <p className="font-medium">{pod.podNumber}</p>
                        <p className="text-sm text-muted-foreground">{pod.items.length} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-muted-foreground" />
                      <p className="text-sm">{driver?.name} • {vehicle?.plateNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <p className="text-sm">{pod.estimatedDelivery}</p>
                    </div>
                  </div>
                  <Badge>{pod.status}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <CreatePODDialog
        isOpen={showCreatePOD}
        onClose={() => setShowCreatePOD(false)}
        items={selectedItemsData}
        drivers={mockDrivers}
        vehicles={mockVehicles}
        onCreatePOD={handlePODCreated}
      />
    </div>
  );
};

export default DispatchManagement;
