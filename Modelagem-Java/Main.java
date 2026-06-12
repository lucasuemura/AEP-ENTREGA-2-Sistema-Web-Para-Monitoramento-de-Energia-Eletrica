import model.Aparelho;
import model.Comodo;
import model.Usuario;

public class Main {
    public static void main(String[] args) {
        // 1. Criando o perfil do usuário
        Usuario usuario = new Usuario("Morador Consciente", "contato@energia.com");

        // 2. Criando os cômodos da residência
        Comodo cozinha = new Comodo("Cozinha");
        Comodo quarto = new Comodo("Quarto Principal");

        // 3. Cadastrando aparelhos com potência (W) e tempo de uso diário (horas)
        Aparelho geladeira = new Aparelho("Geladeira Frost Free", 350, 24); // Uso contínuo
        Aparelho microondas = new Aparelho("Micro-ondas", 1200, 0.5);       // 30 min por dia
        cozinha.adicionarAparelho(geladeira);
        cozinha.adicionarAparelho(microondas);

        Aparelho arCondicionado = new Aparelho("Ar Condicionado Split", 1500, 8); // 8h por noite
        quarto.adicionarAparelho(arCondicionado);

        // 4. Associando os cômodos ao usuário
        usuario.adicionarComodo(cozinha);
        usuario.adicionarComodo(quarto);

        // 5. Exibindo os Resultados (Simulação do Dashboard)
        double tarifaLocal = 0.85; // R$ por kWh

        System.out.println("=== SISTEMA DE MONITORAMENTO DE ENERGIA ===");
        System.out.println("Usuário: " + usuario.getNome());
        System.out.println("-------------------------------------------");

        for (Comodo c : usuario.getComodos()) {
            System.out.printf("Cômodo: %s | Consumo: %.2f kWh/mês\n", 
                c.getNome(), c.calcularConsumoComodoKwh());
            for (Aparelho a : c.getAparelhos()) {
                System.out.printf("  > %s: %.2f kWh/mês\n", 
                    a.getNome(), a.calcularConsumoMensalKwh());
            }
        }

        System.out.println("-------------------------------------------");
        System.out.printf("CONSUMO TOTAL DA RESIDÊNCIA: %.2f kWh/mês\n", usuario.calcularConsumoTotalKwh());
        System.out.printf("CUSTO MENSAL ESTIMADO: R$ %.2f\n", usuario.calcularCustoTotal(tarifaLocal));
        System.out.println("===========================================");
    }
}