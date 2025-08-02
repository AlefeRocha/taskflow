export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member',
    GUEST = 'guest'
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female'
}

interface AuditableEntity {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly createdBy: string;
}

export class UserEmail {
  private readonly _value: string;

  constructor(email: string) {
    if (!UserEmail.isValid(email)) {
      throw new Error(`Invalid email: ${email}`);
    }

    this._value = email.toLowerCase(); // normaliza o e-mail
  }

  public get value(): string {
    return this._value;
  }

  // Método de validação de e-mail (pode ser privado se preferir)
  public static isValid(email: string): boolean {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  }

  // Para comparação entre value objects
  public equals(other: UserEmail): boolean {
    return this._value === other.value;
  }
}

export interface User extends AuditableEntity {
    role: UserRole,
    firstName: string;
    lastName: string;
    birth: Date;
    email: UserEmail;
    phone: string;
    gender: UserGender;
    profilePicture: string;
}

// ESTUDAR OS TYPES UTILITÁRIOS
export type CreateUserInput = Omit<User, keyof AuditableEntity | 'profilePicture'>

export type UpdateUserInput = Partial<User>

// ESTUDAR OS TYPES GUARDS
export function isValidRole(role:string): role is UserRole {
    return Object.values(UserRole).includes(role as UserRole)
}

export function isValidGender(gender: string): gender is UserGender {
    return Object.values(UserGender).includes(gender as UserGender)
}