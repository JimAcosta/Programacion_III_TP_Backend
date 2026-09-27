export class FormateadorNumero {
  static REGEX = /\B(?=(\d{3})+(?!\d))/g;

  static format = (num) => {
    if (num === undefined || num === null) {
      return "0";
    }

    let numNormalizado;

    if (typeof num === "string") {
      const valor = num.trim();
      const esNegativo = valor.startsWith("-");

      let valorLimpio = valor.replace("-", "");

      // Si tiene coma, asumimos formato argentino:
      // 15.500,00 → 15500
      if (valorLimpio.includes(",")) {
        valorLimpio = valorLimpio
          .replace(/\./g, "")
          .replace(",", ".");
      }

      // Si tiene solamente punto, lo tratamos como
      // separador decimal (formato que devuelve PostgreSQL):
      // 155000.00 → 155000
      numNormalizado = Number(valorLimpio);

      if (esNegativo) {
        numNormalizado *= -1;
      }
    } else {
      numNormalizado = Number(num);
    }

    if (isNaN(numNormalizado)) {
      return "0";
    }

    const fixed = numNormalizado.toFixed(2);
    const [intOriginal, parteDecimal] = fixed.split(".");

    const esNegativo = intOriginal.startsWith("-");
    const intPart = esNegativo
      ? intOriginal.slice(1)
      : intOriginal;

    const intFormateado = intPart.replace(this.REGEX, ".");

    return `${esNegativo ? "-" : ""}${intFormateado}${
      parteDecimal === "00" ? "" : "," + parteDecimal
    }`;
  };
}
