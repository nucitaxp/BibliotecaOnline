class Usuario {
  constructor(nome, registroAcademico, dataNascimento) {
    this.nome = nome;
    this.registroAcademico = registroAcademico;
    this.dataNascimento = dataNascimento;
  }
}

class EntidadeBibliografica {
  constructor(
    codigo,
    titulo,
    autor,
    anoPublicacao,
    isEmprestado,
    usuarioEmprestimo
  ) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.isEmprestado = isEmprestado;
    this.usuarioEmprestimo = usuarioEmprestimo;
  }

  emprestar(usuario) {
    this.isEmprestado = true;
    this.usuarioEmprestimo = usuario;
  }

  devolver() {
    this.isEmprestado = false;
    this.usuarioEmprestimo = null;
  }
}

class Livro extends EntidadeBibliografica {
  constructor(codigo, titulo, autor, anoPublicacao, isEmprestado, usuarioEmprestimo, genero) {
    super(codigo, titulo, autor, anoPublicacao, isEmprestado, usuarioEmprestimo);
    this.genero = genero;
  }
}

class Revista extends EntidadeBibliografica {
  constructor(codigo, titulo, editor, anoPublicacao, isEmprestado, usuarioEmprestimo, edicao) {
    super(codigo, titulo, editor, anoPublicacao, isEmprestado, usuarioEmprestimo);
    this.edicao = edicao;
  }
}

class Biblioteca {
  constructor() {
    this.acervo = [];
    this.usuarios = [];
  }

  adicionarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  adicionarItem(item) {
    this.acervo.push(item);
  }

  emprestarItem(codigo, registroAcademico) {
    const item = this.acervo.find((itm) => itm.codigo === codigo);
    const usuario = this.usuarios.find(
      (usr) => usr.registroAcademico === registroAcademico
    );

    if (item && usuario) {
      item.emprestar(usuario);
      console.log(`Item ${codigo} emprestado para ${usuario.nome}`);
    } else {
      console.log("Item ou usuário não encontrado.");
    }
  }

  devolverItem(codigo) {
    const item = this.acervo.find((itm) => itm.codigo === codigo);

    if (item) {
      item.devolver();
      console.log(`Item ${codigo} devolvido.`);
    } else {
      console.log(`Item ${codigo} não encontrado.`);
    }
  }

  listarAcervo() {
    return this.acervo.map(item => {
      return {
        codigo: item.codigo,
        titulo: item.titulo,
        autor: item.autor,
        anoPublicacao: item.anoPublicacao,
        isEmprestado: item.isEmprestado,
        usuarioEmprestimo: item.usuarioEmprestimo,
        genero: item.genero,
        edicao: item.edicao
      };
    });
  }
}

// Criação da instância da biblioteca
const minhaBiblioteca = new Biblioteca();

// Criação de um usuário e um livro para emprestar
const novoUsuario = new Usuario("Nome do Usuário", "RA001", "01/01/2000");
const novoLivro = new Livro("L001", "Título do Livro", "Autor do Livro", "2000", false, null, "Ficção");

// Adição do usuário e do livro à biblioteca
minhaBiblioteca.adicionarUsuario(novoUsuario);
minhaBiblioteca.adicionarItem(novoLivro);

// Empréstimo e devolução de item
minhaBiblioteca.emprestarItem("L001", "RA001");
minhaBiblioteca.devolverItem("L001");

// Listagem do acervo
console.log("Itens na biblioteca:", minhaBiblioteca.listarAcervo());
