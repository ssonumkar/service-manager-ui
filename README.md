# Service Manager UI

A Angular application for managing Services, Resources, and Owners with full CRUD operations, form validation, and data handling.

## Project Overview

The Service Manager UI is a Angular application built with standalone components that provides a hierarchical management system for:
- **Services**: Top-level entities containing multiple resources
- **Resources**: Mid-level entities belonging to services and containing multiple owners
- **Owners**: Individual entities 

## Architecture & Technology Stack

- **Framework**: Angular 18+ with Standalone Components
- **Styling**: Bootstrap 5 with custom SCSS
- **Forms**: Reactive Forms with comprehensive validation
- **HTTP Client**: Angular HttpClient with RxJS observables
- **Testing**: Jasmine & Karma for unit testing
- **Build Tool**: Angular CLI with Vite

## Application Screens & Functionality

### 1. Service Management
**Location**: `/services`

**Features**:
- View all services in a table format
- Create new services with validation
- Edit existing services
- Delete services with confirmation dialogs
- Navigate to associated resources

**Operations**:
- **Create**: Click "New Service" → Fill form with Service ID → Submit
- **Read**: Services displayed in table with ID column
- **Update**: Click edit icon → Modify service details → Save
- **Delete**: Click delete icon → Confirm deletion → Service removed

### 2. Resource Management
**Location**: `/resource/{serviceId}/edit`

**Features**:
- View all resources for a specific service
- Create new resources within a service
- Edit existing resources
- Delete resources with confirmation
- Navigate to associated owners
- Navigation back to services

**Operations**:
- **Create**: Click "New Resource" → Enter Resource ID → Submit
- **Read**: Resources displayed with service context
- **Update**: Click edit → Modify owners → Save
- **Delete**: Click delete → Confirm → Resource removed
- **Navigation**: Back to services

### 3. Owner Management
**Location**: `/owner/{serviceId}/{resourceId}/edit`

**Features**:
- View all owners for a specific resource
- Create new owners with form validation
- Edit existing owners with form pre-population
- Delete owners with confirmation

**Operations**:
- **Create**: Click "New Owner" → Fill detailed form → Submit
- **Read**: Owners displayed with full details (ID, Name, Account Number, Level)
- **Update**: Click edit → Form pre-populated → Modify → Save
- **Delete**: Click delete → Confirm → Owner removed

## Configuration & Environment

### Environment Files

The application supports multiple environments through configuration files:

#### Development Environment
**File**: `src/environments/environment.dev.ts`
```typescript
export const environment = {
  production: false,
  serviceApiUrl: 'http://localhost:8080/api/v1'
};
```

#### Production Environment
**File**: `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  serviceApiUrl: 'https://your-production-api.com/api/v1'
};
```

#### Default Environment
**File**: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  serviceApiUrl: 'http://localhost:8080/api/v1'
};
```

### Configuration Files

#### Form Field Configuration
**File**: `src/app/config/form-field-config.ts`
- Centralized form field definitions
- Validation rules and error messages
- Field types and options
- Easily customizable for different forms

#### Footer Button Configuration
**File**: `src/assets/config/footer-button-config.json`
- Modal footer button configurations
- Action definitions and styling


## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18 or higher)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd service-manager-ui
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
- Update `src/environments/environment.ts` with your API URL
- Modify other environment files as needed

4. **Give Permissons and run**
```bash
chmod +x run-app.sh
./run-app.sh
```

