# Respostas do Quiz - Java

### Questão 1: ArrayList vs Vetor []
A diferença é que o **ArrayList cresce sozinho**, enquanto o **vetor tem tamanho fixo** (se criou com 5 espaços, ele morre com 5). Hoje eu só usaria um vetor simples se soubesse exatamente a quantidade de itens e precisasse de algo muito leve, como as coordenadas de um ponto ou os meses do ano.

### Questão 2: Spring (@Autowired) e NestJS
O `@Autowired` serve pro Spring criar e entregar as instâncias das classes automaticamente pra você (Injeção de Dependência). No **NestJS**, o `@Injectable()` e os **Providers** fazem a mesma coisa: eles avisam o framework que aquela classe pode ser "emprestada" para outras partes do código sem você precisar dar um `new` toda hora.

### Questão 3: O Bug do Código
O código checa se um pagamento é de 100 reais, mas usa o tipo `double`. O problema é que o `double` não tem precisão exata para dinheiro e pode gerar arredondamentos errados (tipo 99.9999). Aí o `if` falha mesmo o valor parecendo ser 100. O correto seria usar `BigDecimal`.

### Questão 4: Exceptions (Checked vs Unchecked)
- **Checked:** São erros que o Java te obriga a tratar (tipo quando falta um arquivo).
- **Unchecked:** São erros de lógica que acontecem na hora que o código roda (tipo o famoso NullPointer).
**Na API:** O ideal é usar um "Global Exception Handler" pra capturar qualquer erro e devolver uma mensagem bonitinha em JSON pro usuário, evitando que a API trave ou mostre códigos feios.
