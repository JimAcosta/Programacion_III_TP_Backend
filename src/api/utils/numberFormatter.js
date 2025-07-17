export class FormateadorNumero {
  static REGEX = /\B(?=(\d{3})+(?!\d))/g;

  static format = (num) => {
    if (num === undefined || num === null) {
      return "0";
    }

    let numNormalizado;

    if (typeof num === "string") {
      const esNegativo = num.trim().startsWith("-");
      const parteNumerica = num
        .replace(/[^0-9,]/g, "")
        .replace(/\./g, "")
        .replace(",", ".");
      numNormalizado = Number(parteNumerica);
      if (esNegativo) numNormalizado *= -1;
    } else {
      numNormalizado = num;
    }

    if (isNaN(numNormalizado)) {
      return "0";
    }

    const fixed = numNormalizado.toFixed(2);
    const [intOriginal, parteDecimal] = fixed.split(".");

    const esNegativo = intOriginal.startsWith("-");
    const intPart = esNegativo ? intOriginal.slice(1) : intOriginal;

    const intFormateado = intPart.replace(this.REGEX, ".");
    return `${esNegativo ? "-" : ""}${intFormateado}${(parteDecimal === "00" ? "" : "," + parteDecimal)}`;
  };
}