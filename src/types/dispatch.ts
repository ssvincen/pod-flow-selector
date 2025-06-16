
export interface Branch {
  id: string;
  name: string;
  code: string;
}

export interface DispatchCategory {
  id: string;
  name: string;
  description: string;
}

export interface DispatchItem {
  id: string;
  itemName: string;
  quantity: number;
  weight: number;
  destination: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Assigned' | 'In Transit' | 'Delivered';
  branchId: string;
  categoryId: string;
  createdDate: string;
  customerName: string;
  address: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  status: 'Available' | 'Busy' | 'Off Duty';
  rating: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  capacity: number;
  status: 'Available' | 'In Use' | 'Maintenance';
  fuelLevel: number;
}

export interface POD {
  id: string;
  podNumber: string;
  driverId: string;
  vehicleId: string;
  items: DispatchItem[];
  status: 'Created' | 'In Progress' | 'Completed';
  createdDate: string;
  estimatedDelivery: string;
  totalWeight: number;
  totalItems: number;
}

export interface SearchFilters {
  branchId: string;
  categoryId: string;
  startDate: string;
  endDate: string;
}
