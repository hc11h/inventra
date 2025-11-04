# Core Modules in the Order Management System

This document describes the main modules, their responsibilities, and entities in our Inventory & Order Management System.

## Product Module
- **Entities**: Product
- **Components**: ProductResolver, ProductService
- **Responsibilities**:
  - CRUD operations for products
  - Manage stock levels
  - Link products to suppliers
  - Stock validation
- **Roles Access**:
  - Admin/Manager: Full access
  - Staff: Limited access
  - End User: Read-only (optional)

## Supplier Module
- **Entities**: Supplier
- **Components**: SupplierResolver, SupplierService
- **Responsibilities**:
  - Manage supplier information
  - Link suppliers to products
  - CRUD operations
- **Roles Access**:
  - Admin: Full access
  - Manager: Limited
  - Staff: View-only
  - End User: None

## Customer Module
- **Entities**: Customer
- **Components**: CustomerResolver, CustomerService
- **Responsibilities**:
  - Manage customer info
  - View customer orders
  - Track order history
- **Roles Access**:
  - Admin/Manager: Full access
  - Staff: Partial
  - End User: Self-profile access

## Order Module
- **Entities**: Order, OrderItem
- **Components**: OrderResolver, OrderService
- **Responsibilities**:
  - Create/update orders
  - Validate stock
  - Calculate totals
  - Manage order status
- **Roles Access**:
  - Admin/Manager/Staff: Full access
  - End User: Create/view own orders

## Inventory Module
- **Entities**: InventoryLog
- **Components**: InventoryResolver, InventoryService
- **Responsibilities**:
  - Track stock changes
  - Log inventory activity
  - Emit real-time updates
- **Roles Access**:
  - Admin/Manager: Full access
  - Staff: View-only
  - End User: None
