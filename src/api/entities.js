import { getBase44 } from './base44Client';

function createLazyEntityProxy(entityName) {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        return async (...args) => {
          const client = await getBase44();
          return client.entities[entityName][prop](...args);
        };
      },
    }
  );
}

export const Member = createLazyEntityProxy('Member');
export const Class = createLazyEntityProxy('Class');
export const Attendance = createLazyEntityProxy('Attendance');
export const Equipment = createLazyEntityProxy('Equipment');
export const Payment = createLazyEntityProxy('Payment');

export const User = new Proxy(
  {},
  {
    get(_target, prop) {
      return async (...args) => {
        const client = await getBase44();
        return client.auth[prop](...args);
      };
    },
  }
);