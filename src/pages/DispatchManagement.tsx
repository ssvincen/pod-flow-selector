
import React, { useState, useMemo } from 'react';
import { Truck, Package, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import SearchFiltersComponent from '../components/SearchFilters';
import ItemsList from '../components/ItemsList';
import CreatePODDialog from '../components/CreatePODDialog';
import { SearchFilters, DispatchItem, POD } from '../types/dispatch';
import { mockBranches, mockCategories, mockItems, mockDrivers, mockVehicles } from '../data/mockData';

const DispatchManagement: React.FC = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<SearchFilters>({
    branchId: '',
    categoryId: '',
    startDate: '',
    endDate: ''
  });
  
  const [searchResults, setSearchResults] = useState<DispatchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePOD, setShowCreatePOD] = useState(false);
  const [createdPODs, setCreatedPODs] = useState<POD[]>([]);

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
    // Simulate API call
    setTimeout(() => {
      setSearchResults(filteredItems);
      setSelectedItems([]);
      setIsLoading(false);
      
      toast({
        title: "Search completed",
        description: `Found ${filteredItems.length} items matching your criteria.`,
      });
    }, 1000);
  };

  const handleItemSelect = (itemId: string, selected: boolean) => {
    if (selected) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleCreatePOD = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to create a POD.",
        variant: "destructive"
      });
      return;
    }
    setShowCreatePOD(true);
  };

  const handlePODCreated = (pod: Omit<POD, 'id'>) => {
    const newPOD: POD = {
      ...pod,
      id: `pod-${Date.now()}`
    };
    
    setCreatedPODs(prev => [...prev, newPOD]);
    setSelectedItems([]);
    
    toast({
      title: "POD created successfully!",
      description: `POD ${newPOD.podNumber} has been created with ${newPOD.items.length} items.`,
    });
  };

  const selectedItemsData = searchResults.filter(item => selectedItems.includes(item.id));

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dispatch Management</h1>
            <p className="text-muted-foreground">Search and manage dispatch items, create delivery PODs</p>
          </div>
          <div className="flex items-center gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Items</p>
                  <p className="text-2xl font-bold">{mockItems.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">PODs Created</p>
                  <p className="text-2xl font-bold">{createdPODs.length}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Search Filters */}
        <SearchFiltersComponent
          branches={mockBranches}
          categories={mockCategories}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Results */}
        {searchResults.length > 0 && (
          <ItemsList
            items={searchResults}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}
            onCreatePOD={handleCreatePOD}
          />
        )}

        {/* Recent PODs */}
        {createdPODs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recently Created PODs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {createdPODs.slice(-3).map((pod) => {
                  const driver = mockDrivers.find(d => d.id === pod.driverId);
                  const vehicle = mockVehicles.find(v => v.id === pod.vehicleId);
                  
                  return (
                    <div key={pod.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{pod.podNumber}</p>
                            <p className="text-sm text-muted-foreground">{pod.items.length} items</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{driver?.name} • {vehicle?.plateNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{pod.estimatedDelivery}</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {pod.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create POD Dialog */}
        <CreatePODDialog
          isOpen={showCreatePOD}
          onClose={() => setShowCreatePOD(false)}
          items={selectedItemsData}
          drivers={mockDrivers}
          vehicles={mockVehicles}
          onCreatePOD={handlePODCreated}
        />
      </div>
    </div>
  );
};

export default DispatchManagement;
