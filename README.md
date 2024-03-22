# GridCraft: Svelte Data Grid

[![npm version](https://badge.fury.io/js/@mediakular%2Fgridcraft.svg)](https://badge.fury.io/js/@mediakular%2Fgridcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Comprehensive Data Grid for SvelteKit Apps 📊

`@mediakular/gridcraft` is a powerful data grid package tailored for Sveltekit applications. It offers an array of features to elevate the presentation and interaction with tabular data.

<img width="1148" alt="image" src="https://github.com/mediakular/gridcraft/assets/23722678/03a806a2-76bc-4513-86a8-05d0ff7bb5df">

### Demo

Coming soon


### Exciting Features ✨

- **Paging**: Navigate through large datasets effortlessly.
- **Sorting**: Arrange data in ascending or descending order with ease.
- **Custom Filtering**: Tailor data views to your specific needs.
- **Grouping**: Organize related data into logical groups.
- **Row Selection**: Select and manipulate individual or multiple rows.
- **Custom Row edit**: Integrate any custom or third-party components to edit your data.
- **Customizable Output**: Personalize grid appearance to match your style guide.
- **Typesafe**: Stay typesafe and use the types from your own business model.
- **Tailwind CSS ready**: Completely compatible with tailwind CSS and any other framework.

## Installation

```bash
npm install @mediakular/gridcraft
```

or 

```bash
yarn add @mediakular/gridcraft
```

or 

```bash
pnpm add @mediakular/gridcraft
```

or 

```bash
bun add @mediakular/gridcraft
```

## Usage

Most basic usage. In this example GridCraft will automatically detect the properties of type `Client` and generate a column for each property.

```svelte
<script lang="ts">
import { Grid } from '@mediakular/gridcraft';

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    birthdate: Date;
}

export let data: PageData;
let clients: Client[];
$: ({ clients } = data);
</script>

<Grid bind:data={clients} />
```

### Example With Column Definition

Here an example with a simple custom column definition.

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    birthdate: Date;
}

export let data: PageData;

let clients: Client[];
$: ({ clients } = data);

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name'
    },
    { 
        key: 'lastname', 
        title: 'Last Name'
    },
    { 
        key: 'age', 
        title: 'Age'
    },
    { 
        key: 'birthdate', 
        title: 'Birthday'
    }
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns />
```

#### Use custom components to render column cells

GridCraft allows you to simply define your own custom svelte components to render column cells. 
The following example shows you how to define a custom `renderComponent`:


```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";

import ClientCell from "$lib/components/grid/cells/ClientCell.svelte";
import CurrencyCell from "$lib/components/grid/cells/CurrencyCell.svelte";
import DateCell from "$lib/components/grid/cells/DateCell.svelte";

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
        // Use an accessor to transform row data, which can be used in your custom renderComponent
        accessor: (row: Client) => { 
            return {
                avatar: row.avatar,
                firstname: row.firstname,
                lastname: row.lastname,
                email: row.email
            }
        },
        // as the default search will not work with our accessor data, we have to provide a sortValue which will be used for sorting
        sortValue: (row: Client) => {
            return `${row.firstname} ${row.lastname}`
        },
        renderComponent: ClientCell // Our custom column cell component to render a column with avatar, full name and email
    },
    { 
        key: 'age', 
        title: 'Age'
    },
    { 
        key: 'birthdate', 
        title: 'Birthday',
        renderComponent: DateCell // Our custom column cell component to render a formatted date
    },
    { 
        key: 'total', 
        title: 'Total',
        accessor: (row: Client) => { return row.amount * row.quantity },
        renderComponent: CurrencyCell // Our custom column cell component to render a calculated cell and formatted currency 
    },
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns />
```

Here are the custom cell components used in the example above:

ClientCell.svelte
```svelte
<script lang="ts">
    export let avatar: string;
    export let firstname: string;
    export let lastname: string;
    export let email: string;

    $: fullname = `${firstname} ${lastname}`;
</script>

