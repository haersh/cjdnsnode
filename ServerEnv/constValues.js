// _____________________ SERVER _____________________________//
export const MS_MINUTE = 1000 * 60;

export const KEEP_TABLE_CLEAN_CYCLE = 4 * 60 * MS_MINUTE;

export const AGREED_TIMEOUT_MS = 10 * MS_MINUTE;

export const MAX_CLOCKSKEW_MS = (1000 * 10);

export const MAX_GLOBAL_CLOCKSKEW_MS = (1000 * 60 * 60 * 20);

export const GLOBAL_TIMEOUT_MS = MAX_GLOBAL_CLOCKSKEW_MS + AGREED_TIMEOUT_MS;


