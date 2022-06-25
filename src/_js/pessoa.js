class Pessoa {
    constructor(id, nome, departamento, endereco, email) {
        this.setId(id);
        this.setNome(nome);
        this.setDepartamento(departamento);
        this.setEndereco(endereco);
        this.setEmail(email);
    }

    setId(id) {
        if (id != null && id != "") {
            this.id = id;
        }
    }

    setNome(nome) {
        if (nome != null && nome != "") {
            this.nome = nome;
        }
    }

    setDepartamento(departamento) {
        if (departamento != null && departamento != "") {
            this.departamento = departamento;
        }
    }

    setEndereco(endereco) {
        if (endereco != null && endereco != "") {
            this.endereco = endereco;
        }
    }

    setEmail(email) {
        if (email != null && email != "") {
            this.email = email;
        }
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getDepartamento() {
        return this.departamento;
    }
    
    getEndereco() {
        return this.endereco;
    }

    getEmail() {
        return this.email;
    }
}