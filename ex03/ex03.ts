// Exercício 03: Simulador de parcelamento
// Conteúdos: for, break, continue, parâmetro opcional

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

const PARCELAS_NAO_OFERECIDAS: number[] = [7, 8, 9, 11];
const PARCELA_MINIMA = 50;

// Até 3 parcelas sem juros; a partir de 4, juros compostos de 2% a.m.
function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * 1.02 ** parcelas;
}

// "entrada" é opcional (?). Devolve as linhas <tr> da tabela.
function simularParcelamento(preco: number, entrada?: number): string {
  const valorEntrada = typeof entrada !== 'undefined' ? entrada : 0;
  const financiado = preco - valorEntrada;
  let linhas = '';

  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    // continue: pula as quantidades que a loja não oferece
    if (PARCELAS_NAO_OFERECIDAS.includes(parcelas)) {
      continue;
    }

    const total = calcularTotal(financiado, parcelas);
    const valorParcela = total / parcelas;

    // break: encerra quando a parcela fica abaixo do mínimo
    if (valorParcela < PARCELA_MINIMA) {
      break;
    }

    const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
    linhas +=
      `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
      `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }

  return linhas;
}

botao.addEventListener('click', () => {
  const preco = campoPreco.valueAsNumber;
  corpoTabela.innerHTML = '';
  saida.className = '';

  if (Number.isNaN(preco) || preco <= 0) {
    saida.textContent = 'Informe um preço válido';
    saida.className = 'erro';
    return;
  }

  let linhas: string;
  let financiado = preco;

  if (campoEntrada.value === '') {
    // Campo vazio: chama sem o segundo argumento
    linhas = simularParcelamento(preco);
  } else {
    const entrada = campoEntrada.valueAsNumber;
    if (entrada < 0) {
      saida.textContent = 'A entrada não pode ser negativa';
      saida.className = 'erro';
      return;
    }
    if (entrada >= preco) {
      saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
      saida.className = 'sucesso';
      return;
    }
    financiado = preco - entrada;
    linhas = simularParcelamento(preco, entrada);
  }

  saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  if (linhas === '') {
    saida.textContent += '\nNenhuma opção de parcelamento disponível (parcela mínima de R$ 50.00).';
    saida.className = 'alerta';
  }
  corpoTabela.innerHTML = linhas;
});
