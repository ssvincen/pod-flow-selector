
import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid
} from '@mui/material';
import {
  Truck,
  Package,
  Calendar,
  MapPin,
  CheckCircle
} from 'lucide-react';
import SearchFiltersComponent from '../components/SearchFilters';
import ItemsList from '../components/ItemsList';
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
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Dispatch Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Search and manage dispatch items, create delivery PODs
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                <Package size={20} color="#1976d2" />
                <Box>
                  <Typography variant="caption" display="block">
                    Total Items
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {mockItems.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                <CheckCircle size={20} color="#2e7d32" />
                <Box>
                  <Typography variant="caption" display="block">
                    PODs Created
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {createdPODs.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      <SearchFiltersComponent
        branches={mockBranches}
        categories={mockCategories}
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {searchResults.length > 0 && (
        <ItemsList
          items={searchResults}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          onCreatePOD={handleCreatePOD}
        />
      )}

      {createdPODs.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recently Created PODs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {createdPODs.slice(-3).map((pod) => {
                const driver = mockDrivers.find(d => d.id === pod.driverId);
                const vehicle = mockVehicles.find(v => v.id === pod.vehicleId);
                
                return (
                  <Box
                    key={pod.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Package size={20} color="#1976d2" />
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {pod.podNumber}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {pod.items.length} items
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Truck size={16} color="#666" />
                        <Typography variant="body2">
                          {driver?.name} • {vehicle?.plateNumber}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Calendar size={16} color="#666" />
                        <Typography variant="body2">
                          {pod.estimatedDelivery}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip label={pod.status} color="primary" size="small" />
                  </Box>
                );
              })}
            </Box>
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
    </Container>
  );
};

export default DispatchManagement;
