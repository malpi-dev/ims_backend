function parseIncludeDeleted(includeDeleted: boolean | string) {
  if (typeof includeDeleted === 'string') {
    return includeDeleted.toLowerCase() === 'true';
  }
  return Boolean(includeDeleted);
}

export function softDeleteQuery(includeDeleted: boolean | string = false) {
  const include = parseIncludeDeleted(includeDeleted);
  return include ? {} : { deletedAt: null };
}

export function softDeleteCondition(includeDeleted: boolean | string = false) {
  const include = parseIncludeDeleted(includeDeleted);
  return include
    ? {}
    : { $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: false } }] };
}
