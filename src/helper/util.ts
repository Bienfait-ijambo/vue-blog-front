

export function myDebounce(func:any,delay:number){
    let debounceTimer:number|undefined
    return function(...args:any[]){
        clearTimeout(debounceTimer)
        debounceTimer=setTimeout(()=>func(...args),delay)
    }
}