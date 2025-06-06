export interface CreateUserForm {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  userName: string;
  password: string;
}

interface CreateRecommendationForm {
  id?: number;
  question: string;
  description: string;
  estimated_saving: number;
}
