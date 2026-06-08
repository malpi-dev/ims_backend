export declare function softDeleteQuery(includeDeleted?: boolean | string): {
    deletedAt?: undefined;
} | {
    deletedAt: null;
};
export declare function softDeleteCondition(includeDeleted?: boolean | string): {
    $or?: undefined;
} | {
    $or: ({
        deletedAt: {
            $eq: null;
            $exists?: undefined;
        };
    } | {
        deletedAt: {
            $exists: boolean;
            $eq?: undefined;
        };
    })[];
};
