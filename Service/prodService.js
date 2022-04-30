import httpService from "./httpService";
const apiEndpoint = "produkter/";
export function saveProd(prod) {
  if (prod._id) {
    const body = { ...prod };
    delete body._id;
    return httpService.put(apiEndpoint + prod._id, body);
  }
  console.log(prod);
  return httpService.post(apiEndpoint, prod);
}

export async function getProd() {
  return httpService.get(apiEndpoint);
}

export async function getProdById(id) {
  return httpService.get(apiEndpoint + id);
}
export async function getProdBySeller(sellerId) {
  console.log(sellerId);
  return httpService.get(apiEndpoint + "/seller/" + sellerId);
}

export async function deleteProd(id) {
  return httpService.delete(apiEndpoint + id);
}
