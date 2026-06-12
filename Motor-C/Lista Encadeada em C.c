#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Aparelho {
    char nome[50];
    float potencia;
    float tempo_uso_diario;
    struct Aparelho *prox;
} Aparelho;

float calcularConsumo(float potencia, float horas_uso) {
    return (potencia * horas_uso * 30) / 1000.0;
}

Aparelho* inserirAparelho(Aparelho *inicio, char *nome, float potencia, float tempo) {
    Aparelho *novo = (Aparelho*) malloc(sizeof(Aparelho));
    if (novo == NULL) {
        printf("Erro de alocação de memória!\n");
        return inicio;
    }
    
    strcpy(novo->nome, nome);
    novo->potencia = potencia;
    novo->tempo_uso_diario = tempo;
    novo->prox = NULL;
    
    if (inicio == NULL) {
        return novo;
    }
    
    Aparelho *atual = inicio;
    while (atual->prox != NULL) {
        atual = atual->prox;
    }
    atual->prox = novo;
    
    return inicio;
}

void exibirRelatorio(Aparelho *inicio, float tarifa) {
    Aparelho *atual = inicio;
    float consumoTotal = 0.0;
    
    printf("\n=== RELATÓRIO DE CONSUMO RESIDENCIAL ===\n");
    
    if (inicio == NULL) {
        printf("Nenhum aparelho cadastrado na lista.\n");
        return;
    }
    
    while (atual != NULL) {
        float consumoItem = calcularConsumo(atual->potencia, atual->tempo_uso_diario);
        consumoTotal += consumoItem;
        
        printf("- %s: %.0f W | %.1f h/dia -> Consumo: %.2f kWh/mes\n", 
               atual->nome, atual->potencia, atual->tempo_uso_diario, consumoItem);
               
        atual = atual->prox;
    }
    
    float custoTotal = consumoTotal * tarifa;
    
    printf("------------------------------------------\n");
    printf("CONSUMO TOTAL DA LISTA: %.2f kWh/mes\n", consumoTotal);
    printf("CUSTO ESTIMADO: R$ %.2f\n", custoTotal);
    printf("==========================================\n");
}

void liberarLista(Aparelho *inicio) {
    Aparelho *atual = inicio;
    Aparelho *proximo;
    
    while (atual != NULL) {
        proximo = atual->prox;
        free(atual);
        atual = proximo;
    }
}

int main() {
    Aparelho *listaAparelhos = NULL;
    int opcao;
    char nome[50];
    float potencia, tempo;
    float tarifa = 0.85;
    
    do {
        printf("\n--- MENU DO SISTEMA ---\n");
        printf("1. Adicionar Aparelho na Lista\n");
        printf("2. Gerar Relatorio de Consumo\n");
        printf("3. Sair\n");
        printf("Escolha uma opcao: ");
        scanf("%d", &opcao);
        getchar();
        
        if (opcao == 1) {
            printf("Nome do aparelho: ");
            fgets(nome, 50, stdin);
            nome[strcspn(nome, "\n")] = 0;
            
            printf("Potencia (em Watts): ");
            scanf("%f", &potencia);
            
            printf("Tempo medio de uso diario (em horas): ");
            scanf("%f", &tempo);
            
            listaAparelhos = inserirAparelho(listaAparelhos, nome, potencia, tempo);
            printf("-> Aparelho alocado na lista com sucesso!\n");
            
        } else if (opcao == 2) {
            exibirRelatorio(listaAparelhos, tarifa);
        }
        
    } while (opcao != 3);
    
    liberarLista(listaAparelhos);
    printf("\nMemoria liberada. Programa encerrado.\n");
    
    return 0;
}
