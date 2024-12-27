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
    .replace(/(-\d{2})\d+?$/, "$1")
    
};

export const telefoneMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2").slice(0,14)
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

export const enum EnumFiltro {
  TODOS = "0",
  GERADOS = "1",
  NAO_GERADOS = "2",
}

export const softwares = ['SYSPDV', 'VAREJO FACIL', 'HIPER PDV', 'DIGISAT', 'EASYASSIST', 'CPLUG', 'PRODO', 'CLIPPER']

export const RetornarDescricaoMes = (mes: Number) => {
  switch (mes) {
    case 1:
      return "Janeiro";
      break;
    case 2:
      return "Fevereiro";
      break;
    case 3:
      return "Marco";
      break;
    case 4:
      return "Abril";
      break;
    case 5:
      return "Maio";
      break;
    case 6:
      return "Junho";
      break;
    case 7:
      return "Julho";
      break;
    case 8:
      return "Agosto";
      break;
    case 9:
      return "Setembro";
      break;
    case 10:
      return "Outubro";
      break;
    case 11:
      return "Novembro";
      break;
    case 12:
      return "Dezembro";
      break;

    default:
      return "Janeiro";
      break;
  }
};
