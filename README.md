# GridCraft - Comprehensive Data Grid for SvelteKit

[![npm version](https://badge.fury.io/js/%40mediakular%2Fsvelte-data-grid.svg)](https://badge.fury.io/js/%40mediakular%2Fsvelte-data-grid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Svelte Data Grid Table 📊

`@mediakular/svelte-data-grid` is a powerful data grid package tailored for Sveltekit applications. It offers an array of features to elevate the presentation and interaction with tabular data.

### Demo

Coming soon

### Exciting Features ✨

- **Paging**: Navigate through large datasets effortlessly.
- **Sorting**: Arrange data in ascending or descending order with ease.
- **Custom Filtering**: Tailor data views to your specific needs.
- **Grouping**: Organize related data into logical groups.
- **Row Selection**: Select and manipulate individual or multiple rows.
- **Customizable Output**: Personalize grid appearance to match your style guide.
- **Tailwind CSS ready**: Completely compatible with tailwind CSS.

## Installation

```bash
npm install @mediakular/svelte-data-grid
```

or 

```bash
yarn add @mediakular/svelte-data-grid
```

## Usage

Most basic usage: 

```typescript
import { Grid, GridColumn } from '@mediakular/svelte-data-grid';

// Define your data and columns
let clients = getClientsFromDb();
let columns = [...];

<Grid 
    bind:data={clients} 
    bind:columns={columns}>
</Grid>
```

### Example With Column Definition

Here a more advanced usage with column definition. 

```typescript
interface Client {
    id: string;
    firstname: string;
    lastname: string;
    avatar: string;
    email: string;
    age: number;
    birthdate: Date;
    amount: number;
    quantity: number;
}

let clients: Client[] = getClientsFromDb();

let columns: GridColumn<Client>[] = [
    { 
        key: 'name', 
        title: 'Name',
        accessor: (row: Client) => {
            return {
                avatar: row.avatar,
                firstname: row.firstname,
                lastname: row.lastname,
                email: row.email
            }
        }, 
        sortValue: (row: Client) => {
            return `${row.firstname} ${row.lastname}`
        },
        renderComponent: ClientCell,
    },
    { 
        key: 'age', 
        title: 'Age',
        accessor: (row: Client) => { return row.age },
    },
    { 
        key: 'birthdate', 
        title: 'Birthday',
        renderComponent: DateCell,
        sortValue: (row: Client) => {
            return row.birthdate;
        },
        accessor: (row: Client) => { return { value : row.birthdate } },
    },
    { 
        key: 'total', 
        title: 'Total',
        accessor: (row: Client) => { return row.amount * row.quantity },
        renderComponent: CurrencyCell,
    },
];

<Grid 
    bind:data={clients} 
    bind:columns={columns}>
</Grid>
```

### Example With Footer & Paging

```typescript
let itemsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
let totalResults = 0;

let columns: GridColumn<Client>[] = [];
let clients: Client[] = getClientsFromDB() //replace getClientsFromDB with your DB function

<Grid 
    bind:data={clients} 
    bind:columns={columns}
    bind:currentPage 
    bind:itemsPerPage 
    bind:totalPages 
    bind:totalResults>
</Grid>
<GridFooter bind:currentPage bind:totalPages bind:totalResults bind:itemsPerPage />
```

### Example With Grouping

Coming soon

### Example With Selecting Rows

Coming soon

### Example With Different Filters

Coming soon

### Example With Group By

Coming soon

### Example With Customized Appearance 

Coming soon


## API Documentation

### Grid Properties

Coming soon

### Columns

- `key`: needs to be the name of the property
- `title`: Title of the column
- `accessor` (optional): returns custom objects or manipulated values
- `sortValue` (optional): returned value will be used for sorting
- `renderComponent` (optional): Reference to a SvelteKit component. Will be used to render the column-cell
- `cellRender` (optional): Can be used to render a sveltekit component AND provide custum properties for the component. Those will be automatically injected. { component: MyFancyCellComponent, props: {myVal: 123, other: "abc"} }
- `visible` (optional): Can be set to true/false to show/hide the column
- `sortable` (optional): Can be set to true/false to activate/deactivate sorting of the column
- `width` (optional): Width of the column. Either as number (px) or string value "123px" or "1rem" or "33%"


## License

This package is licensed under the MIT License.

