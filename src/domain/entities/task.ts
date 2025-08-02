// ✅ Enum para status - mais seguro que strings
export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

// ✅ Enum para prioridades
export enum TaskPriority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    CRITICAL = 4
}

// ✅ Interface base para auditoria
interface AuditableEntity {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly createdBy: string;
}

// ✅ Value Objects - objetos imutáveis
export class TaskTitle {
    constructor(private readonly _value: string) {
        if(!_value || _value.trim().length < 3) {
            throw new Error('Task titel must have at least 3 characters!');
        }
        if(_value.length > 100) {
            throw new Error('Task title cannot exceed 100 characters"');
        }
    }

    get value(): string {
        return this._value
    }

    toString(): string {
        return this._value
    }
}

// ✅ Interface principal da Task
export interface Task extends AuditableEntity {
    title: TaskTitle;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    assigneeId?: string;
    tags: string[];
    completedAt?: Date;
}

// ✅ Types utilitários para operações CRUD
export type CreateTaskInput = Omit<Task, keyof AuditableEntity | 'status' | 'completedAt'> & { title: string; }

export type UpdateTaskInput = Partial<Pick<Task, 'title' | 'description' | 'priority' | 'dueDate' | 'assigneeId' | 'tags'>>

export type TaskResponse = Omit<Task, 'title'> & { title: string }

// ✅ Type Guards - verificações de tipo em runtime
export function isValidTaskStatus(status: string): status is TaskStatus {
    return Object.values(TaskStatus).includes(status as TaskStatus)
}

export function isValidTaskPriority(priority: number): priority is TaskPriority {
    return Object.values(TaskPriority).includes(priority as TaskPriority)
}

// ✅ Conditional Types - tipos baseados em condições
type TaskWithCompletion<T extends TaskStatus> = T extends TaskStatus.COMPLETED ? Task & { completedAt: Date } : Task & { completedAt?: never }