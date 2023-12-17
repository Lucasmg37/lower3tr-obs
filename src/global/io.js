export let ioGlobal = null

export function setGlobal(data){
  ioGlobal = data
}

export function getGlobal() {
  return ioGlobal
}