# Gerenciador de Tarefas

Este repositório contém uma API para um sistema Gerenciador de Tarefas. A aplicação permite que os usuários criem contas, autentiquem-se e gerenciem suas tarefas. Além disso, é possível atribuir tarefas a membros de um time, categorizá-las por status e prioridade, e acompanhar o progresso.

## 🚀 Funcionalidades

- **Gerenciamento de Tarefas:**
  - Criação de tarefas com título, descrição, time associado e responsável.
  - Visualização de todas as tarefas com informações sobre o time e membros.
  - Exclusão de tarefas.

- **Gestão de Status e Prioridade:**
  - Atualização do status das tarefas: `pending`, `in_progress`, `completed`.
  - Alteração da prioridade das tarefas: `high`, `medium`, `low`.

## 🛠 Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Banco de Dados:** Prisma ORM
- **Autenticação:** Bcrypt e JsonWebToken (JWT)
- **Validação de Dados:** Zod
- **Testes:** Jest

## 🏗 Estrutura do Código

Exemplo de implementação do controlador de tarefas:

```typescript
export class TasksController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            assigned_id: z.number(),
            team_id: z.number(),
        });
        const { title, description, assigned_id, team_id } = bodySchema.parse(request.body);

        await prisma.tasks.create({
            data: {
                title: title,
                description: description,
                assignedTo: assigned_id,
                teamId: team_id,
            },
        });
        return response.status(201).json();
    }

    async index(request: Request, response: Response) {
        const task = await prisma.tasks.findMany({
            include: {
                team: { select: { name: true, members: true } },
            },
        });
        return response.json(task);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        await prisma.tasks.delete({ where: { id: Number(id) } });
        return response.json({ message: "Tarefa deletada" });
    }
}


## Desenvolvido por Styven Noronha
