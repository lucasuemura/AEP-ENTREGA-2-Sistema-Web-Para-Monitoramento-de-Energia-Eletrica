package model;

import java.util.ArrayList;
import java.util.List;

public class Usuario {
    private String nome;
    private String email;
    private List<Comodo> comodos;

    public Usuario(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.comodos = new ArrayList<>();
    }

    public void adicionarComodo(Comodo comodo) {
        this.comodos.add(comodo);
    }

    public double calcularConsumoTotalKwh() {
        double totalGeral = 0;
        for (Comodo comodo : comodos) {
            totalGeral += comodo.calcularConsumoComodoKwh();
        }
        return totalGeral;
    }

    public double calcularCustoTotal(double tarifa) {
        return this.calcularConsumoTotalKwh() * tarifa;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<Comodo> getComodos() { return comodos; }
}