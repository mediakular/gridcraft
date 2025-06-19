<script lang="ts">
import { Grid, type GridColumn } from "$lib/index.js";
let clients = [
    {
        id: "1",  // Changed to string to match Client interface
        name: "John Smith",
        email: "john.smith@email.com",
        age: 32,
        city: "New York",
        occupation: "Software Developer"
    },
    {
        id: "2",
        name: "Emma Wilson",
        email: "emma.w@email.com",
        age: 28,
        city: "London",
        occupation: "UX Designer"
    },
    {
        id: "3",
        name: "Michael Chen",
        email: "m.chen@email.com",
        age: 41,
        city: "San Francisco",
        occupation: "Product Manager"
    },
    {
        id: "4",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        age: 35,
        city: "Toronto",
        occupation: "Data Analyst"
    },
    {
        id: "5",
        name: "David Brown",
        email: "david.b@email.com",
        age: 45,
        city: "Berlin",
        occupation: "Solutions Architect"
    }
];
interface Client {
    id: string;
    name: string;
    email: string;
    age: number;
    city: string;
    occupation: string;
}

let columns: GridColumn<Client>[] = [
    {
        key: 'id',
        title: 'ID'
    },
    { 
        key: 'name', 
        title: 'Name'
    },
    { 
        key: 'email', 
        title: 'Email'
    },
    { 
        key: 'age', 
        title: 'Age'
    },
    { 
        key: 'city', 
        title: 'City'
    },
    { 
        key: 'occupation', 
        title: 'Occupation'
    }
];
// Add this logging statement in your +page.svelte script section
console.log('Clients:', clients);
console.log('Columns:', columns);
</script>

<Grid 
    bind:data={clients} 
    bind:columns
/>