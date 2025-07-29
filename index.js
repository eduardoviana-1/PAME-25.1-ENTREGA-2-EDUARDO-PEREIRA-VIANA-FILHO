const readline = require('readline');
const Sistema = require('./Sistema');

const sistema = new Sistema();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(texto) {
  return new Promise(resolve => {
    rl.question(texto, resposta => {
      resolve(resposta.trim());
    });
  });
}

async function menuPrincipal() {
  while (true) {
    console.log(`\n== MENU PRINCIPAL ==
1 - Login
2 - Cadastrar Cliente
3 - Cadastrar Funcionário
4 - Sair`);

    const op = await perguntar("Escolha uma opção: ");

    if (op === '1') {
      const email = await perguntar("Email: ");
      const senha = await perguntar("Senha: ");
      const usuario = sistema.login(email, senha);

      if (usuario) {
        console.log(`Login realizado com sucesso!\n`);
        if (sistema.funcionarios.includes(usuario)) {
          await menuFuncionario(usuario);
        } else {
          await menuCliente(usuario);
        }
      } else {
        console.log("Credenciais inválidas.");
      }

    } else if (op === '2') {
      const nome = await perguntar("Nome: ");
      const nascimento = await perguntar("Data de nascimento: ");
      const cpf = await perguntar("CPF: ");
      const email = await perguntar("Email: ");
      const senha = await perguntar("Senha: ");
      sistema.cadastrarCliente(nome, nascimento, cpf, email, senha);
      console.log("Cliente cadastrado com sucesso!");

    } else if (op === '3') {
      const nome = await perguntar("Nome: ");
      const cpf = await perguntar("CPF: ");
      const email = await perguntar("Email: ");
      const senha = await perguntar("Senha: ");
      sistema.cadastrarFuncionario(nome, cpf, email, senha);
      console.log("Funcionário cadastrado com sucesso!");

    } else if (op === '4') {
      console.log("Saindo...");
      rl.close();
      break;
    } else {
      console.log("Opção inválida.");
    }
  }
}

async function menuCliente(cliente) {
  while (true) {
    console.log(`\n== MENU CLIENTE ==
1 - Ver meus dados
2 - Ver lista de quartos
3 - Fazer reserva
4 - Cancelar reserva
5 - Ver minhas reservas
6 - Logout`);

    const op = await perguntar("Escolha uma opção: ");

    if (op === '1') {
      console.log(cliente);
    } else if (op === '2') {
      console.log(sistema.quartos);
    } else if (op === '3') {
      const entrada = await perguntar("Data de entrada: ");
      const saida = await perguntar("Data de saída: ");
      sistema.fazerReserva(cliente.IDu, entrada, saida);
      console.log("Reserva feita com sucesso.");
    } else if (op === '4') {
      const id = await perguntar("ID da reserva para cancelar: ");
      sistema.cancelarReserva(Number(id));
      console.log("Reserva cancelada.");
    } else if (op === '5') {
      const reservas = sistema.getReservasPorCliente(cliente.IDu);
      console.log(reservas);
    } else if (op === '6') {
      sistema.logout();
      break;
    } else {
      console.log("Opção inválida.");
    }
  }
}

async function menuFuncionario(func) {
  while (true) {
    console.log(`\n== MENU FUNCIONÁRIO ==
1 - Ver meus dados
2 - Ver lista de reservas
3 - Ver lista de quartos
4 - Ver lista de clientes
5 - Mudar status da reserva
6 - Adicionar quarto
7 - Logout`);

    const op = await perguntar("Escolha uma opção: ");

    if (op === '1') {
      console.log(func);
    } else if (op === '2') {
      console.log(sistema.reservas);
    } else if (op === '3') {
      console.log(sistema.quartos);
    } else if (op === '4') {
      console.log(sistema.clientes);
    } else if (op === '5') {
      const id = await perguntar("ID da reserva: ");
      const status = await perguntar("Novo status (pendente, adiada, realizada, cancelada): ");
      sistema.mudarStatusReserva(Number(id), status);
      console.log("Status atualizado.");
    } else if (op === '6') {
      const nome = await perguntar("Nome do quarto: ");
      const descricao = await perguntar("Descrição: ");
      const camas = Number(await perguntar("Número de camas: "));
      const preco = Number(await perguntar("Preço por noite: "));
      const disp = Number(await perguntar("Quantidade disponível: "));
      sistema.adicionarQuarto(camas, preco, disp, nome, descricao);
      console.log("Quarto adicionado.");
    } else if (op === '7') {
      sistema.logout();
      break;
    } else {
      console.log("Opção inválida.");
    }
  }
}

menuPrincipal();