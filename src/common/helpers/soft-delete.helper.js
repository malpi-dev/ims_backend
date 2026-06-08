"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteQuery = softDeleteQuery;
exports.softDeleteCondition = softDeleteCondition;
function parseIncludeDeleted(includeDeleted) {
    if (typeof includeDeleted === 'string') {
        return includeDeleted.toLowerCase() === 'true';
    }
    return Boolean(includeDeleted);
}
function softDeleteQuery(includeDeleted = false) {
    const include = parseIncludeDeleted(includeDeleted);
    return include ? {} : { deletedAt: null };
}
function softDeleteCondition(includeDeleted = false) {
    const include = parseIncludeDeleted(includeDeleted);
    return include
        ? {}
        : { $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: false } }] };
}
//# sourceMappingURL=soft-delete.helper.js.map