class Cliente {
    static proximoID = 1;

    constructor(nome, nascimento, cpf, email, senha) {
        this.IDu = Cliente.proximoID++;
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    autenticar(senha) {
        return this.senha === senha;
    }
}

module.exports = Cliente;