import { ConditionAnd, ConditionCompare, ConditionElement, ConditionNot, ConditionOr, Unknown } from '@quantleaf/query-result'
import { translate, config, generateSchema } from '@quantleaf/query-sdk-node';
import { QueryResponse } from '@quantleaf/query-request';

export abstract class QueryWebInterface
{
    schemas:Schema[];
    nestedConditions:boolean;
    negativeConditions:boolean;
    abstract readable (queryResponse:QueryResponse): ReadableRepresentation
    abstract url(queryResponse:QueryResponse):string
}

export interface ReadableRepresentation 
{
    query:string, 
    errors:string[]
}
export const emptyReadableRepresentation = {
    query: 'No result',
    errors: []
}
export interface ParsedQuery {
    searchParams?: string;
    queryParams?: {
        key: string,
        value: string
    }[];
}
export interface QuerySession {
    lastReadableQuery?: ReadableRepresentation,
    lastResponse?: QueryResponse;
    parsedQuery?: ParsedQuery,
}

export interface QueryStatus {
    faults: string[],
    searchParamCounter:number;
    queryParamCounter:number;
}

export interface Suggestion {
    offset: number;
    text: string;
}
