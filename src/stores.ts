import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const fbAPIStore: Writable<any> = writable(null);