
import { Branch, DispatchCategory, DispatchItem, Driver, Vehicle } from '../types/dispatch';

export const mockBranches: Branch[] = [
  { id: '1', name: 'Downtown Branch', code: 'DT001' },
  { id: '2', name: 'North Branch', code: 'NB002' },
  { id: '3', name: 'South Branch', code: 'SB003' },
  { id: '4', name: 'East Branch', code: 'EB004' },
];

export const mockCategories: DispatchCategory[] = [
  { id: '1', name: 'Electronics', description: 'Electronic items and components' },
  { id: '2', name: 'Furniture', description: 'Furniture and home appliances' },
  { id: '3', name: 'Documents', description: 'Important documents and papers' },
  { id: '4', name: 'Medical', description: 'Medical supplies and equipment' },
  { id: '5', name: 'Food & Beverages', description: 'Perishable goods' },
];

export const mockItems: DispatchItem[] = [
  {
    id: '1',
    itemName: 'Laptop Computer',
    quantity: 2,
    weight: 5.5,
    destination: '123 Tech Street',
    priority: 'High',
    status: 'Pending',
    branchId: '1',
    categoryId: '1',
    createdDate: '2024-06-15',
    customerName: 'John Smith',
    address: '123 Tech Street, Downtown'
  },
  {
    id: '2',
    itemName: 'Office Chair',
    quantity: 1,
    weight: 15.0,
    destination: '456 Business Ave',
    priority: 'Medium',
    status: 'Pending',
    branchId: '1',
    categoryId: '2',
    createdDate: '2024-06-14',
    customerName: 'Sarah Johnson',
    address: '456 Business Ave, Downtown'
  },
  {
    id: '3',
    itemName: 'Legal Documents',
    quantity: 1,
    weight: 0.5,
    destination: '789 Law Firm Plaza',
    priority: 'High',
    status: 'Pending',
    branchId: '2',
    categoryId: '3',
    createdDate: '2024-06-16',
    customerName: 'Michael Brown',
    address: '789 Law Firm Plaza, North District'
  },
  {
    id: '4',
    itemName: 'Medical Equipment',
    quantity: 3,
    weight: 25.0,
    destination: '321 Hospital Road',
    priority: 'High',
    status: 'Pending',
    branchId: '2',
    categoryId: '4',
    createdDate: '2024-06-15',
    customerName: 'Dr. Emily Davis',
    address: '321 Hospital Road, North District'
  },
  {
    id: '5',
    itemName: 'Fresh Produce',
    quantity: 10,
    weight: 50.0,
    destination: '654 Restaurant Row',
    priority: 'High',
    status: 'Pending',
    branchId: '3',
    categoryId: '5',
    createdDate: '2024-06-16',
    customerName: 'Chef Marco',
    address: '654 Restaurant Row, South District'
  }
];

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Robert Wilson',
    licenseNumber: 'DL001234',
    phone: '+1-555-0101',
    status: 'Available',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Lisa Anderson',
    licenseNumber: 'DL005678',
    phone: '+1-555-0102',
    status: 'Available',
    rating: 4.9
  },
  {
    id: '3',
    name: 'David Martinez',
    licenseNumber: 'DL009012',
    phone: '+1-555-0103',
    status: 'Busy',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Jennifer Taylor',
    licenseNumber: 'DL003456',
    phone: '+1-555-0104',
    status: 'Available',
    rating: 4.6
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: 'VAN-001',
    type: 'Delivery Van',
    capacity: 1000,
    status: 'Available',
    fuelLevel: 85
  },
  {
    id: '2',
    plateNumber: 'TRK-002',
    type: 'Small Truck',
    capacity: 2000,
    status: 'Available',
    fuelLevel: 92
  },
  {
    id: '3',
    plateNumber: 'VAN-003',
    type: 'Delivery Van',
    capacity: 1000,
    status: 'In Use',
    fuelLevel: 45
  },
  {
    id: '4',
    plateNumber: 'TRK-004',
    type: 'Large Truck',
    capacity: 5000,
    status: 'Available',
    fuelLevel: 78
  }
];
