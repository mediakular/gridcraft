# GridCraft: Svelte Data Grid

[![npm version](https://badge.fury.io/js/%40mediakular%2Fgridcraft.svg)](https://badge.fury.io/js/%40mediakular%2Fgridcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Comprehensive Data Grid for SvelteKit Apps 📊

`@mediakular/gridcraft` is a powerful data grid package tailored for Sveltekit applications. It offers an array of features to elevate the presentation and interaction with tabular data.

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
npm install @mediakular/gridcraft
```

or 

```bash
yarn add @mediakular/gridcraft
```

## Usage

Most basic usage: 

```typescript
<script lang="ts">
import { Grid, GridColumn } from '@mediakular/gridcraft';

export let data: PageData;

// Get your data
let clients: Client[];
$: ({ clients } = data);

// Define your columns
let columns = [...];
</script>

<Grid 
    bind:data={clients} 
    bind:columns={columns}>
</Grid>
```

### Example With Column Definition

Here a more advanced usage with column definition. 

```typescript
<script lang="ts">
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

export let data: PageData;

let clients: Client[];
$: ({ clients } = data);

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
        renderComponent: ClientCell
    },
    { 
        key: 'age', 
        title: 'Age'
    },
    { 
        key: 'birthdate', 
        title: 'Birthday',
        renderComponent: DateCell
    },
    { 
        key: 'total', 
        title: 'Total',
        accessor: (row: Client) => { return row.amount * row.quantity },
        renderComponent: CurrencyCell
    },
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns={columns}>
</Grid>
```

### Example With Footer & Paging

```typescript
<script lang="ts">
export let data: PageData;

let clients: Client[];
$: ({ clients } = data);

let columns: GridColumn<Client>[] = [];

// Define paging variables
let itemsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
let totalResults = 0;
</script>

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

```typescript
<script lang="ts">
interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

export let data: PageData;
let clients: Client[];
$: ({ clients } = data);

let groupBy = "";

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name',
    },
    { 
        key: 'lastname', 
        title: 'First Name',
    },
    { 
        key: 'age', 
        title: 'Age'
    }
];
</script>

<!-- this select box is just for demonstration purposes ->
<select bind:value={groupBy} >
    <option value="">Select Column to Group By</option>
    {#each columns as col (col.key)}
        <option value={col.key}>{col.title}</option>
    {/each}
</select> 

<Grid 
    bind:data={clients} 
    bind:columns={columns}
    bind:groupby>
</Grid>
```

### Example With Selecting Rows

```typescript
<script lang="ts">
interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

export let data: PageData;
let clients: Client[];
$: ({ clients } = data);

let showCheckboxes = true;
let selectedRows:Client[] = [];

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name',
    },
    { 
        key: 'lastname', 
        title: 'First Name',
    },
    { 
        key: 'age', 
        title: 'Age'
    },
];
</script>

<pre>
    {JSON.stringify(selectedRows)}
</pre>

<Grid 
    bind:data={clients} 
    bind:columns={columns}
    bind:selectedRows
    bind:showCheckboxes>
</Grid>
```

### Example With Text Filter

```typescript
<script lang="ts">
interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

export let data: PageData;
let clients: Client[];
$: ({ clients } = data);

let textSearch = "";

let gridFilters: GridFilter[];
$: gridFilters = [
    {   
        key: "text-search", //can be chosen freely
        columns: ["firstname", "lastname", "age"], // Define which columns you would like to use the filter for
        filter: (row: any, colKey: string) => { // Actual filter function which will be called for each of the above defined columns. We return true for displaying the column and false for hiding it
            const search = (val: string | null) => val != undefined && val.toString().toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());
            return search(row)
        }, 
        active: (textSearch && textSearch.length > 0) ? true : false // Here we return true when the filter should be active, when false the filter will be ignored
    }
];

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'Firstname',
    },
    { 
        key: 'lastname', 
        title: 'Lastname',
    },
    { 
        key: 'age', 
        title: 'Age'
    },
];
</script>

 <input type="text" placeholder="Enter Filter Term (Firstname, Lastname or Age)" bind:value={textSearch} />

<Grid 
    bind:data={clients} 
    bind:columns={columns}
    bind:gridFilters>
</Grid>
```

### Example With Customized Appearance 

Coming soon


## API Documentation

### Grid Properties

Coming soon

### Columns

- `key`: needs to be the name of the property when no accessor is defined
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