<div class="my-client-cell">
    <img src="{avatar}" alt="{fullname}" />
    <div>
        <span>{fullname}</span>
        {#if email}
            <span>{email}</span>
        {/if}
    </div>
</div>
```

DateCell.svelte
```svelte
<script lang="ts">
  export let value: Date;
  let dateStr: string;

  $: dateStr = value ? (new Date(value)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "-";
</script>

<div>{dateStr}</div>
```

CurrencyCell.svelte
```svelte
<script lang="ts">
	export let value: number;
	let currency: string;

	$: value, updateValue()

	async function updateValue() {
		const formatCurrency = (value: number, locale: string, currency: string, maximumFractionDigits: number) =>
                new Intl.NumberFormat(locale, { currency: currency, style: 'currency',2,0
        }).format(value);

		currency = formatCurrency(value ? value : 0, "en-US", "USD", 2);
	}
</script>

<div>{currency ? currency : '-'}</div>
```

### Example With Row Action Column

Here an example on how to integrate a column with custom row actions. This could be used for example to display links or buttons to delete or edit a row, or to show row details.

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";
import ActionsCell from "$lib/components/grid/cells/ActionsCell.svelte";

export let data: PageData;

let clients: Client[];
$: ({ clients } = data);

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name',
    },
    {
        key: 'lastname', 
        title: 'Last Name',
    },
    {
        key: 'email', 
        title: 'E-Mail',
    },
    {
        key: 'actions', // you can call it however you like
        title: 'Row Actions',
        sortable: false,
        accessor: (row: Client) => { 
            return {
                row: row, 
                editClicked: (row: Client) => {  
                   // Implement your edit function here. You can for example open a modal window which shows the edit form for the row
                },
                deleteClicked: (row: Client) => {  
                   // Implement your delete function here. You can for example open a dialoge window here to confirm that the user wants to delete the row
                },
                somethingElseClicked: () => {
                    // ...
                }
            }
        },
        renderComponent: ActionsCell
    }
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns />
```

ActionsCell.svelte
```svelte
<script lang="ts">
    type T = $$Generic<any>;

    export let row: T;
    export let editClicked: (row: T) => void;
    export let deleteClicked: (row: T) => void;
    export let somethingElseClicked: (row: T) => void;

    function handleEditClick() {
        editClicked(row);
    }
    function handleDeleteClick() {
        deleteClicked(row);
    }
    function handleSomethingElseClick() {
        somethingElseClicked(row);
    }
</script>

<button on:click|preventDefault={handleEditClick}>
    Edit
</button>
<button on:click|preventDefault={handleDeleteClick}>
    Delete
</button>
<a href="#" on:click|preventDefault={handleSomethingElseClick}>
    Something Else
</a>
```

### Example With Paging

Here a simple example with paging. Simply define and bind the necessary variables to the `Grid` component and to the `GridFooter` component. 

```svelte
<script lang="ts">
import { Grid, GridFooter, type GridColumn } from "@mediakular/gridcraft";

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
    bind:columns
    bind:currentPage 
    bind:itemsPerPage 
    bind:totalPages 
    bind:totalResults />
<GridFooter bind:currentPage bind:totalPages bind:totalResults bind:itemsPerPage />
```

### Example With Grouping

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";

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

<!-- Just for demonstration purposes -->
<select bind:value={groupBy} >
    <option value="">Select Column to Group By</option>
    {#each columns as col (col.key)}
        <option value={col.key}>{col.title}</option>
    {/each}
</select> 
<!-- End: Just for demonstration purposes -->

<Grid 
    bind:data={clients} 
    bind:columns
    bind:groupby />
```

### Example With Rows Selection

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";

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

<!-- Just for demonstration purposes -->
<label for="showCheckboxes">
    <input type="checkbox" checked={showCheckboxes == true} on:change={() => showCheckboxes = !showCheckboxes} id="showCheckboxes">
    &nbsp;Show checkboxes
</label>
{#if showCheckboxes}
    Selected Rows:
    <pre>
        {JSON.stringify(selectedRows, null, 2)}
    </pre>
{/if}
<!-- End: Just for demonstration purposes -->

<Grid 
    bind:data={clients} 
    bind:columns
    bind:selectedRows
    bind:showCheckboxes />
```

### Example With Text Filter

```svelte
<script lang="ts">
import { Grid, type GridColumn, type GridFilter } from "@mediakular/gridcraft";

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

let filters: GridFilter[];
$: filters = [
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
    bind:columns
    bind:filters />
```

### Example With Customized Appearance 

Currently, gridcraft comes with two pre-defined themes: `PlainTableTheme` and `PrelineTheme`.
By default gridcraft uses `PlainTableTheme`. This theme is a very basic table, without any styles. 
`PrelineTheme` is inspired by [preline tables](https://preline.co/docs/tables.html).

There are currently three components that can be themed: `Grid`, `GridFooter` and `GridPaging`. 
On these components the `theme` property can be set.

```svelte
<script lang="ts">
import { Grid, type GridColumn, GridFooter, PrelineTheme, PlainTableTheme } from "@mediakular/gridcraft";

export let data: PageData;
let clients: Client[];
$: ({ clients } = data);

let theme = PlainTableTheme;

let columns: GridColumn<Client>[] = [
    ...
];
</script>

<!-- Only for demonstration purposes -->
<button on:click={() => theme = PlainTableTheme}>Plain Theme</button>
<button on:click={() => theme = PrelineTheme}>Preline Theme</button>
<!-- End: Only for demonstration purposes -->

<Grid 
    bind:data={clients} 
    bind:columns
    {theme} />

<GridFooter ... {theme} />
```

When using `PrelineTheme` you need to install [tailwindcss](https://tailwindcss.com/docs/guides/sveltekit) and make sure to add this in your `tailwind.config.js`:

```typescript
export default {
  content: [
    ...
    './node_modules/@mediakular/gridcraft/dist/themes/preline/*.svelte'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ...
  ],
}
```

#### Overwriting an existing theme

This can be usefull if you are satisfied with a certain theme, but you want to make only a few changes instead of creating a new custom theme.

```svelte
<script lang="ts">
import { Grid, type GridColumn, GridFooter, PrelineTheme, PlainTableTheme } from "@mediakular/gridcraft";
import MyTableContainer from "$lib/components/grid/theme/MyTableContainer.svelte"

export let data: PageData;
let clients: Client[];
$: ({ clients } = data);

let theme = PlainTableTheme;
theme.grid.container = MyTableContainer;

let columns: GridColumn<Client>[] = [
    ...
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns
    {theme} />

<GridFooter ... {theme} />
```

MyTableContainer.svelte
```svelte
<div class="my-custom-wrapper">
    <table class="my-custom-table-class" id="custom-table-id">
        <slot />
    </table>
</div>
```

### Example With Data Export

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
- `visible` (optional): Can be set to true/false to show/hide the column
- `sortable` (optional): Can be set to true/false to activate/deactivate sorting of the column
- `width` (optional): Width of the column. Either as number (px) or string value "123px" or "1rem" or "33%"

## License

This package is licensed under the MIT License.

