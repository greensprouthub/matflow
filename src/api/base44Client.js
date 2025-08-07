import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

export let __base44ClientPromise;

export async function getBase44() {
  if (!__base44ClientPromise) {
    __base44ClientPromise = import('@base44/sdk').then(({ createClient }) =>
      createClient({
        appId: '688e45637ea3b621021f54fa',
        requiresAuth: true,
      })
    );
  }
  return __base44ClientPromise;
}
