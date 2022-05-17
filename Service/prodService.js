import httpService from "./httpService";
const apiEndpoint = "produkter/";
export function saveProd(prod, t) {
  const body = {
    ...prod,
    publicId: t,
  };
  console.log(body, "jeg er body");

  console.log(prod);
  return httpService.post(apiEndpoint, body);
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
