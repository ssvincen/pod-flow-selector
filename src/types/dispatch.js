
// TypeScript interfaces converted to JSDoc comments for JSX compatibility

/**
 * @typedef {Object} Branch
 * @property {string} id
 * @property {string} name
 * @property {string} code
 */

/**
 * @typedef {Object} DispatchCategory
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {Object} DispatchItem
 * @property {string} id
 * @property {string} itemName
 * @property {number} quantity
 * @property {number} weight
 * @property {string} destination
 * @property {'High' | 'Medium' | 'Low'} priority
 * @property {'Pending' | 'Assigned' | 'In Transit' | 'Delivered'} status
 * @property {string} branchId
 * @property {string} categoryId
 * @property {string} createdDate
 * @property {string} customerName
 * @property {string} address
 */

/**
 * @typedef {Object} Driver
 * @property {string} id
 * @property {string} name
 * @property {string} licenseNumber
 * @property {string} phone
 * @property {'Available' | 'Busy' | 'Off Duty'} status
 * @property {number} rating
 */

/**
 * @typedef {Object} Vehicle
 * @property {string} id
 * @property {string} plateNumber
 * @property {string} type
 * @property {number} capacity
 * @property {'Available' | 'In Use' | 'Maintenance'} status
 * @property {number} fuelLevel
 */

/**
 * @typedef {Object} POD
 * @property {string} id
 * @property {string} podNumber
 * @property {string} driverId
 * @property {string} vehicleId
 * @property {DispatchItem[]} items
 * @property {'Created' | 'In Progress' | 'Completed'} status
 * @property {string} createdDate
 * @property {string} estimatedDelivery
 * @property {number} totalWeight
 * @property {number} totalItems
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} branchId
 * @property {string} categoryId
 * @property {string} startDate
 * @property {string} endDate
 */

export {};
