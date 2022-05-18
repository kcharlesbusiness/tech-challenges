export function hasOwnProp<T extends {}>(object: T, property: keyof T): boolean {
  return {}.hasOwnProperty.call(object, property);
}
