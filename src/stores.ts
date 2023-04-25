import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const token: Writable<string> = writable('');