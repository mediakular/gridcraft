# GridCraft: Headless Svelte Data Grid

[![npm version](https://badge.fury.io/js/@mediakular%2Fgridcraft.svg)](https://badge.fury.io/js/@mediakular%2Fgridcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Demo

[Visit Website With Demos](https://gridcraft.mediakular.com/)

## Documentation

[Full Documentation](https://gridcraft.mediakular.com/docs)

[Quickstart](https://gridcraft.mediakular.com/docs/quickstart)

## Comprehensive & Headless Data Grid for SvelteKit Apps

`@mediakular/gridcraft` is a powerful data grid package made for Svelte applications.

We focus on making GridCraft as easy to use and customize as possible for developers, while still providing all the features a modern grid requires.

The Grid can be used in a variety of ways - from very simple tables to feature-rich grids with **grouping**, **selecting**, **sorting**, **custom columns** and **more**. It was important to us to keep the number of dependencies as well as the file size to a minimum. That's why GridCraft feels easy to use and doesn't interfere with your code.

The component is lightning fast and integrates into your project super quickly.

Here are some screenshots of the default themes. **These themes are fully customizable and you can also create your own themes in a snap.**

<img width="400" alt="image" src="https://github.com/mediakular/gridcraft/assets/23722678/3b86921d-d13a-441b-b405-38daf6886c80"> 
<img width="400" alt="image" src="https://github.com/mediakular/gridcraft/assets/23722678/622a0be9-452c-4b65-9bdf-fc7d0153a5a9">
<img width="400" alt="image" src="https://github.com/mediakular/gridcraft/assets/23722678/11c574bf-7b53-4920-8b08-65977812b266">
<img width="400" alt="image" src="https://github.com/mediakular/gridcraft/assets/23722678/c471b1ba-9eb4-4dc0-91d7-93553fb6ad6a">


### Features ✨

- [x] **Paging**: Use the default paging component or create your own.
- [x] **Sorting**: Use default sorting, set specific sorting value or implement your own custom sorting function.
- [x] **Filtering**: Implement your own filters - quick and simple.
- [x] **Grouping**: It's never been easier to set up grouping functionality for your grid.
- [x] **Row Selection**: Row selection made easy - juist activate it and access selected rows.
- [x] **Custom Row edit**: Simply create your own column with with your own actions/functions. You can also integrate any third-party components to edit your data.
- [x] **Theming**: Personalize grid appearance to match your style guide. Overwrite existing default themes or create your own. There are endless possibilities and we tried to make it as easy as possible for you.
- [x] **Typesafe**: Stay typesafe and use the types from your own business model.
- [x] **Tailwind CSS Ready**: Completely compatible with Tailwind CSS and any other CSS framework.

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
import { clients } from './clients.js'; // [{name: ..., age: ..., ...}, {}, {}]
</script>

<Grid data={clients} />
```

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/t10g8lrrvonvfpe)


### Example With Column Definition

Here an example with a simple custom column definition.

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";
import { clients } from './clients.js';

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    birthdate: Date;
}

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
    data={clients} 
    {columns} />
```

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/wrgknj4kkh9u2rp)


#### Use custom components to render column cells

GridCraft allows you to simply define your own custom svelte components to render column cells. 
The following example shows you how to define a custom `renderComponent`:


```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";
import { clients } from './clients.js';

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
    data={clients} 
    bind:columns />
```

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/k37a6yc96pr3dg6)



Here are the custom cell components used in the example above:

ClientCell.svelte
```svelte
<script lang="ts">
    export let avatar: string;
    export let firstname: string;
    export let lastname: string;
    export let email: string;

    let fullname = `${firstname} ${lastname}`;
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

  let dateStr = value ? (new Date(value)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "-";
</script>

<div>{dateStr}</div>
```

CurrencyCell.svelte
```svelte
<script lang="ts">
	export let value: number;

	let currency = new Intl.NumberFormat("en-US", { currency: "USD", style: 'currency', 2, 0 }).format(value);
</script>

<div>{currency ? currency : '-'}</div>
```

### Example With Row Action Column

Here an example on how to integrate a column with custom row actions. This could be used for example to display links or buttons to delete or edit a row, or to show row details.

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";
import ActionsCell from "$lib/components/grid/cells/ActionsCell.svelte";
import { clients } from './clients.js';

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
                somethingElseClicked: (row: Client) => {
                    // ...
                }
            }
        },
        renderComponent: ActionsCell
    }
];
</script>

<Grid 
    data={clients} 
    {columns} />
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

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/nz5ldvron8kudnf)


### Example With Paging

Here a simple example with paging. If you are okay with the default values, you only need to define a variable of type `PagingData`, which you need to set as attributes for the `Grid` and `GridFooter` components. 
If you want to overwrite the defaults simply define them in the paging variable:

```svelte
<script lang="ts">
import { Grid, PagingData, GridFooter, type GridColumn } from "@mediakular/gridcraft";
import { clients } from './clients.js';

let columns: GridColumn<Client>[] = [];

// Define paging variables, if you want to overwrite the default
let paging = new PagingData(1, 5, [5, 10, 20]);
// Or: let paging = new PagingData();

</script>

<Grid 
    data={clients} 
    {columns}
    bind:paging />

<GridFooter bind:paging />
```

Simple paging example:

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/jj9lpokeuet9223)

Custom paging example:

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/dl77tkzvr65ustm)

### Example With Grouping

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";
import { clients } from './clients.js';

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

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
    {columns}
    bind:groupby />
