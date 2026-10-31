// Exercício 04: Meta de economia
// Conteúdos: while, break, tipo de função, parâmetro padrão

type Formatador = (valor: number) => string;

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

const LIMITE_MESES = 600;

interface ResultadoMeta {
  meses: number;
  saldo: number;
  depositado: number;
}

const formatarReal: Formatador = (valor) => `R$ ${valor.toFixed(2)}`;

// Ex.: 19 -> "1 ano e 7 meses", 25 -> "2 anos e 1 mês", 8 -> "8 meses"
const formatarMeses = (meses: number): string => {
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;

  if (anos === 0) {
    return textoMeses;
  }
  return resto === 0 ? textoAnos : `${textoAnos} e ${textoMeses}`;
};

// Primeiro o saldo rende, depois entra o depósito.
// Todo mês 12, 24, 36... o depósito é dobrado (13º salário).
function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): ResultadoMeta {
  let saldo = 0;
  let depositado = 0;
  let meses = 0;

  while (saldo < meta) {
    if (meses >= LIMITE_MESES) {
      break; // meta inalcançável em 50 anos
    }
    meses++;
    const valorDoMes = meses % 12 === 0 ? deposito * 2 : deposito;
    saldo = saldo * (1 + taxa / 100) + valorDoMes;
    depositado += valorDoMes;
  }

  return { meses, saldo, depositado };
}

// Recebe a função de formatação como parâmetro
function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

botao.addEventListener('click', () => {
  const meta = campoMeta.valueAsNumber;
  const deposito = campoDeposito.valueAsNumber;

  if (Number.isNaN(meta) || Number.isNaN(deposito) || meta <= 0 || deposito <= 0) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  // Campo vazio: chama sem o 3º argumento para usar o padrão (0,5%)
  const resultado =
    campoTaxa.value === ''
      ? calcularMeses(meta, deposito)
      : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);

  if (resultado.saldo < meta) {
    saida.textContent =
      'Meta inalcançável em 50 anos.\n' +
      exibirValor(`Saldo após ${LIMITE_MESES} meses`, resultado.saldo, formatarReal);
    saida.className = 'erro';
    return;
  }

  saida.textContent =
    `Você atinge a meta em ${resultado.meses} ${resultado.meses === 1 ? 'mês' : 'meses'} ` +
    `(${formatarMeses(resultado.meses)}).\n` +
    exibirValor('Saldo final', resultado.saldo, formatarReal) + '\n' +
    exibirValor('Total depositado', resultado.depositado, formatarReal) + '\n' +
    exibirValor('Rendimento', resultado.saldo - resultado.depositado, formatarReal);
  saida.className = 'sucesso';
});
