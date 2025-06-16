
import React, { useState } from 'react';
import { Truck, User, Package, Calendar, MapPin, Star, Fuel, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DispatchItem, Driver, Vehicle, POD } from '../types/dispatch';

interface CreatePODDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items: DispatchItem[];
  drivers: Driver[];
  vehicles: Vehicle[];
  onCreatePOD: (pod: Omit<POD, 'id'>) => void;
}

const CreatePODDialog: React.FC<CreatePODDialogProps> = ({
  isOpen,
  onClose,
  items,
  drivers,
  vehicles,
  onCreatePOD
}) => {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const availableDrivers = drivers.filter(d => d.status === 'Available');
  const availableVehicles = vehicles.filter(v => v.status === 'Available');

  const canCreatePOD = selectedDriverId && selectedVehicleId && estimatedDelivery;

  const handleCreatePOD = () => {
    if (!canCreatePOD) return;

    const podNumber = `POD-${Date.now()}`;
    const newPOD: Omit<POD, 'id'> = {
      podNumber,
      driverId: selectedDriverId,
      vehicleId: selectedVehicleId,
      items,
      status: 'Created',
      createdDate: new Date().toISOString().split('T')[0],
      estimatedDelivery,
      totalWeight,
      totalItems
    };

    onCreatePOD(newPOD);
    onClose();
  };

  const resetForm = () => {
    setSelectedDriverId('');
    setSelectedVehicleId('');
    setEstimatedDelivery('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Create Proof of Delivery (POD)
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Items Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Items Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Items:</span>
                    <span className="font-medium">{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Weight:</span>
                    <span className="font-medium">{totalWeight.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Number of Deliveries:</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Items List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <p className="font-medium text-sm">{item.itemName}</p>
                        <p className="text-xs text-muted-foreground">{item.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{item.quantity} pcs</p>
                        <p className="text-xs text-muted-foreground">{item.weight} kg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Driver and Vehicle Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Driver</Label>
              <Select value={selectedDriverId} onValueChange={setSelectedDriverId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a driver" />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{driver.name}</span>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{driver.rating}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDriver && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Driver Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License:</span>
                      <span>{selectedDriver.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{selectedDriver.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedDriver.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {selectedDriver.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label>Select Vehicle</Label>
              <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {availableVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{vehicle.plateNumber}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {vehicle.type} • {vehicle.capacity}kg
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedVehicle && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Vehicle Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedVehicle.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span>{selectedVehicle.capacity} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Level:</span>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3" />
                        <span>{selectedVehicle.fuelLevel}%</span>
                      </div>
                    </div>
                    {totalWeight > selectedVehicle.capacity && (
                      <div className="flex items-center gap-1 text-red-600 text-xs">
                        <Weight className="h-3 w-3" />
                        Warning: Load exceeds vehicle capacity
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery Date</Label>
              <div className="relative">
                <Input
                  id="estimatedDelivery"
                  type="date"
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreatePOD}
            disabled={!canCreatePOD}
            className="bg-green-600 hover:bg-green-700"
          >
            <Package className="h-4 w-4 mr-2" />
            Create POD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePODDialog;
