// Exercício 02: Conta de luz
// Conteúdos: switch (cases agrupados), parâmetro padrão, tipos literais

type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const selectTipo = document.getElementById('tipo') as HTMLSelectElement;
const selectBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

// Cases agrupados: dois "case" seguidos compartilham o mesmo bloco (sem break entre eles)
function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.8;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

// Parâmetro padrão: se a bandeira não for informada, assume 'verde'
function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
  switch (bandeira) {
    case 'verde':
      return 0;
    case 'amarela':
      return consumo * 0.02;
    case 'vermelha1':
      return consumo * 0.04;
    case 'vermelha2':
      return consumo * 0.08;
  }
}

// As duas bandeiras vermelhas compartilham a mesma mensagem
function mensagemBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case 'verde':
      return 'Condições favoráveis de geração de energia.';
    case 'amarela':
      return 'Condições de geração menos favoráveis.';
    case 'vermelha1':
    case 'vermelha2':
      return 'Condições mais caras de geração. Economize!';
    default:
      return 'Bandeira desconhecida.';
  }
}

// Nome da bandeira para exibir na tela
function nomeBandeira(bandeira: Bandeira): string {
  const nomes: Record<Bandeira, string> = {
    verde: 'verde',
    amarela: 'amarela',
    vermelha1: 'vermelha 1',
    vermelha2: 'vermelha 2',
  };
  return nomes[bandeira];
}

// Teste do parâmetro padrão:
// adicionalBandeira(100) devolve 0, porque sem o 2º argumento a bandeira
// assume o valor padrão 'verde', que não tem adicional.
console.log(adicionalBandeira(100));

botao.addEventListener('click', () => {
  const consumo = campoConsumo.valueAsNumber;

  if (Number.isNaN(consumo) || consumo <= 0) {
    saida.textContent = 'Informe um consumo válido';
    saida.className = 'erro';
    return;
  }

  const tipo = selectTipo.value as TipoCliente;
  const bandeira = selectBandeira.value as Bandeira;

  const energia = consumo * tarifaPorKwh(tipo);
  const adicional = adicionalBandeira(consumo, bandeira);
  const total = energia + adicional;

  saida.textContent =
    `Energia: R$ ${energia.toFixed(2)}\n` +
    `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
    `Total: R$ ${total.toFixed(2)}\n` +
    mensagemBandeira(bandeira);
  saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
