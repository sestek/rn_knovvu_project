
export interface Projects {
    key:string,
    value: Value
}

interface Value {
    url: string,
    tenant: string,
    project: string
}