class Quartos {
    static proximoID = 1;

    constructor(camas, preco, disp, nome, descricao) {
        this.IDq = Quartos.proximoID++;
        this.camas = camas;
        this.preco = preco;
        this.disp = disp;
        this.nome = nome;
        this.descricao = descricao;
    }

    editarQuarto(dados) {
        Object.assign(this, dados);
    }
}

module.exports = Quartos;