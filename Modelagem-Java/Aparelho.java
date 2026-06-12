package model;

public class Aparelho {
    private String nome;
    private double potencia; // em Watts
    private double tempoUsoDiario; // em horas

    public Aparelho(String nome, double potencia, double tempoUsoDiario) {
        this.nome = nome;
        this.potencia = potencia;
        this.tempoUsoDiario = tempoUsoDiario;
    }

    // Fórmula técnica exigida: (Potência * Horas * Dias) / 1000
    public double calcularConsumoMensalKwh() {
        return (this.potencia * this.tempoUsoDiario * 30) / 1000.0;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public double getPotencia() { return potencia; }
    public void setPotencia(double potencia) { this.potencia = potencia; }

    public double getTempoUsoDiario() { return tempoUsoDiario; }
    public void setTempoUsoDiario(double tempoUsoDiario) { this.tempoUsoDiario = tempoUsoDiario; }
}