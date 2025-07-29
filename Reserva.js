class Reserva {
    static proximoID = 1;

    constructor(IDc, entrada, saida, status = 'pendente') {
        this.IDu = Reserva.proximoID++;
        this.IDc = IDc;
        this.status = status;
        this.entrada = entrada;
        this.saida = saida;
    }

    mudarStatus(novoStatus) {
        this.status = novoStatus;
    }
}

module.exports = Reserva;