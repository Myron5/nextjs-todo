import { getErrorMessage } from "./getErrorMessage";

type GenericFunction = (...args: any[]) => any;

// C - typeof callback;
export function tryCatchWrapper<C extends GenericFunction>(callback: C) {
  const wreppedFunc = async function (...args: Parameters<C>) {
    try {
      await callback(args);
    } catch (err) {
      const message = getErrorMessage(err);
      console.log(message);
    }
  };

  return wreppedFunc;
}

export function TryCatch() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    type argsType = Parameters<typeof originalMethod>;

    descriptor.value = async function (...args: argsType) {
      try {
        await originalMethod.apply(this, args);
      } catch (err) {
        const message = getErrorMessage(err);
        console.log(message);
      }
    };
  };
}
