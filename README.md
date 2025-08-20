# Mini Seller Console

Mini Seller Console is a React application for managing **leads** and **opportunities** with **dark mode support**, filters, sorting, and lead conversion.

---

## Technologies

- React + TypeScript
- TailwindCSS (with dark mode support)
- Custom hooks (`useLeads`, `useOpportunities`, `useDarkMode`)
- LocalStorage for persisting filters
- Icons: `lucide-react`

---

## Project Structure

### App.tsx

The main application component. Responsibilities:

- Initialize lead filters from `localStorage`.
- Manage dark mode using `useDarkMode`.
- Render search inputs and status filters.
- Render sorting buttons (`score`, `name`, `company`).
- Display **loading**, **error**, **leads**, and **opportunities**.
- Control the lead detail panel (`LeadDetailPanel`).

**Dark mode:** All backgrounds, text, inputs, and buttons use Tailwind `dark:` classes for automatic switching.

---

### Components

#### LeadTable

- Receives `leads` and `onRowClick`.
- Displays a table with lead information: `name`, `company`, `email`, `source`, `score`, and `status`.
- Supports dark mode.

#### LeadDetailPanel

- Side panel to view and edit a lead.
- Allows editing **email** and **status**, and converting the lead to an opportunity.
- Validates email and numeric input for conversion.
- Supports dark mode.

#### OpportunityTable

- Receives `opportunities`.
- Displays a table with: `name`, `accountName`, `stage`, and `amount`.
- Supports dark mode.

---

### Hooks

#### useDarkMode

- Detects system **dark mode** preference.
- Allows toggling between light/dark mode.
- Adds/removes `dark` class on `<html>` element.

#### useLeads

- Loads simulated leads (`leads.json`) with delay (`sleep`).
- Supports filters (`status` and search by name/company).
- Supports sorting (`score`, `name`, `company`).
- Converts leads into opportunities.
- `saveLeadPatch` function simulates saving changes with random failure.

#### useOpportunities

- Loads simulated opportunities (`opportunities.json`).
- Returns opportunity list, loading state, and error.
- Allows updating the list via `setOpportunities`.

---

### Utils

- LocalStorage helpers: `getLS`, `setLS`.
- Email validation: `isValidEmail`.
- Status and score colors: `statusColors`, `getScoreColor`.
- Opportunity stage colors: `stageColors`.
- Sleep function to simulate delays.

---

### Features

- Automatic dark mode and manual toggle.
- Leads and opportunities listing.
- Status filters and search by name/company.
- Sorting by score, name and company.
- Lead conversion to opportunity.
- Edit lead details directly in side panel.

---

## Running the project

To run the project on your local machine:

- Install dependencies
  `npm install`
- Run development server
  `npm run dev`
