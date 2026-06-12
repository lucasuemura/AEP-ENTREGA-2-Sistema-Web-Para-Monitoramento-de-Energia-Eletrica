package model;

import java.util.ArrayList;
import java.util.List;

public class Comodo {
    private String nome;
    private List<Aparelho> aparelhos;

    public Comodo(String nome) {
        this.nome = nome;
        this.aparelhos = new ArrayList<>();
    }

    public void adicionarAparelho(Aparelho aparelho) {
        this.aparelhos.add(aparelho);
    }

    public void removerAparelho(Aparelho aparelho) {
        this.aparelhos.remove(aparelho);
    }

    public double calcularConsumoComodoKwh() {
        double totalComodo = 0;
        for (Aparelho aparelho : aparelhos) {
            totalComodo += aparelho.calcularConsumoMensalKwh();
        }
        return totalComodo;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public List<Aparelho> getAparelhos() { return aparelhos; }
}