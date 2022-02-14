import * as yup from 'yup';

export interface ILoginModel {
  userName: string;
  password: string;
}

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  userName: yup.string().required(),
  password: yup.string().required(),
});