```

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/y67tv9j37b8hqac)


### Example With Rows Selection

```svelte
<script lang="ts">
import { Grid, type GridColumn } from "@mediakular/gridcraft";
import { clients } from './clients.js';

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

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
    <input type="checkbox" bind:checked={showCheckboxes} id="showCheckboxes"> Show checkboxes
</label>
{#if showCheckboxes}
    Selected Rows:
    <pre>
        {JSON.stringify(selectedRows, null, 2)}
    </pre>
{/if}
<!-- End: Just for demonstration purposes -->

<Grid 
    data={clients} 
    {columns}
    {showCheckboxes} 
    bind:selectedRows />
```

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/r88lu8v36jtn9mu)

### Example With Text Filter

```svelte
<script lang="ts">
import { Grid, type GridColumn, type GridFilter } from "@mediakular/gridcraft";
import { clients } from './clients.js';

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

let textSearch = "";
let clientData = clients;

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
    data={clientData} 
    {columns}
    {filters} />
```

Example with text filter: 

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/2bc946qi8itq93u)

Example with checkbox filter: 

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/vfg9ulxnijog4xy)


### Example With Customized Appearance 

Currently, gridcraft comes with three pre-defined themes: `PlainTableCssTheme`, `PlainTableTheme` and `PrelineTheme`.
By default gridcraft uses `PlainTableCssTheme`. While `PlainTableCssTheme` is a fully styled theme and can be used as-is, `PlainTableTheme` theme is a very basic table, without any styles or classes and serves mostly as a template for your own theme. You can copy  `PlainTableTheme` into your own project and transform it to fit your needs.
`PrelineTheme` is inspired by [preline](https://preline.co/).

There are currently three main components that can be themed: `Grid`, `GridFooter` and `GridPaging`. 

```svelte
<script lang="ts">
import { Grid, type GridColumn, GridFooter, PrelineTheme, PlainTableCssTheme } from "@mediakular/gridcraft";
import { clients } from './clients.js';

let theme = PlainTableCssTheme;

let columns: GridColumn<Client>[] = [
    ...
];
</script>

<!-- Only for demonstration purposes -->
<button on:click={() => theme = PlainTableCssTheme}>Plain Css Theme</button>
<button on:click={() => theme = PrelineTheme}>Preline Theme</button>
<!-- End: Only for demonstration purposes -->

<Grid bind:data={clients} {columns} {theme} />

<GridFooter {theme}/>
```

When using `PrelineTheme` you need to install [tailwindcss](https://tailwindcss.com/docs/guides/sveltekit) and make sure to add this in your `tailwind.config.js`:

```typescript
export default {
  content: [
    ...
    './node_modules/@mediakular/gridcraft/dist/themes/preline/**/*.svelte' // add this line
  ],
  theme: {
    ...
  },
  plugins: [
    ...
  ],
}
```

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/rkd4wvyi7nvmrfe)


#### Overwriting an existing theme

This can be useful if you are satisfied with a certain theme, but you want to make only a few changes instead of creating a new custom theme.

```svelte
<script lang="ts">
import { Grid, type GridColumn, GridFooter, PrelineTheme, PlainTableTheme } from "@mediakular/gridcraft";
import MyTableContainer from "$lib/components/grid/theme/MyTableContainer.svelte"
import { clients } from './clients.js';

let theme = PlainTableTheme;
theme.grid.container = MyTableContainer;

let columns: GridColumn<Client>[] = [
    ...
];
</script>

<Grid 
    bind:data={clients} 
    {columns}
    {theme} />

<GridFooter {theme} />
```

MyTableContainer.svelte
```svelte
<div class="my-custom-wrapper">
    <table class="my-custom-table-class" id="custom-table-id">
        <slot />
    </table>
</div>
```

Find [here](https://gridcraft.mediakular.com/docs/theming) the full theming documentation.

## Full Documentation

[Here](https://gridcraft.mediakular.com/docs/) you can find the full documentation of GridCraft

## Something Missing? 

Request new example codes which we can add in our documenatation: [GitHub Discussion](https://github.com/mediakular/gridcraft/discussions/new?category=examples)

New ideas you can post here so we can discuss them: [GitHub Discussion](https://github.com/mediakular/gridcraft/discussions/new?category=ideas)

Here you can let us know about issues or bugs: [GitHub Issues](https://github.com/mediakular/gridcraft/issues)

Or ask the community in our [Discord Channel](https://discord.gg/HhVet3FU2h)

## 💚 Become A Sponsor

Support the development of GridCraft by becoming a sponsor: 

[Sponsor on GitHub](https://github.com/sponsors/mediakular)

[Sponsor on Patreon](https://www.patreon.com/GridCraft_DataGrid)

## Contribute & Become Part Of The Community

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

Join the community in our [Discord Channel](https://discord.gg/HhVet3FU2h). 
There you can ask everything to get started.

Follow us on [Twitter](https://twitter.com/grid_craft)

## Spread the Love 🤗💻

Sharing is appreciated. 
You've integrated GridCraft successfully in your project? - We would love to see it! 
Twitter it with mentioning [@grid_craft](https://twitter.com/grid_craft) or send us an email to gridcraft @ mediakular.com

Of course you can also share our website [https://gridcraft.mediakular.com](https://gridcraft.mediakular.com).

## API Documentation

[Grid API](https://gridcraft.mediakular.com/docs/api-grid)
[Column API](https://gridcraft.mediakular.com/docs/api-column)
[Filter API](https://gridcraft.mediakular.com/docs/api-filter)

## License

This package is licensed under the MIT License.

