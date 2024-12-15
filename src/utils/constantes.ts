export default {
  STRING_VAZIA: "",
  HTTP_RESPONSE_CREATE: 201,
  HTTP_RESPONSE_OK: 200,
  HTTP_RESPONSE_CONFLIT: 409,
  HTTP_RESPONSE_NOTFOUND: 404,
};

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const telefoneMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

export const enum EnumFiltro {
  TODOS = "0",
  GERADOS = "1",
  NAO_GERADOS = "2",
}
