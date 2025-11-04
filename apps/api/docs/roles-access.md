# Roles & Access Control in the OMS

This document defines the user roles and their access across modules in the system.

## Roles

### Super Admin
- Full system access
- Can create client accounts
- Assign roles
- Access all modules

### Client Admin (Business Owner)
- Full access to their organization’s modules
- Manage products, orders, inventory, suppliers

### Manager
- Manage daily operations
- Create/update orders
- Manage stock
- View dashboards

### Staff
- Limited operational access
- Update orders
- View stock
- Assist day-to-day

### End User / Customer
- Interact with orders
- View personal order history
- Optional: browse products

## How Roles Map to Modules

| Module           | Super Admin | Client Admin | Manager | Staff | End User |
|-----------------|------------|-------------|--------|-------|---------|
| Product          | ✅          | ✅           | ✅      | ⚡️     | ⚡️      |
| Supplier         | ✅          | ✅           | ✅      | ⚡️     | ❌      |
| Customer         | ✅          | ✅           | ✅      | ⚡️     | ✅      |
| Order            | ✅          | ✅           | ✅      | ✅      | ✅      |
| Inventory        | ✅          | ✅           | ✅      | ⚡️     | ❌      |
| Notifications    | ✅          | ✅           | ✅      | ✅      | ⚡️      |

Legend:
- ✅ Full access
- ⚡️ Limited access
- ❌ No access
