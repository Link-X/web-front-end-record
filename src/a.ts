export const abc = <T = any>(str: string): T => {
    return (str + '123') as T
}
