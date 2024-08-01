import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type SessionData from "./utils/SessionData";

export const fbAPIStore: Writable<any> = writable();
export const sessionStore: Writable<SessionData> = writable();
export const pageStore: Writable<number> = writable(0);
export const sizeStore: Writable<number> = writable(1200);

