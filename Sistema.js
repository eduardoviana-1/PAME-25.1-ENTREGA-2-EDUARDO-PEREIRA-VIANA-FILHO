const Cliente = require('./Cliente');
const Funcionario = require('./Funcionario');
const Reserva = require('./Reserva');
const Quartos = require('./Quartos');

class Sistema {
    constructor() {
        this.reservas = [];
        this.funcionarios = [];
        this.clientes = [];
        this.quartos = [];
        this.usuarioLogado = null;
    }

    cadastrarCliente(...args) {
        const cliente = new Cliente(...args);
        this.clientes.push(cliente);
        return cliente;
    }

    cadastrarFuncionario(...args) {
        const funcionario = new Funcionario(...args);
        this.funcionarios.push(funcionario);
        return funcionario;
    }

    login(email, senha) {
        const usuario = [...this.clientes, ...this.funcionarios].find(u => u.email === email && u.autenticar(senha));
        this.usuarioLogado = usuario || null;
        return usuario;
    }

    logout() {
        this.usuarioLogado = null;
    }

    adicionarQuarto(...args) {
        const quarto = new Quartos(...args);
        this.quartos.push(quarto);
        return quarto;
    }

    fazerReserva(IDc, entrada, saida) {
        const reserva = new Reserva(IDc, entrada, saida);
        this.reservas.push(reserva);
        return reserva;
    }

    cancelarReserva(IDu) {
        const reserva = this.reservas.find(r => r.IDu === IDu);
        if (reserva) reserva.mudarStatus('cancelada');
    }

    mudarStatusReserva(IDu, status) {
        const reserva = this.reservas.find(r => r.IDu === IDu);
        if (reserva) reserva.mudarStatus(status);
    }

    getReservasPorCliente(IDc) {
        return this.reservas.filter(r => r.IDc === IDc);
    }

    getClientePorId(IDc) {
        return this.clientes.find(c => c.IDu === IDc);
    }

    getFuncionarioPorId(IDu) {
        return this.funcionarios.find(f => f.IDu === IDu);
    }

    getQuartoPorNome(nome) {
        return this.quartos.find(q => q.nome === nome);
    }

    removerQuarto(IDq) {
        this.quartos = this.quartos.filter(q => q.IDq !== IDq);
    }
}

module.exports = Sistema;