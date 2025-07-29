class Funcionario {
    static proximoID = 1;

    constructor(nome, cpf, email, senha) {
        this.IDu = Funcionario.proximoID++;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    autenticar(senha) {
        return this.senha === senha;
    }
}

module.exports = Funcionario;