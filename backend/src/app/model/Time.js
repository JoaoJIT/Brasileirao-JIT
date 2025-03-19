class Time {
  _nome;
  _sigla;
  _pontos;
  _vitorias;
  _derrotas;
  _empates;
  _golsMarcados;
  _golsSofridos;
  _saldoGols;

  constructor(
    nome,
    sigla,
    pontos,
    vitorias,
    derrotas,
    empates,
    golsMarcados,
    golsSofridos,
    saldoGols
  ) {
    this._nome = nome;
    this._sigla = sigla;
    this._pontos = pontos;
    this._vitorias = vitorias;
    this._derrotas = derrotas;
    this._empates = empates;
    this._golsMarcados = golsMarcados;
    this._golsSofridos = golsSofridos;
    this._saldoGols = saldoGols;
  }

  get nome() {
    return this._nome;
  }

  get sigla() {
    return this._sigla;
  }

  get pontos() {
    return this._pontos;
  }

  get vitorias() {
    return this._vitorias;
  }

  get derrotas() {
    return this._derrotas;
  }

  get empates() {
    return this._empates;
  }

  get golsMarcados() {
    return this._golsMarcados;
  }

  get golsSofridos() {
    return this._golsSofridos;
  }

  get saldoGols() {
    return this._saldoGols;
  }

  set nome(value) {
    this._nome = value;
  }

  set sigla(value) {
    this._sigla = value;
  }

  set pontos(value) {
    this._pontos = value;
  }

  set vitorias(value) {
    this._vitorias = value;
  }

  set derrotas(value) {
    this._derrotas = value;
  }

  set empates(value) {
    this._empates = value;
  }

  set golsMarcados(value) {
    this._golsMarcados = value;
  }

  set golsSofridos(value) {
    this._golsSofridos = value;
  }

  set saldoGols(value) {
    this._saldoGols = value;
  }
}
